import DashboardShell from "../shared/layout/DashboardShell";
import CategoryCarousel from "../shared/layout/CategoryCarousel";
import FeaturedGrid from "../commerce/shared/FeaturedGrid";
import { Button } from "@/components/ui/button";

export default function CustomerDashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <CategoryCarousel active="default" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Today’s Highlights</h2>
          <Button variant="link" size="sm">
            View All Products
          </Button>
        </div>
        <FeaturedGrid />

      </div>
    </DashboardShell>
  );
}
