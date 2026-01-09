import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { assignRideToDriver } from "@/lib/driver/assign-ride";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(null, { status: 401 });
  }

  const driver = await prisma.driver.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!driver) {
    return NextResponse.json(null, { status: 403 });
  }

  const ride = await assignRideToDriver(driver.id);

  return NextResponse.json({ ride });
}
