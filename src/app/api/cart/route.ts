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

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemId, quantity = 1 } = await req.json();
  if (!itemId || quantity < 1)
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const item = await prisma.item.findUnique({
    where: { id: itemId },
    select: { id: true, shopId: true, priceCents: true },
  });

  if (!item)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });

  let cart = await prisma.order.findFirst({
    where: { customerId: user.id, status: OrderStatus.CART },
  });

  if (!cart) {
    cart = await prisma.order.create({
      data: {
        customerId: user.id,
        shopId: item.shopId,
        status: OrderStatus.CART,
        totalCents: DELIVERY_FEE,
        deliveryFeeCents: DELIVERY_FEE,
      },
    });
  }

  await prisma.orderItem.upsert({
    where: {
      orderId_itemId: {
        orderId: cart.id,
        itemId: item.id,
      },
    },
    update: {
      quantity: { increment: quantity },
    },
    create: {
      orderId: cart.id,
      itemId: item.id,
      quantity,
      unitPriceCents: item.priceCents,
    },
  });

  const items = await prisma.orderItem.findMany({
    where: { orderId: cart.id },
    select: { quantity: true, unitPriceCents: true },
  });

  const itemsTotal = items.reduce(
    (sum, i) => sum + i.quantity * i.unitPriceCents,
    0
  );

  await prisma.order.update({
    where: { id: cart.id },
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
