import { RideStatus } from "@prisma/client";

export interface DriverDashboardData {
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
}

export type DriverActiveRide =
  NonNullable<DriverDashboardData["activeRide"]>;


