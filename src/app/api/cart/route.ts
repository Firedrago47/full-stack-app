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

  const result = await prisma.$transaction(async (tx) => {
    const item = await tx.item.findUnique({ where: { id: itemId } });
    if (!item) throw new Error("Item not found");

    let cart = await tx.order.findFirst({
      where: { customerId: user.id, status: OrderStatus.CART },
      include: {
        shop: true,
        items: true,
      },
    });

    // Delete empty cart
    if (cart && cart.items.length === 0) {
      await tx.order.delete({ where: { id: cart.id } });
      cart = null;
    }

    // Conflict: existing cart belongs to a different shop
    if (cart && cart.shopId !== item.shopId) {
      return {
        conflict: true,
        existingShop: cart.shop?.name,
      };
    }

    // Create a new cart
    if (!cart) {
      cart = await tx.order.create({
        data: {
          customerId: user.id,
          shopId: item.shopId,
          status: OrderStatus.CART,
          totalCents: DELIVERY_FEE,
          deliveryFeeCents: DELIVERY_FEE,
        },
        include: {
          shop: true,
          items: true,
        },
      });
    }

    // Add or update item
    const existingItem = await tx.orderItem.findFirst({
      where: { orderId: cart.id, itemId },
    });

    if (existingItem) {
      await tx.orderItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await tx.orderItem.create({
        data: {
          orderId: cart.id,
          itemId,
          quantity,
          unitPriceCents: item.priceCents,
        },
      });
    }

    // Recalculate totals
    const items = await tx.orderItem.findMany({
      where: { orderId: cart.id },
    });

    const itemsTotal = items.reduce(
      (total, it) => total + it.quantity * it.unitPriceCents,
      0
    );

    await tx.order.update({
      where: { id: cart.id },
      data: {
        totalCents: itemsTotal + DELIVERY_FEE,
        deliveryFeeCents: DELIVERY_FEE,
      },
    });

    return { ok: true };
  });

  return NextResponse.json(result);
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
