"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRideStatus } from "@/hooks/use-ride-status";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  rideId?: string;
}

export default function RideRequest({ open, onOpenChange, rideId }: Props) {
  const { data } = useRideStatus(rideId);

  const status = data?.ride?.status;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Booking Ride</DrawerTitle>
        </DrawerHeader>

        {/* FINDING DRIVER */}
        {status === "REQUESTED" && (
          <div className="p-6 flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm text-muted-foreground">
              Finding a nearby driver…
            </p>
            <p className="text-xs text-muted-foreground">
              This may take up to 1 minute
            </p>
          </div>
        )}

        {/* DRIVER ACCEPTED */}
        {status === "ACCEPTED" && (
          <div className="p-6 space-y-4">
            <div className="border rounded-lg p-4">
              <p className="font-semibold">Driver Assigned</p>
              <p className="text-sm text-muted-foreground">
                Driver ID: {data.ride.driver.id.slice(0, 6)}
              </p>
              <p className="text-sm">Name: {data.ride.driver.user.name}</p>
            </div>

            <Button className="w-full">Confirm Ride</Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
