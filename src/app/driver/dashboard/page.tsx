// app/driver/dashboard/page.tsx
import DashboardShell from "../components/DashboardShell";
import DriverDashboardClient from "../components/DriverDashboardClient";
import { getDriverDashboardData } from "@/lib/driver/get-dashboard-data";

export default async function DriverDashboardPage() {
  const initialData = await getDriverDashboardData();

  return (
    <DashboardShell>
      <DriverDashboardClient initialData={initialData} />
    </DashboardShell>
  );
}
