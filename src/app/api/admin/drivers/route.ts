export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "../_admin-helpers";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const drivers = await prisma.driver.findMany({
      take: 100,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true },
        },
      },
    });

    // Normalize output
    const formatted = drivers.map((d) => ({
      id: d.id,
      userId: d.userId,
      name: d.user?.name,
      email: d.user?.email,
      phone: d.user?.phone,
      licenseNumber: d.licenseNumber,
      vehicleNumber: d.vehicleNumber,
      vehicleModel: d.vehicleModel,
      isActive: d.isActive,
      createdAt: d.createdAt,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Drivers API error:", err);
    return NextResponse.json({ error: "Failed to load drivers" }, { status: 500 });
  }
}
