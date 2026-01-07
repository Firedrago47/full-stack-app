"use client";

import useSWR from "swr";
import { RideStatus } from "@prisma/client";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useRideStatus(rideId?: string, enabled = true) {
  return useSWR(
    enabled && rideId ? `/api/rides/${rideId}` : null,
    fetcher,
    {
      refreshInterval: enabled ? 3000 : 0,
    }
  );
}
