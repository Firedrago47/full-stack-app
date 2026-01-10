"use client";

import { Ride, RideStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { startRide, completeRide } from "../actions";

interface Props {
  ride: Ride;
}

export default function RideActions({ ride }: Props) {
  if (ride.status === RideStatus.CONFIRMED) {
    return (
      <Button
        className="w-full"
        onClick={() => startRide(ride.id)}
      >
        Start Ride
      </Button>
    );
  }

  if (ride.status === RideStatus.STARTED) {
    return (
      <Button
        className="w-full"
        onClick={() => completeRide(ride.id)}
      >
        Complete Ride
      </Button>
    );
  }
  if (ride.status === RideStatus.COMPLETED) {
    return (
      <Button
        className="w-full bg-green"
      >
        Ride Completed
      </Button>
    );
  }

  return null;
}
