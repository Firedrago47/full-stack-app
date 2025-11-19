import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { RegisterSchema, RegisterInput } from "@/lib/validation/auth";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  const json = await req.json();

  const parsed = RegisterSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data: RegisterInput = parsed.data;

  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(data.password, 10);

  // Transaction ensures profile + user created together
  const user = await prisma.$transaction(async (tx:PrismaClient) => {
    const createdUser = await tx.user.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: data.role,
        password: hashed,
      },
    });

    if (data.role === "DRIVER") {
      await tx.driver.create({
        data: {
          userId: createdUser.id,
          licenseNumber: data.licenseNumber ?? "",
          vehicleNumber: data.vehicleNumber ?? "",
          isAvailable: true,
        },
      });
    }

    if (data.role === "SHOP_OWNER") {
      await tx.shop.create({
        data: {
          ownerId: createdUser.id,
          name: data.shopName ?? `${data.name}'s Shop`,
          address: data.shopAddress ?? "",
        },
      });
    }

    return createdUser;
  });

  return NextResponse.json(
    { user: { id: user.id, role: user.role, email: user.email } },
    { status: 201 }
  );
}
