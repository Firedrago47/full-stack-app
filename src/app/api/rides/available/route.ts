import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { RideStatus } from "@prisma/client";

export async function GET() {
  const drivers = await prisma.driver.findMany({
    where: {
      isActive: true,
      isAvailable: true,

      ridesAssigned: {
        none: {
          status: {
            in: [
              RideStatus.REQUESTED,
              RideStatus.ACCEPTED,
              RideStatus.STARTED,
            ],
          },
        },
      },
    },
    select: {
      id: true,
      userId: true,
      lastLatitude: true,
      lastLongitude: true,
      lastSeenAt: true,
    },
    take: 20,
  });

  return NextResponse.json({
    drivers,
  },{
      headers: {
        "Cache-Control": "no-store",
      },
    });
}
