"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { RideStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

/* -------------------------------- */
/* ACCEPT RIDE */
/* -------------------------------- */
export async function acceptRide(rideId: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.$transaction(async (tx) => {
    const driver = await tx.driver.findUnique({
      where: { userId: user.id },
      select: { id: true, isAvailable: true },
    });

    if (!driver) throw new Error("Forbidden");
    if (!driver.isAvailable) throw new Error("Driver is offline");

    const updated = await tx.ride.updateMany({
      where: {
        id: rideId,
        status: RideStatus.REQUESTED,
        driverId: null,
      },
      data: {
        status: RideStatus.ACCEPTED,
        driverId: driver.id,
      },
    });

    if (updated.count === 0) {
      throw new Error("Ride already accepted");
    }

    await tx.driver.update({
      where: { id: driver.id },
      data: { isAvailable: false },
    });
  });

  revalidatePath("/driver/dashboard");
}

/* -------------------------------- */
/* START RIDE */
/* -------------------------------- */
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

/* -------------------------------- */
/* COMPLETE RIDE */
/* -------------------------------- */
export async function completeRide(rideId: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.$transaction(async (tx) => {
    const driver = await tx.driver.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!driver) throw new Error("Forbidden");

    const updated = await tx.ride.updateMany({
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

    if (updated.count === 0) {
      throw new Error("Ride cannot be completed");
    }

    await tx.driver.update({
      where: { id: driver.id },
      data: {
        isAvailable: true,
        lastSeenAt: new Date(),
      },
    });
  });

  revalidatePath("/driver/dashboard");
}

/* -------------------------------- */
/* TOGGLE AVAILABILITY */
/* -------------------------------- */
export async function toggleDriverAvailability(
  isAvailable: boolean
): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.$transaction(async (tx) => {
    const driver = await tx.driver.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!driver) throw new Error("Forbidden");

    const activeRide = await tx.ride.findFirst({
      where: {
        driverId: driver.id,
        status: {
          in: [
            RideStatus.ACCEPTED,
            RideStatus.CONFIRMED,
            RideStatus.STARTED,
          ],
        },
      },
    });

    if (activeRide) {
      throw new Error("Cannot change availability during active ride");
    }

    await tx.driver.update({
      where: { id: driver.id },
      data: {
        isAvailable,
        lastSeenAt: new Date(),
      },
    });
  });

  revalidatePath("/driver/dashboard");
}
