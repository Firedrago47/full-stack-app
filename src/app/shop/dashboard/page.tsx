import { getCurrentUser } from "@/lib/auth/current-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardShell from "@/components/dashboard/DashboardShell";
import ProtectedLayout from "@/components/ProtectedLayout";

export default async function ShopDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <ProtectedLayout allowedRoles={["SHOP_OWNER"]}>
      <DashboardShell>
        <div className="px-6 py-10 max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-semibold">Shop Owner Dashboard</h1>

          <Card>
            <CardHeader>
              <CardTitle>Your Shop</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Shop name: Your Shop</p>
              <p>Orders pending: 0</p>
              <Button>Add Product</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No orders yet</p>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
