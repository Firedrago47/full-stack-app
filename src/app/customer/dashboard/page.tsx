export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ProtectedLayout from "@/components/ProtectedLayout";
import DashboardShell from "../components/DashboardShell";
import { getCurrentUser } from "@/lib/auth/current-user";
import prisma from "@/lib/prisma";

import CategoryCarousel from "../components/CategoryCarousel";
// import FeaturedGrid from "../components/FeaturedGrid";
import ItemList from "../components/ItemList";

export default async function CustomerDashboardPage() {
  const user = await getCurrentUser();

  const items = await prisma.item.findMany({
    where: { isActive: true },
    take: 20,
    orderBy: { createdAt: "desc" },
  });

  return (
    <ProtectedLayout allowedRoles={["CUSTOMER"]}>
      <DashboardShell>
        <div className="space-y-6">
          {/* Categories */}
          <Suspense fallback={<div>Loading...</div>}>
          <div className="item-center">

            <CategoryCarousel />
          </div>
          </Suspense>

          {/* Featured */}
          {/* <FeaturedGrid /> */}

          {/* Items list + sidebar filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1 mx-6 space-y-4">
              <div className="p-4 bg-white border rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold">Filters</h3>
                <div className="mt-3 space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> <span>Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> <span>Vegan</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> <span>Fast Delivery</span>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-white border rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold">Near you</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Restaurants & shops delivering within 5km
                </p>
              </div>
            </aside>

            <section className="lg:col-span-3 space-y-4">
              <ItemList items={items} />
            </section>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
