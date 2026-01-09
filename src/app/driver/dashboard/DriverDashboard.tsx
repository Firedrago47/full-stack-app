"use client";

import useSWR from "swr";
import type { DriverDashboardData } from "../types";
import ActiveRideCard from "./components/ActiveRideCard";
import EmptyState from "./components/EmptyState";
import StatusBar from "./components/StatusBar";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Failed to fetch");
    return r.json();
  });

interface Props {
  initialData: DriverDashboardData;
}

export default function DriverDashboard({ initialData }: Props) {
  
  const {
    data,
    mutate,
  } = useSWR<DriverDashboardData>(
    "/api/driver",
    fetcher,
    {
      fallbackData: initialData,
      refreshInterval: 10000,
      revalidateOnFocus: false,
    }
  );

  const activeRide = data?.activeRide;

  useSWR(
  activeRide ? null : "/api/driver/assignment",
  (url) =>
    fetch(url, {
      cache: "no-store", 
    }).then((r) => r.json()),
  {
    refreshInterval: 10000,
    revalidateOnFocus: false,
    onSuccess: (res) => {
      if (res?.ride) {
        mutate();
      }
    },
  }
);


  if (!data) return null;

  const { driver } = data;

  return (
    <div className="space-y-6">
      <StatusBar
        todayEarningsCents={driver.todayEarningsCents}
      />

      {!activeRide && (
        <EmptyState text="Waiting for ride requests…" />
      )}

      {activeRide && (
        <ActiveRideCard
          ride={activeRide}
          driverId={driver.id}
        />
      )}
    </div>
  );
}
