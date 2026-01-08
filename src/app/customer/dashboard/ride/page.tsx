import DashboardShell from "../../shared/layout/DashboardShell";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CategoryCarousel from "../../shared/layout/CategoryCarousel";

export default function RideDashboardPage() {
  const hasActiveRide = false; // later from API

  return (
    <DashboardShell>
      <CategoryCarousel active="ride" />

      <div className="max-w-3xl mx-auto mt-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Rides</h1>
          <p className="text-sm text-muted-foreground">
            Book a ride, track ongoing trips, or view your ride history.
          </p>
        </div>

        {/* Active Ride */}
        {hasActiveRide && (
          <Card className="border-primary/40 bg-primary/5">
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold">🚕 Active Ride</p>
              <p className="text-sm text-muted-foreground">
                Your driver is on the way.
              </p>

              <Link href="/customer/ride/active">
                <Button size="sm">Track Ride</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Primary Action */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <p className="font-semibold">Book a new ride</p>
            <p className="text-sm text-muted-foreground">
              Choose pickup and drop locations to get started.
            </p>

            <Link href="/customer/ride/book">
              <Button className="w-full">Book a Ride</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold">Ride History</p>
              <p className="text-sm text-muted-foreground">
                View past trips and receipts.
              </p>
              <Link href="/customer/ride/history">
                <Button variant="outline" size="sm">
                  View History
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold">Safety</p>
              <p className="text-sm text-muted-foreground">
                Emergency contacts and support.
              </p>
              <Button variant="outline" size="sm">
                Safety Center
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
