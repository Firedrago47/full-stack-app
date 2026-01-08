"use client";

import { Button } from "@/components/ui/button";
import { RideStatus } from "@prisma/client";
import { toast } from "sonner";

type Props = {
  rideId: string;
  status: RideStatus;
};

export function CancelRideButton({ rideId, status }: Props) {
  const disabled = status === "STARTED" || status === "COMPLETED";

  async function cancelRide() {
    const res = await fetch(`/api/rides/${rideId}/cancel`, {
      method: "POST",
    });

    if (!res.ok) {
      toast.error("Unable to cancel ride");
      return;
    }

    toast.success("Ride cancelled");
  }

  return (
    <Button
      variant="destructive"
      disabled={disabled}
      onClick={cancelRide}
      className="w-full"
    >
      Cancel Ride
    </Button>
  );
}
