"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useRideStatus(rideId?: string) {
  return useSWR(
    rideId ? `/api/rides/${rideId}` : null,
    fetcher,
    {
      refreshInterval: 3000, // poll every 3s
    }
  );
}
