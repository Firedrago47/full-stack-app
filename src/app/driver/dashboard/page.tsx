import StatusBar from "../components/status-bar";
import DriverMap from "../components/driver-map";
import EmptyState from "../components/empty-state";
import { getDriverDashboardData } from "@/lib/driver/get-dashboard-data";
import ActiveRide from "../components/active-order";

import {
  acceptRide,
  startRide,
  completeRide,
} from "./action";
import DashboardShell from "../components/DashboardShell";


export default async function DriverDashboardPage() {
  const data = await getDriverDashboardData();

  // No active ride → show empty state
  if (!data.activeRide) {
    return (
      <DashboardShell>
        <StatusBar
          isAvailable={data.driver.isAvailable}
          todayEarningsCents={data.driver.todayEarningsCents}
        />
        <EmptyState />
      </DashboardShell>
    );
  }

  const { driver, activeRide } = data;

  return (
    <DashboardShell> 

      {/* Driver status + earnings */}
      <StatusBar
        isAvailable={driver.isAvailable}
        todayEarningsCents={driver.todayEarningsCents}
      />

      {/* Active ride card */}
      <ActiveRide
        ride={activeRide}
        onAccept={async () => {
          "use server";
          await acceptRide(activeRide.id);
        }}
        onStart={async () => {
          "use server";
          await startRide(activeRide.id);
        }}
        onComplete={async () => {
          "use server";
          await completeRide(activeRide.id);
        }}
      />

      {/* Map placeholder */}
      <DriverMap />
  </DashboardShell>
  );
}
