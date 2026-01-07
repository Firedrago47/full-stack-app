import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";
import { RideStatus, Ride } from "@prisma/client";

export type DriverDashboardData = {
  driver: {
    id: string;
    isAvailable: boolean;
    todayEarningsCents: number;
  };
  activeRide: {
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
  } | null;
};

export async function getDriverDashboardData(): Promise<DriverDashboardData> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const driver = await prisma.driver.findUnique({
    where: { userId: user.id },
    select: {
      id: true,
      isAvailable: true,
    },
  });

  if (!driver) throw new Error("Forbidden");

  // 1️⃣ Active ride already assigned to this driver
  const activeRide = await prisma.ride.findFirst({
    where: {
      driverId: driver.id,
      status: {
        notIn: [RideStatus.COMPLETED, RideStatus.CANCELLED],
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (activeRide) {
    return {
      driver: {
        ...driver,
        todayEarningsCents: await getTodayEarnings(driver.id),
      },
      activeRide: mapRide(activeRide),
    };
  }

  // 2️⃣ Incoming customer request (unassigned)
  const incomingRide = await prisma.ride.findFirst({
    where: {
      status: RideStatus.REQUESTED,
      driverId: null,
    },
    orderBy: { createdAt: "asc" }, // FIFO
  });

  return {
    driver: {
      ...driver,
      todayEarningsCents: await getTodayEarnings(driver.id),
    },
    activeRide: incomingRide ? mapRide(incomingRide) : null,
  };
}

/* -------------------------------- helpers -------------------------------- */

function mapRide(ride: Ride) {
  return {
    id: ride.id,
    status: ride.status,
    pickup: {
      address: ride.pickupAddress ?? "Pickup location",
      lat: ride.pickupLat,
      lng: ride.pickupLng,
    },
    drop: {
      address: ride.dropAddress,
      lat: ride.dropLat,
      lng: ride.dropLng,
    },
  };
}

async function getTodayEarnings(driverId: string): Promise<number> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const result = await prisma.ride.aggregate({
    where: {
      driverId,
      status: RideStatus.COMPLETED,
      completedAt: {
        gte: startOfDay,
      },
    },
    _sum: {
      fareCents: true,
    },
  });

  return result._sum.fareCents ?? 0;
}
