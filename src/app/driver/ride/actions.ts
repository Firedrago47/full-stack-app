"use server";

import prisma from "@/lib/prisma";
import { RideStatus } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/current-user";

export async function startRide(rideId: string) {
  const driver = await getCurrentUser();
  if (!driver) throw new Error("Unauthorized");

  await prisma.ride.updateMany({
    where: {
      id: rideId,
      driverId: driver.id,
      status: RideStatus.ACCEPTED,
    },
    data: {
      status: RideStatus.STARTED,
    },
  });
}

export async function completeRide(rideId: string) {
  const driver = await getCurrentUser();
  if (!driver) throw new Error("Unauthorized");

  await prisma.ride.updateMany({
    where: {
      id: rideId,
      driverId: driver.id,
      status: RideStatus.STARTED,
    },
    data: {
      status: RideStatus.COMPLETED,
    },
  });
}
