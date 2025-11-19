// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { LoginSchema } from "@/lib/validation/auth";
import { signJwt } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signJwt({ sub: user.id, role: user.role });

  const payload = { id: user.id, email: user.email, role: user.role } as const;
  const res = NextResponse.json({ success: true, user: payload }, { status: 200 });

  // IMPORTANT: secure=false in dev; set true only in production
  res.cookies.set("session", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
