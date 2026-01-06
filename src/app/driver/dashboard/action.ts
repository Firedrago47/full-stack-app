"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { RideStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function acceptRide(rideId: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const driver = await prisma.driver.findUnique({
    where: { userId: user.id },
    select: { id: true, isAvailable: true },
  });

  if (!driver) throw new Error("Forbidden");
  if (!driver.isAvailable) throw new Error("Driver is offline");

  // ✅ Atomic accept (prevents double-accept)
  const ride = await prisma.ride.updateMany({
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

  if (ride.count === 0) {
    throw new Error("Ride already accepted");
  }

  // mark driver busy
  await prisma.driver.update({
    where: { id: driver.id },
    data: { isAvailable: false },
  });

  revalidatePath("/driver/dashboard");
}

export async function startRide(rideId: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const driver = await prisma.driver.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!driver) throw new Error("Forbidden");

  const updated = await prisma.ride.updateMany({
    where: {
      id: rideId,
      driverId: driver.id,
      status: RideStatus.ACCEPTED,
    },
    data: {
      status: RideStatus.STARTED,
      startedAt: new Date(),
    },
  });

  if (updated.count === 0) {
    throw new Error("Ride cannot be started");
  }

  revalidatePath("/driver/dashboard");
}
export async function completeRide(rideId: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const driver = await prisma.driver.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!driver) throw new Error("Forbidden");

  const updated = await prisma.ride.updateMany({
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

  // driver available again
  await prisma.driver.update({
    where: { id: driver.id },
    data: {
      isAvailable: true,
      lastSeenAt: new Date(),
    },
  });

  revalidatePath("/driver/dashboard");
}

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
