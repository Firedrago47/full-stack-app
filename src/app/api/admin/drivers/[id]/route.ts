export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_admin-helpers";

export async function GET(req: Request) {
  // Extract /api/admin/drivers/<id>
  const url = new URL(req.url);
  const parts = url.pathname.split("/"); 
  const rawId = parts[parts.length - 1];

  if (!rawId || rawId === "drivers") {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    // Try driver.id
    let driver = await prisma.driver.findUnique({
      where: { id: rawId },
      include: {
        user: true,
      },
    });

    // If not found, try driver.userId
    if (!driver) {
      driver = await prisma.driver.findUnique({
        where: { userId: rawId },
        include: { user: true },
      });
    }

    if (!driver) {
      return NextResponse.json(
        { error: "Driver not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, driver });
  } catch (err: any) {
    console.error("[GET DRIVER] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch driver", details: err.message },
      { status: 500 }
    );
  }
}
