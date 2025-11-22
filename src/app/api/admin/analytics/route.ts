export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "../_admin-helpers";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const [totalUsers, totalDrivers, totalShops] = await Promise.all([
      prisma.user.count(),
      prisma.driver.count(),
      prisma.user.count({ where: { role: "SHOP_OWNER" } }),
    ]);

    return NextResponse.json({
      totalUsers,
      totalDrivers,
      totalShops,
    });
  } catch (err) {
    console.error("Analytics API error:", err);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
