import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { $Enums } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? "food";

  if (category === "groceries") {
    const items = await prisma.item.findMany({
      where: { service: $Enums.ServiceCategory.GROCERY, isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ items });
  }

  if (category === "food") {
    const items = await prisma.item.findMany({
      where: { service: $Enums.ServiceCategory.FOOD, isActive: true },
      include: { shop: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ items });
  }

  // TAXI → no items
  return NextResponse.json({ items: [] });
}
