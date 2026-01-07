"use client";

import useSWR from "swr";
import { RideStatus } from "@prisma/client";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useRideStatus(rideId?: string) {
  return useSWR(
    rideId ? `/api/rides/${rideId}` : null,
    fetcher,
    {
      refreshInterval: (data) => {
        const status: RideStatus | undefined = data?.ride?.status;

        if (!status) return 3000;

        if (
          status === RideStatus.COMPLETED ||
          status === RideStatus.CANCELLED
        ) {
          return 0;
        }

        return 3000;
      },

      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
