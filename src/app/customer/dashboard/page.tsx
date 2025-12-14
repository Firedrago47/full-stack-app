
import { Suspense } from "react";
import ProtectedLayout from "@/components/ProtectedLayout";
import DashboardShell from "../components/DashboardShell";
import CategoryCarousel from "../components/CategoryCarousel";

import ItemsSection from "../components/ItemsSection";



export default async function CustomerDashboardPage(){
  return (
    <ProtectedLayout allowedRoles={["CUSTOMER"]}>
      <DashboardShell>
        <div className="space-y-6">
          <CategoryCarousel />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
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
            </aside>

            {/* Items */}
            <section className="lg:col-span-3 space-y-4">
              <ItemsSection />
            </section>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}
