"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { RideStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function acceptRide(rideId: string, driverId: string) {
  const updated = await prisma.ride.updateMany({
    where: {
      id: rideId,
      driverId,
      status: RideStatus.ASSIGNED,
    },
    data: {
      status: RideStatus.ACCEPTED,
    },
  });

  if (updated.count === 0) {
    throw new Error("Ride cannot be accepted");
  }
}

export async function rejectRide(rideId: string, driverId: string) {
  await prisma.ride.updateMany({
    where: {
      id: rideId,
      driverId,
      status: RideStatus.ASSIGNED,
    },
    data: {
      driverId: null,
      status: RideStatus.REQUESTED,
    },
  });
}

