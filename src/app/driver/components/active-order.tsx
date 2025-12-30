"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RideStatus } from "@prisma/client";

interface ActiveRideProps {
  ride: {
    id: string;
    status: RideStatus;
    pickup: {
      address: string;
      lat: number;
      lng: number;
    };
    drop: {
      address: string | null;
      lat: number | null;
      lng: number | null;
    };
  };
  onAccept: () => void;
  onStart: () => void;
  onComplete: () => void;
}

const STATUS_STYLES: Record<RideStatus, string> = {
  REQUESTED: "bg-yellow-100 text-yellow-800",
  ACCEPTED: "bg-blue-100 text-blue-800",
  STARTED: "bg-green-100 text-green-800",
  COMPLETED: "bg-gray-200 text-gray-700",
  CANCELLED: "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<RideStatus, string> = {
  REQUESTED: "New Ride Request",
  ACCEPTED: "Ride Accepted",
  STARTED: "Ride in Progress",
  COMPLETED: "Ride Completed",
  CANCELLED: "Ride Cancelled",
};

export default function ActiveRide({
  ride,
  onAccept,
  onStart,
  onComplete,
}: ActiveRideProps) {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div>
          <p className="text-xs text-muted-foreground">Ride ID</p>
          <p className="font-medium">{ride.id.slice(0, 8)}</p>
        </div>

        <Badge
          className={cn("text-xs font-medium", STATUS_STYLES[ride.status])}
        >
          {STATUS_LABELS[ride.status]}
        </Badge>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Pickup */}
        <div>
          <p className="text-sm font-semibold">Pickup</p>
          <p className="text-sm">{ride.pickup.address}</p>
          <p className="text-xs text-muted-foreground">
            Lat: {ride.pickup.lat}, Lng: {ride.pickup.lng}
          </p>
        </div>

        <div className="h-6 border-l border-dashed ml-1" />

        {/* Drop */}
        <div>
          <p className="text-sm font-semibold">Drop</p>
          <p className="text-sm">
            {ride.drop.address ?? "Drop location not set"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t">
        {ride.status === RideStatus.REQUESTED && (
          <Button className="w-full py-6 text-base" onClick={onAccept}>
            Accept Ride
          </Button>
        )}

        {ride.status === RideStatus.ACCEPTED && (
          <Button className="w-full py-6 text-base" onClick={onStart}>
            Start Ride
          </Button>
        )}

        {ride.status === RideStatus.STARTED && (
          <Button
            className="w-full py-6 text-base bg-green-600 hover:bg-green-700 text-white"
            onClick={onComplete}
          >
            Complete Ride
          </Button>
        )}
      </div>
    </div>
  );
}
