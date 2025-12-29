import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { OrderStatus } from "@prisma/client";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cart = await prisma.order.findFirst({
    where: { customerId: user.id, status: OrderStatus.CART },
    include: {
      items: {
        include: { item: true },
      },
    },
  });

  return NextResponse.json(
    { cart },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
