"use client";

import useSWR from "swr";
import StatusBar from "./status-bar";
import ActiveRide from "./ActiveRide";
import EmptyState from "./empty-state";
import DriverMap from "./DriverMap";
import { acceptRide, startRide, completeRide } from "../dashboard/action";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function DriverDashboardClient({
  initialData,
}: {
  initialData: any;
}) {
  const { data } = useSWR(
    "/api/driver",
    fetcher,
    {
      refreshInterval: 10000, // 🔑 polling
      fallbackData: initialData,
    }
  );

  if (!data?.activeRide) {
    return (
      <>
        <StatusBar
          isAvailable={data.driver.isAvailable}
          todayEarningsCents={data.driver.todayEarningsCents}
        />
        <EmptyState />
      </>
    );
  }

  const { driver, activeRide } = data;

  return (
    <>
      <StatusBar
        isAvailable={driver.isAvailable}
        todayEarningsCents={driver.todayEarningsCents}
      />

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveRide
          ride={activeRide}
          onAccept={() => acceptRide(activeRide.id)}
          onStart={() => startRide(activeRide.id)}
          onComplete={() => completeRide(activeRide.id)}
        />

        <div className="bg-white border rounded-xl p-2">
          <DriverMap />
        </div>
      </div>
    </>
  );
}
