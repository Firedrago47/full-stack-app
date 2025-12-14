import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const groceries = await prisma.item.findMany({
    where: { source: "WAREHOUSE" },
  });

  return NextResponse.json({ groceries });
}
