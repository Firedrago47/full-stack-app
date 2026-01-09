"use client";

import useSWR from "swr";
import { RideStatus } from "@prisma/client";
import type { RideStatusResponse } from "@/types/ride";

const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch ride status");
  }
  return res.json();
};

export function useRideStatus(rideId?: string) {
  return useSWR<RideStatusResponse>(
    rideId ? `/api/rides/${rideId}` : null,
    fetcher,
    {
      refreshInterval: (data) => {
        const status = data?.ride.status;

        if (
          status === RideStatus.COMPLETED ||
          status === RideStatus.CANCELLED        ) {
          return 0;
        }

        return 3000;
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
