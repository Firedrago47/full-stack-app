export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "../_admin-helpers";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const customers = await prisma.user.findMany({
      where: { role: "CUSTOMER" },
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

    return NextResponse.json(customers);
  } catch (err) {
    console.error("Customers API error:", err);
    return NextResponse.json({ error: "Failed to load customers" }, { status: 500 });
  }
}
