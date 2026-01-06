"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { RideStatus } from "@prisma/client";

export async function createRide(input: {
  pickupLat: number;
  pickupLng: number;
  pickupAddress: string;
  dropLat: number;
  dropLng: number;
  dropAddress: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const ride = await prisma.ride.create({
    data: {
      customerId: user.id,
      pickupLat: input.pickupLat,
      pickupLng: input.pickupLng,
      pickupAddress: input.pickupAddress,
      dropLat: input.dropLat,
      dropLng: input.dropLng,
      dropAddress: input.dropAddress,
      status: RideStatus.REQUESTED,
    },
  });

  return ride;
}
