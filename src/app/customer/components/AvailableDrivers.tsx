"use client";

import useSWR from "swr";
import { Button } from "@/components/ui/button";

interface Props {
  vehicle: "BIKE" | "AUTO" | "CAR";
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AvailableDrivers({ vehicle }: Props) {
  const { data, isLoading } = useSWR(
    `/api/rides/available`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      dedupingInterval: 60_000,
    }
  );

  if (isLoading) {
    return <p className="text-sm">Finding drivers...</p>;
  }

  if (!data || data.drivers.length === 0) {
    return <p className="text-sm text-muted-foreground">No drivers nearby</p>;
  }

  return (
    <div className="min-h-screen space-y-3">
      {data.drivers.map((d: any) => (
        <div
          key={d.id}
          className="flex items-center justify-between border rounded-md p-3"
        >
          <span className="text-sm font-medium">
            Driver #{d.id.slice(0, 6)}
          </span>

          <Button size="sm">Book</Button>
        </div>
      ))}
    </div>
  );
}
