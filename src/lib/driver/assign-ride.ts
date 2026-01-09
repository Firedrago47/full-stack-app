import prisma from "@/lib/prisma";
import { RideStatus } from "@prisma/client";

/**
 * Assigns the oldest REQUESTED ride to a driver atomically.
 * Returns the assigned ride or null.
 */
export async function assignRideToDriver(driverId: string) {
  return prisma.$transaction(async (tx) => {
    // 1️⃣ Ensure driver has NO active ride
    const existing = await tx.ride.findFirst({
      where: {
        driverId,
        status: {
          in: [
            RideStatus.ASSIGNED,
            RideStatus.ACCEPTED,
            RideStatus.STARTED,
          ],
        },
      },
      select: { id: true },
    });

    if (existing) return null;

    // 2️⃣ Find oldest unassigned ride
    const candidate = await tx.ride.findFirst({
      where: {
        status: RideStatus.REQUESTED,
        driverId: null,
      },
      orderBy: { createdAt: "asc" },
      select: { id: true },
    });

    if (!candidate) return null;

    // 3️⃣ Atomically claim the ride (race-safe)
    const result = await tx.ride.updateMany({
      where: {
        id: candidate.id,
        status: RideStatus.REQUESTED,
        driverId: null,
      },
      data: {
        driverId,
        status: RideStatus.ASSIGNED,
      },
    });

    // If update failed, someone else took it
    if (result.count === 0) {
      return null;
    }

    // 4️⃣ Fetch and return the assigned ride
    return tx.ride.findUnique({
      where: { id: candidate.id },
    });
  });
}
