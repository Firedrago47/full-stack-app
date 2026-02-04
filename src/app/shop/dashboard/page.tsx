import { getCurrentUser } from "@/lib/auth/current-user";
import DashboardShell from "../shared/layout/DashboardShell";

import ShopStats from "./components/ShopStats";
import ShopQuickActions from "./components/ShopQuickActions";
import ShopRecentOrders from "./components/ShopRecentOrders";
import ShopStatusCard from "./components/ShopStatusCard";

export default async function ShopDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
      <DashboardShell>
        <div className="space-y-6 p-4">
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
