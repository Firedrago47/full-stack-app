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

  // ✅ ONLY driver-owned active ride
  const activeRide = await prisma.ride.findFirst({
    where: {
      driverId: driver.id,
      status: {
        in: [
          RideStatus.ASSIGNED,
          RideStatus.ACCEPTED,
          RideStatus.STARTED,
        ],
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return {
    driver: {
      ...driver,
      todayEarningsCents: await getTodayEarnings(driver.id),
    },
    activeRide: activeRide ? mapRide(activeRide) : null,
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
