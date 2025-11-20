// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { RegisterSchema, RegisterInput } from "@/lib/validation/auth";
import type { Role } from "@prisma/client";
import { normalizePhone } from "@/lib/phone";

export async function POST(req: Request) {
  const json = await req.json();

  const parsed = RegisterSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data: RegisterInput = parsed.data;

  const normalizedPhone = normalizePhone(data.phone);
if (!normalizedPhone) {
  return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
}

// Check for existing by email OR phone
const existing = await prisma.user.findFirst({
  where: {
    OR: [
      { email: data.email },
      { phone: normalizedPhone }
    ]
  }
});

  if (existing) {
    return NextResponse.json({ error: "Email or PhoneNumber is already in use" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: {
        email: data.email,
        name: data.name,
        phone: normalizedPhone,
        role: data.role as Role,
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

  // Make the response shape explicit so TS can validate it during build
  return NextResponse.json<{ user: { id: string; role: Role; email: string } }>(
    { user: { id: user.id, role: user.role as Role, email: user.email } },
    { status: 201 }
  );
}
