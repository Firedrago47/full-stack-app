import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { CreateItemSchema } from "@/lib/validation/item";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "SHOP_OWNER")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json();
  const parsed = CreateItemSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { shopId, name, priceCents, stock, imageUrl } = parsed.data;

  const item = await prisma.item.create({
    data: {
      shopId,
      name,
      priceCents,
      stock,
      imageUrl: imageUrl || null,
    },
  });

  return NextResponse.json({ item }, { status: 201 });
}
