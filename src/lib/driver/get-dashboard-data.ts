import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { RideStatus } from "@prisma/client";

export type DriverDashboardData = {
  driver: {
    id: string;
    isAvailable: boolean;
    todayEarningsCents: number;
  };
  activeRide: null | {
    id: string;
    status: RideStatus;
    pickup: {
      address: string;
      lat: number;
      lng: number;
    };
    drop: {
      address: string | null;
      lat: number | null;
      lng: number | null;
    };
  };
};

export async function getDriverDashboardData(): Promise<DriverDashboardData> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // 1️⃣ Driver
  const driver = await prisma.driver.findUnique({
    where: { userId: user.id },
    select: {
      id: true,
      isAvailable: true,
    },
  });

  if (!driver) throw new Error("Forbidden") ;

  // 2️⃣ Active ride (direct from Ride table)
  const activeRide = await prisma.ride.findFirst({
    where: {
      driverId: driver.id,
      status: {
        in: [
          RideStatus.REQUESTED,
          RideStatus.ACCEPTED,
          RideStatus.STARTED,
        ],
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      status: true,
      pickupLat: true,
      pickupLng: true,
      pickupAddress: true,
      dropLat: true,
      dropLng: true,
      dropAddress: true,
    },
  });

  // 3️⃣ Today earnings (simple, correct)
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const todayEarnings = await prisma.ride.aggregate({
    where: {
      driverId: driver.id,
      status: RideStatus.COMPLETED,
      completedAt: {
        gte: startOfDay,
      },
    },
    _sum: {
      fareCents: true,
    },
  });

  return {
    driver: {
      id: driver.id,
      isAvailable: driver.isAvailable,
      todayEarningsCents: todayEarnings._sum.fareCents ?? 0,
    },
    activeRide: activeRide
      ? {
          id: activeRide.id,
          status: activeRide.status,
          pickup: {
            address: activeRide.pickupAddress ?? "Pickup location",
            lat: activeRide.pickupLat,
            lng: activeRide.pickupLng,
          },
          drop: {
            address: activeRide.dropAddress,
            lat: activeRide.dropLat,
            lng: activeRide.dropLng,
          },
        }
      : null,
  };
}
