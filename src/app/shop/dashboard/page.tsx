import { getCurrentUser } from "@/lib/auth/current-user";
import DashboardShell from "../components/DashboardShell";

import ShopStats from "../components/ShopStats";
import ShopQuickActions from "../components/ShopQuickActions";
import ShopRecentOrders from "../components/ShopRecentOrders";
import ShopStatusCard from "../components/ShopStatusCard";

export default async function ShopDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
      <DashboardShell>
        <div className="space-y-8 p-4">
          <h1 className="text-3xl font-bold">Shop Dashboard</h1>
          <p className="text-muted-foreground">
            Manage items, view orders and track your shop performance.
          </p>

          <ShopStatusCard />
          <ShopStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ShopRecentOrders />
            </div>

            <div>
              <ShopQuickActions />
            </div>
          </div>
        </div>
      </DashboardShell>
  );
}
