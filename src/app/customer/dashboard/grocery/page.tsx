import DashboardShell from "../../shared/layout/DashboardShell";
import ItemsSection from "../../commerce/shared/ItemsSection";
import Filter from "../../commerce/shared/Filter";
import CategoryCarousel from "../../shared/layout/CategoryCarousel";

export default function GroceryDashboardPage() {
  return (
    <DashboardShell>
      <CategoryCarousel active="grocery"/>
      <div className="grid grid-cols-1 lg:grid-cols-4 mt-6 gap-4">
        <Filter category="grocery"/>
        <section className="lg:col-span-3 space-y-4">
          <ItemsSection category="groceries"/>
        </section>
      </div>
    </DashboardShell>
  );
}
