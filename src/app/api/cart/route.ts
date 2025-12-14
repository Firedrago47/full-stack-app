import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { OrderStatus } from "@prisma/client";

const DELIVERY_FEE = 4000; // ₹40

// Helper to recalc totals
async function recalcOrderTotals(orderId: string) {
  const items = await prisma.orderItem.findMany({ where: { orderId } });

  const itemsTotal = items.reduce(
    (sum, i) => sum + i.quantity * i.unitPriceCents,
    0
  );

  await prisma.order.update({
    where: { id: orderId },
    data: {
      totalCents: itemsTotal + DELIVERY_FEE,
      deliveryFeeCents: DELIVERY_FEE,
    },
  });
}

// GET CART
export async function GET() {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cart = await prisma.order.findFirst({
    where: { customerId: user.id, status: OrderStatus.CART },
    include: {
      items: { include: { item: { include: { shop: true } } } },
    },
  });

  return NextResponse.json({ cart });
}

// ADD / UPDATE CART
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemId, quantity = 1 } = await req.json();
  if (!itemId)
    return NextResponse.json({ error: "itemId required" }, { status: 400 });

  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });

  if (!item)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });

  let cart = await prisma.order.findFirst({
    where: { customerId: user.id, status: OrderStatus.CART },
    include: { shop: true },
  });

  // Remove empty carts
  if (cart) {
    const itemCount = await prisma.orderItem.count({
      where: { orderId: cart.id },
    });

    if (itemCount === 0) {
      await prisma.order.delete({ where: { id: cart.id } });
      cart = null;
    }
  }

  // Check shop conflict (OUTSIDE transaction)
  if (cart && cart.shopId !== item.shopId) {
    return NextResponse.json(
      {
        conflict: true,
        existingShop: cart.shop?.name,
      },
      { status: 409 }
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    // Create new cart if needed
    const activeCart = cart
      ? cart
      : await tx.order.create({
          data: {
            customerId: user.id,
            shopId: item.shopId,
            status: OrderStatus.CART,
            totalCents: DELIVERY_FEE,
            deliveryFeeCents: DELIVERY_FEE,
          },
        });

    // Add or update item
    const existing = await tx.orderItem.findFirst({
      where: { orderId: activeCart.id, itemId },
    });

    if (existing) {
      await tx.orderItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      await tx.orderItem.create({
        data: {
          orderId: activeCart.id,
          itemId,
          quantity,
          unitPriceCents: item.priceCents,
        },
      });
    }

    return { orderId: activeCart.id };
  });

  const orderItems = await prisma.orderItem.findMany({
    where: { orderId: result.orderId },
  });

  const itemsTotal = orderItems.reduce(
    (sum, it) => sum + it.quantity * it.unitPriceCents,
    0
  );

  await prisma.order.update({
    where: { id: result.orderId },
    data: {
      totalCents: itemsTotal + DELIVERY_FEE,
      deliveryFeeCents: DELIVERY_FEE,
    },
  });

  return NextResponse.json({ ok: true });
}


export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { orderItemId, quantity } = await req.json();
  if (!orderItemId || quantity < 1) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  const updated = await prisma.orderItem.update({
    where: { id: orderItemId },
    data: { quantity },
  });

  await recalcOrderTotals(updated.orderId);

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { orderItemId } = await req.json();
  if (!orderItemId)
    return NextResponse.json(
      { error: "orderItemId required" },
      { status: 400 }
    );

  const deleted = await prisma.orderItem.delete({
    where: { id: orderItemId },
  });

  await recalcOrderTotals(deleted.orderId);

  return NextResponse.json({ ok: true });
}
