import { getCurrentUser } from "@/lib/auth/current-user";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProtectedLayout from "@/components/ProtectedLayout";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DriverDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <ProtectedLayout allowedRoles={["DRIVER"]}>
      <DashboardShell>
        <div className="px-6 py-10 max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-semibold">Driver Dashboard</h1>

          <Card>
            <CardHeader>
              <CardTitle>Your Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Status: <strong>Available</strong>
              </p>
              <Button>Toggle Availability</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Incoming Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No orders assigned</p>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
