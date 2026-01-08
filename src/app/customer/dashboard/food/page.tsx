import DashboardShell from "../../shared/layout/DashboardShell";
import ItemsSection from "../../commerce/shared/ItemsSection";
import Filter from "../../commerce/shared/Filter";
import CategoryCarousel from "../../shared/layout/CategoryCarousel";
import FeaturedGrid from "../../commerce/shared/FeaturedGrid";

export default function FoodDashboardPage() {
  return (
    <DashboardShell>
        <CategoryCarousel active="food"/>
      <div className="grid grid-cols-1 lg:grid-cols-4 mt-6 gap-6">
        <Filter category="food"/>
        <section className="lg:col-span-3 space-y-4">
          <ItemsSection category="food"/>
        </section>
      </div>
    </DashboardShell>
  );
}
