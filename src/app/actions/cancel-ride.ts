// app/actions/cancel-ride.ts
"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { RideStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function cancelRide(rideId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.ride.updateMany({
    where: {
      id: rideId,
      customerId: user.id,
      status: {
        in: [
          RideStatus.REQUESTED,
          RideStatus.ACCEPTED,
        ],
      },
    },
    data: {
      status: RideStatus.CANCELLED,
      cancelledAt: new Date(),
    },
  });

  // refresh driver + customer dashboards
  revalidatePath("/driver/dashboard");
  revalidatePath("/customer/dashboard");
}
