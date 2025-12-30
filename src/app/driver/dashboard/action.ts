"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { RideStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";


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

    const ride = await tx.ride.findUnique({
      where: { id: rideId },
      select: { status: true, driverId: true },
    });

    if (!ride) throw new Error("Ride not found");
    if (ride.status !== RideStatus.REQUESTED) {
      throw new Error("Ride cannot be accepted");
    }

    await tx.ride.update({
      where: { id: rideId },
      data: {
        status: RideStatus.ACCEPTED,
        driverId: driver.id,
      },
    });

    // driver now busy
    await tx.driver.update({
      where: { id: driver.id },
      data: { isAvailable: false },
    });
  });

  revalidatePath("/driver/dashboard");
}


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

    if (!ride || ride.driverId !== driver.id) {
      throw new Error("Ride not assigned to driver");
    }

    if (ride.status !== RideStatus.ACCEPTED) {
      throw new Error("Ride cannot be started");
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


export async function completeRide(rideId: string): Promise<void> {
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

    if (!ride || ride.driverId !== driver.id) {
      throw new Error("Ride not assigned to driver");
    }

    if (ride.status !== RideStatus.STARTED) {
      throw new Error("Ride cannot be completed");
    }

    await tx.ride.update({
      where: { id: rideId },
      data: {
        status: RideStatus.COMPLETED,
        completedAt: new Date(),
      },
    });

    // driver becomes available again
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
/* TOGGLE AVAILABILITY (MANUAL) */
/* -------------------------------- */
export async function toggleDriverAvailability(
  isAvailable: boolean
): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const driver = await prisma.driver.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!driver) throw new Error("Forbidden");

  await prisma.driver.update({
    where: { id: driver.id },
    data: {
      isAvailable,
      lastSeenAt: new Date(),
    },
  });

  revalidatePath("/driver/dashboard");
}
