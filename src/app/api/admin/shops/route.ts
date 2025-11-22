export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "../_admin-helpers";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const shops = await prisma.user.findMany({
      where: { role: "SHOP_OWNER" },
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    return NextResponse.json(shops);
  } catch (err) {
    console.error("Shops API error:", err);
    return NextResponse.json({ error: "Failed to load shop owners" }, { status: 500 });
  }
}
