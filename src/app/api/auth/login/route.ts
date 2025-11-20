import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { LoginSchema, LoginInput } from "@/lib/validation/auth";
import { signJwt } from "@/lib/auth/jwt";
import { normalizePhone } from "@/lib/phone";

function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = LoginSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data: LoginInput = parsed.data;

  let user = null;
if (isEmail(data.identifier)) {
  user = await prisma.user.findUnique({ where: { email: data.identifier } });
} else {
  const normalized = normalizePhone(data.identifier);
  if (normalized) {
    // assumes phone is @unique in schema
    user = await prisma.user.findFirst({ where: { phone: normalized } });
  }
}

  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signJwt({ sub: user.id, role: user.role });
  const payload = { id: user.id, email: user.email, role: user.role } as const;

  const res = NextResponse.json({ success: true, user: payload }, { status: 200 });
  res.cookies.set("session", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
