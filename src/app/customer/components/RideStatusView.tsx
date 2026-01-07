"use client";

import { useRideStatus } from "@/hooks/use-ride-status";
import { RideStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface Props {
  rideId: string;
  initialRide: {
    id: string;
    status: RideStatus;
    pickupAddress: string;
    dropAddress: string | null;
    driver: {
      id: string;
      name: string;
    } | null;
  };
}

export default function RideStatusView({ rideId, initialRide }: Props) {
  const { data } = useRideStatus(rideId);

  const ride = data?.ride ?? initialRide;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your Ride</h1>
        <Badge>{ride.status}</Badge>
      </header>

      {/* Addresses */}
      <div className="bg-white border rounded-xl p-4 space-y-2">
        <div>
          <p className="text-sm font-semibold">Pickup</p>
          <p className="text-sm text-muted-foreground">
            {ride.pickupAddress}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Drop</p>
          <p className="text-sm text-muted-foreground">
            {ride.dropAddress ?? "Not set"}
          </p>
        </div>
      </div>

      {/* Status specific UI */}
      {ride.status === RideStatus.REQUESTED && (
        <StatusLine text="Looking for a driver…" />
      )}

      {ride.status === RideStatus.ACCEPTED && ride.driver && (
        <StatusLine
          text={`Driver ${ride.driver.name} accepted your ride`}
        />
      )}

      {ride.status === RideStatus.CONFIRMED && (
        <StatusLine text="Ride confirmed. Waiting for driver to start." />
      )}

      {ride.status === RideStatus.STARTED && (
        <StatusLine text="Ride in progress 🚗" />
      )}

      {ride.status === RideStatus.COMPLETED && (
        <StatusLine text="Ride completed " />
      )}
    </div>
  );
}

function StatusLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{text}</span>
    </div>
  );
}
