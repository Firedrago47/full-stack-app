import DashboardShell from "../shared/layout/DashboardShell";
import CategoryCarousel from "../shared/layout/CategoryCarousel";
import FeaturedGrid from "../commerce/shared/FeaturedGrid";

export default function CustomerDashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <CategoryCarousel active="default"/>
        <FeaturedGrid />
      </div>
    </DashboardShell>
  );
}
