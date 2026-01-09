"use client";

import { useRideStatus } from "@/hooks/use-ride-status";
import { RideStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

import RideLiveMap from "./RideLiveMap";
import { RideTimeline } from "./RideTimeline";
import { CancelRideButton } from "./CancelRide";
import { SafetyPanel } from "./SafetyPanel";
import { DriverProfile } from "./DriverProfile";
import { FareDetails } from "./FareDetails";

type RideView = {
  id: string;
  status: RideStatus;
  pickupAddress: string;
  dropAddress: string | null;
  driver: {
    id: string;
    name: string;
  } | null;
};

interface Props {
  rideId: string;
  initialRide: RideView;
}

const STATUS_CONFIG: Record<
  RideStatus,
  {
    label: string;
    showSpinner: boolean;
  }
> = {
  REQUESTED: { label: "Looking for a driver…", showSpinner: true },
  ASSIGNED: { label: "Driver Assigned for ride", showSpinner: true },
  ACCEPTED: { label: "Driver accepted your ride", showSpinner: true },
  CONFIRMED: { label: "Driver is on the way", showSpinner: true },
  STARTED: { label: "Ride in progress", showSpinner: true },
  COMPLETED: { label: "Ride completed", showSpinner: false },
  CANCELLED: { label: "Ride cancelled", showSpinner: false },
};


export default function RideStatusView({ rideId, initialRide }: Props) {
  const { data } = useRideStatus(rideId);

  const ride: RideView = data?.ride ?? initialRide;

  const config = STATUS_CONFIG[ride.status];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your Ride</h1>
        <Badge>{ride.status}</Badge>
      </header>

      {/* Status line */}
      <StatusLine
        text={
          ride.status === RideStatus.ACCEPTED && ride.driver
            ? `Driver ${ride.driver.name} accepted your ride`
            : config.label
        }
        spinning={config.showSpinner}
      />

      {/* Map */}
      <RideLiveMap />

      {/* Timeline */}
      <RideTimeline status={ride.status} />

      {/* Driver */}
      {ride.driver && <DriverProfile driver={ride.driver} />}

      {/* Fare */}
      <FareDetails base={80} distance={120} tax={18} />

      {/* Safety */}
      <SafetyPanel />

      {/* Cancel */}
      <CancelRideButton rideId={rideId} status={ride.status} />

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
    </div>
  );
}

function StatusLine({
  text,
  spinning,
}: {
  text: string;
  spinning: boolean;
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      {spinning && <Loader2 className="h-4 w-4 animate-spin" />}
      <span>{text}</span>
    </div>
  );
}
