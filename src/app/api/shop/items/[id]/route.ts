import { getCurrentUser } from "@/lib/auth/current-user";
import prisma from "@/lib/prisma";
import { UpdateItemSchema } from "@/lib/validation/item";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context :  {params : Promise<{ id: string }>} 
) {
  const user = await getCurrentUser();

  const {id} = await context.params;

  if (!user) {
    return NextResponse.json({ error: "Unauthroized" }, { status: 401 });
  }

  const parsed = UpdateItemSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (Object.keys(parsed.data).length === 0) {
    return NextResponse.json(
      { error: "No fields provided to update" },
      { status: 400 }
    );
  }

  const item = await prisma.item.findFirst({
    where: { id, shop: { ownerId: user.id } },
  });

  if (!item) {
    return NextResponse.json(
      { error: "Item not found or not pwend by this shop owner" },
      { status: 403 }
    );
  }

  const updated = await prisma.item.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json({ item: updated });
}

export async function DELETE(
  req: Request,
  context : { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  const {id} = await context.params;

  if (!user) {
    return NextResponse.json({ error: "UnAuthorized" }, { status: 401 });
  }

  const item = await prisma.item.findFirst({
    where: { id, shop: { ownerId: user.id } },
  });

  if (!item) {
    return NextResponse.json(
      { error: "Item not found or not owned by this shop" },
      { status: 403 }
    );
  }

  await prisma.item.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ ok: true });
}
