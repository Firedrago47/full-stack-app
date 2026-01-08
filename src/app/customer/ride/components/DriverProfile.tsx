import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { DriverSummary } from "@/types/ride";

export function DriverProfile({ driver }: { driver: DriverSummary }) {
  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold">{driver.name}</h3>

        {driver.rating && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400" />
            {driver.rating}
          </div>
        )}

        {driver.vehicle && (
          <p className="text-sm text-muted-foreground">
            {driver.vehicle.model} · {driver.vehicle.plate}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
