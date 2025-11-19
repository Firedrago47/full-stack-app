import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth/jwt";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie");

  const token = cookie
    ?.split("; ")
    ?.find((c) => c.startsWith("session="))
    ?.split("=")[1];

  if (!token) return NextResponse.json({ user: null });

  const payload = verifyJwt(token);
  if (!payload) return NextResponse.json({ user: null });

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, email: true, name: true, role: true },
  });

  return NextResponse.json({ user });
}
