import DashboardShell from "../shared/layout/DashboardShell";
import DriverDashboard from "./DriverDashboard";
import { getDriverDashboardData } from "@/lib/driver/get-dashboard-data";
import type { DriverDashboardData } from "../types";

export default async function DriverDashboardPage() {
  const initialData =
    (await getDriverDashboardData()) as DriverDashboardData;

  return (
    <DashboardShell>
      <DriverDashboard initialData={initialData} />
    </DashboardShell>
  );
}
