// app/api/admin/export/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "../_admin-helpers";

function toCSV(rows: any[], columns: string[]) {
  const header = columns.join(",") + "\n";
  const body = rows
    .map((r) =>
      columns
        .map((c) => {
          const v = r[c] ?? "";
          // escape double quotes
          return `"${String(v).replace(/"/g, '""')}"`;
        })
        .join(",")
    )
    .join("\n");
  return header + body;
}

export async function GET(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const url = new URL(req.url);
  const type = url.searchParams.get("type") ?? "users"; // users | drivers | shops

  try {
    if (type === "users") {
      const rows = await prisma.user.findMany({
        select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true, deletedAt: true },
        orderBy: { createdAt: "desc" },
      });
      const csv = toCSV(rows, ["id", "name", "email", "phone", "role", "createdAt", "deletedAt"]);
      return new NextResponse(csv, {
        status: 200,
        headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="users.csv"` },
      });
    }

    if (type === "drivers") {
      const rows = await prisma.driver.findMany({
        include: { user: { select: { id: true, name: true, email: true, phone: true } } },
        orderBy: { createdAt: "desc" },
      });
      // flatten
      const flat = rows.map((r) => ({
        id: r.id,
        name: r.user?.name ?? "",
        email: r.user?.email ?? "",
        phone: r.user?.phone ?? "",
        isActive: r.isActive,
        createdAt: r.createdAt,
      }));
      const csv = toCSV(flat, ["id", "name", "email", "phone", "isActive", "createdAt"]);
      return new NextResponse(csv, {
        status: 200,
        headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="drivers.csv"` },
      });
    }

    if (type === "shops") {
      const rows = await prisma.shop.findMany({
        select: { id: true, name: true, address: true, phone: true, isOpen: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      });
      const csv = toCSV(rows, ["id", "name", "address", "phone", "isOpen", "createdAt"]);
      return new NextResponse(csv, {
        status: 200,
        headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="shops.csv"` },
      });
    }

    return NextResponse.json({ error: "Unknown export type" }, { status: 400 });
  } catch (err: any) {
    console.error("/api/admin/export error:", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
