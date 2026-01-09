"use client";

import { useRouter } from "next/navigation";
import { RideStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import type { DriverDashboardData } from "../../types";
import { acceptRide, rejectRide } from "../action";

type ActiveRide =
  NonNullable<DriverDashboardData["activeRide"]>;

interface Props {
  ride: ActiveRide;
  driverId: string;
}

export default function ActiveRideCard({ ride, driverId }: Props) {
  const router = useRouter();

  if (ride.status === RideStatus.ASSIGNED) {
    return (
      <div className="bg-white border rounded-xl p-4 space-y-4">
        <h3 className="font-semibold">New Ride Request</h3>

        <p className="text-sm text-muted-foreground">
          Pickup: {ride.pickup.address}
        </p>

        <div className="flex gap-3">
          <Button
            onClick={async () => {
              await acceptRide(ride.id, driverId);
              router.replace(`/driver/ride/${ride.id}`);
            }}
          >
            Accept
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              rejectRide(ride.id, driverId)
            }
          >
            Reject
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
