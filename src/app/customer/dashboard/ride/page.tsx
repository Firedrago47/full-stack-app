import DashboardShell from "../../shared/layout/DashboardShell";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CategoryCarousel from "../../shared/layout/CategoryCarousel";

export default function RideDashboardPage() {
  return (
    <DashboardShell>
            <CategoryCarousel active="ride"/>
      <div className="max-w-xl mx-auto mt-6 space-y-6">
        <h1 className="text-2xl font-bold">Rides</h1>

        <p className="text-sm text-muted-foreground">
          Book a new ride or track your active ride.
        </p>

        <Link href="/customer/ride/book">
          <Button className="w-full">Book a Ride</Button>
        </Link>
      </div>
    </DashboardShell>
  );
}
