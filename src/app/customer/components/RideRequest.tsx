"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useRideStatus } from "@/hooks/use-ride-status";
import { confirmRide } from "@/app/actions/confirm-ride";
import { RideStatus } from "@prisma/client";

interface Props {
  open: boolean;
  rideId?: string;
  onOpenChange: (open: boolean) => void;
  onConfirmed: () => void;
}

export default function RideRequest({
  open,
  rideId,
  onOpenChange,
  onConfirmed,
}: Props) {
  const { data, isLoading } = useRideStatus(rideId);
  const [pending, startTransition] = useTransition();

  const ride = data?.ride;
  const status = ride?.status;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Booking Ride</DrawerTitle>
        </DrawerHeader>

        {/* LOADING */}
        {isLoading && (
          <Centered>
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm text-muted-foreground">Loading ride…</p>
          </Centered>
        )}

        {/* FINDING DRIVER */}
        {status === RideStatus.REQUESTED && (
          <Centered>
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm text-muted-foreground">
              Finding a nearby driver…
            </p>
            <p className="text-xs text-muted-foreground">
              This may take up to 1 minute
            </p>
          </Centered>
        )}

        {/* DRIVER ACCEPTED */}
        {status === RideStatus.ACCEPTED && ride?.driver && (
          <div className="p-6 space-y-4">
            <div className="border rounded-lg p-4 space-y-1">
              <p className="font-semibold">Driver Assigned</p>
              <p className="text-sm text-muted-foreground">
                Driver ID: {ride.driver.id.slice(0, 6)}
              </p>
              <p className="text-sm">
                Name: {ride.driver.user.name}
              </p>
            </div>

            <Button
              className="w-full"
              disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  await confirmRide(ride.id);
                  onConfirmed(); // parent handles redirect
                })
              }
            >
              {pending ? "Confirming…" : "Confirm Ride"}
            </Button>
          </div>
        )}

        {/* FALLBACK */}
        {!status && !isLoading && (
          <Centered>
            <p className="text-sm text-muted-foreground">
              Waiting for ride status…
            </p>
          </Centered>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 flex flex-col items-center gap-3 text-center">
      {children}
    </div>
  );
}
