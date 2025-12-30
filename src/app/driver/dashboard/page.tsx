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


export default async function DriverDashboardPage() {
  const data = await getDriverDashboardData();

  // No active ride → show empty state
  if (!data.activeRide) {
    return (
      <div className="p-4">
        <StatusBar
          isAvailable={data.driver.isAvailable}
          todayEarningsCents={data.driver.todayEarningsCents}
        />
        <EmptyState />
      </div>
    );
  }

  const { driver, activeRide } = data;

  return (
    <div className="space-y-4 p-4">
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
    </div>
  );
}
