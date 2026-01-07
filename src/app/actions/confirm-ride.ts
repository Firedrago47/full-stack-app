"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { RideStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function confirmRide(rideId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const updated = await prisma.ride.updateMany({
    where: {
      id: rideId,
      customerId: user.id,
      status: RideStatus.ACCEPTED,
    },
    data: {
      status: RideStatus.CONFIRMED,
    },
  });

  if (updated.count === 0) {
    throw new Error("Ride cannot be confirmed");
  }

  revalidatePath("/customer/dashboard");
  revalidatePath("/driver/dashboard");
}
