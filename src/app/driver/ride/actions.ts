"use server";

import prisma from "@/lib/prisma";
import { RideStatus } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/current-user";
import { revalidatePath } from "next/cache";

export async function startRide(rideId: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.$transaction(async (tx) => {
    const driver = await tx.driver.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!driver) throw new Error("Forbidden");

    const ride = await tx.ride.findUnique({
      where: { id: rideId },
      select: { status: true, driverId: true },
    });

    if (!ride) throw new Error("Ride not found");
    if (ride.driverId !== driver.id) {
      throw new Error("Ride not assigned to driver");
    }
    if (ride.status !== RideStatus.CONFIRMED) {
      throw new Error("Ride not confirmed by customer");
    }

    await tx.ride.update({
      where: { id: rideId },
      data: {
        status: RideStatus.STARTED,
        startedAt: new Date(),
      },
    });
  });

  revalidatePath("/driver/dashboard");
}


export async function completeRide(rideId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // 🔒 Resolve driver identity
  const driver = await prisma.driver.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!driver) throw new Error("Forbidden");

  const result = await prisma.ride.updateMany({
    where: {
      id: rideId,
      driverId: driver.id,
      status: RideStatus.STARTED,
    },
    data: {
      status: RideStatus.COMPLETED,
      completedAt: new Date(),
    },
  });

  if (result.count === 0) {
    throw new Error("Ride cannot be completed");
  }

  revalidatePath("/driver/dashboard");
}