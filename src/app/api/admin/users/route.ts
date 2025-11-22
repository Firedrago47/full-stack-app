// app/api/admin/users/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "../_admin-helpers";

export async function GET(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const url = new URL(req.url);
  const role = url.searchParams.get("role") ?? undefined; // CUSTOMER | DRIVER | SHOP_OWNER | ADMIN
  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const limit = Math.min(100, Math.max(5, Number(url.searchParams.get("limit") ?? "20")));
  const skip = (page - 1) * limit;

  const where: any = {};
  if (role) where.role = role;

  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        deletedAt: true,
      },
    }),
  ]);

  return NextResponse.json({ total, page, limit, users });
}
