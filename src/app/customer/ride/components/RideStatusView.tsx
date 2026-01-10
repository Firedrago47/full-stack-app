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
    <div className="">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your Ride</h1>
        <Badge>{ride.status}</Badge>
      </header>


      <div className="grid grid-cols-3 gap-10 mx-auto mt-6 ">
        <div className="flex flex-col gap-6">
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

          <div className="bg-white border rounded-xl p-4 space-y-2">

          <RideTimeline status={ride.status} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
      <StatusLine
        text={
          ride.status === RideStatus.ACCEPTED && ride.driver
            ? `Driver ${ride.driver.name} accepted your ride`
            : config.label
        }
        spinning={config.showSpinner}
      />
          <RideLiveMap />
        </div>

        <div className="flex flex-col gap-6">
          {ride.driver && <DriverProfile driver={ride.driver} />}

          <FareDetails base={80} distance={120} tax={18} />

          <SafetyPanel />

          <CancelRideButton rideId={rideId} status={ride.status} />
        </div>
      </div>
    </div>
  );
}

function StatusLine({ text, spinning }: { text: string; spinning: boolean }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      {spinning && <Loader2 className="h-4 w-4 animate-spin" />}
      <span>{text}</span>
    </div>
  );
}
