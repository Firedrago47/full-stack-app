
import DashboardShell from "../components/DashboardShell";
import CategoryCarousel from "../components/CategoryCarousel";

import ItemsSection from "../components/ItemsSection";
import Filter from "../components/Filter";



export default async function CustomerDashboardPage(){
  return (
      <DashboardShell>
        <div className="space-y-6">
          <CategoryCarousel />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            <Filter/>
            {/* Items */}
            <section className="lg:col-span-3 space-y-4">
              <ItemsSection />
            </section>
          </div>
        </div>
      </DashboardShell>
  );
}
