"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { OrderStatus } from "@prisma/client";
import { revalidateTag } from "next/cache";

const RUPEE = 100;
const DELIVERY_FEE_PAISE = 40 * RUPEE;

export async function addToCart(itemId: string, quantity: number = 1): Promise<void> {
  if (!itemId || quantity < 1) {
    throw new Error("Invalid input");
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  await prisma.$transaction(
    async (tx) => {
      // 1️⃣ Fetch only what we need (fast + type-safe)
      const item = await tx.item.findUnique({
        where: { id: itemId },
        select: {
          priceCents: true,
          shopId: true,
        },
      });

      if (!item) {
        throw new Error("Item not found");
      }

      // 2️⃣ Find existing cart
      let cart = await tx.order.findFirst({
        where: {
          customerId: user.id,
          status: OrderStatus.CART,
        },
        select: {
          id: true,
        },
      });

      // 3️⃣ Create cart if missing
      if (!cart) {
        cart = await tx.order.create({
          data: {
            customerId: user.id,
            shopId: item.shopId,
            status: OrderStatus.CART,
            totalCents: DELIVERY_FEE_PAISE,
            deliveryFeeCents: DELIVERY_FEE_PAISE,
          },
          select: {
            id: true,
          },
        });
      }

      // 4️⃣ Upsert item
      await tx.orderItem.upsert({
        where: {
          orderId_itemId: {
            orderId: cart.id,
            itemId,
          },
        },
        update: {
          quantity: { increment: quantity },
        },
        create: {
          orderId: cart.id,
          itemId,
          quantity,
          unitPriceCents: item.priceCents,
        },
      });

      // 5️⃣ Increment total (NO recomputation)
      await tx.order.update({
        where: { id: cart.id },
        data: {
          totalCents: {
            increment: quantity * item.priceCents,
          },
        },
      });
    },
    {
      timeout: 10_000, // avoids dev-mode transaction expiry
    }
  );
}
export async function updateCartItem(orderItemId: string, quantity: number) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.$transaction(async (tx) => {
    const item = await tx.orderItem.findUnique({
      where: { id: orderItemId },
      include: { order: true },
    });

    if (!item || item.order.customerId !== user.id) {
      throw new Error("Forbidden");
    }

    const diff = quantity - item.quantity;

    await tx.orderItem.update({
      where: { id: orderItemId },
      data: { quantity },
    });

    await tx.order.update({
      where: { id: item.orderId },
      data: {
        totalCents: { increment: diff * item.unitPriceCents },
      },
    });
  });

}

export async function removeCartItem(orderItemId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.$transaction(async (tx) => {
    const item = await tx.orderItem.findUnique({
      where: { id: orderItemId },
      include: { order: true },
    });

    if (!item || item.order.customerId !== user.id) {
      throw new Error("Forbidden");
    }

    await tx.orderItem.delete({ where: { id: orderItemId } });

    await tx.order.update({
      where: { id: item.orderId },
      data: {
        totalCents: {
          decrement: item.quantity * item.unitPriceCents,
        },
      },
    });
  });

}
