// app/api/admin/users/[id]/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/app/api/admin/_admin-helpers";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = params;
  const body = await req.json().catch(() => ({}));
  // expected body: { action: "suspend" | "restore" }
  const action = body.action;

  if (!["suspend", "restore"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  try {
    const updateData =
      action === "suspend"
        ? { deletedAt: new Date() } // soft-suspend
        : { deletedAt: null };

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, name: true, email: true, phone: true, deletedAt: true },
    });

    return NextResponse.json({ ok: true, user });
  } catch (err: any) {
    console.error("/api/admin/users/[id] PATCH error:", err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
