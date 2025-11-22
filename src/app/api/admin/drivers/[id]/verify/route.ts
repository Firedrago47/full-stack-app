export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_admin-helpers";

export async function POST(req: Request) {
  // Extract /api/admin/drivers/<id>/verify
  const url = new URL(req.url);
  const parts = url.pathname.split("/"); 
  const rawId = parts[parts.length - 2]; // before "verify"

  if (!rawId) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    let driver;

    // Try by driver.id
    try {
      driver = await prisma.driver.update({
        where: { id: rawId },
        data: { isActive: true },
        include: { user: true },
      });
    } catch {
      // Try by userId
      driver = await prisma.driver.update({
        where: { userId: rawId },
        data: { isActive: true },
        include: { user: true },
      });
    }

    return NextResponse.json({ ok: true, driver });
  } catch (err: any) {
    console.error("[VERIFY DRIVER] error:", err);
    return NextResponse.json(
      { error: "Failed to verify driver", details: err.message },
      { status: 500 }
    );
  }
}
