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
  rideId: string | null;
  onOpenChange: (open: boolean) => void;
  onConfirmed: () => void;
}

const STATUS_UI: Record<
  RideStatus,
  {
    title: string;
    description?: string;
    showSpinner: boolean;
    showConfirm?: boolean;
  }
> = {
  REQUESTED: {
    title: "Finding a nearby driver…",
    description: "This may take up to 1 minute",
    showSpinner: true,
  },
  ASSIGNED: {
    title: "Driver Assigned",
    showSpinner: false,
    showConfirm: true,
  },
  ACCEPTED: {
    title: "Ride Accepted",
    showSpinner: false,
    showConfirm: true,
  },
  CONFIRMED: {
    title: "Ride confirmed",
    showSpinner: true,
  },
  STARTED: {
    title: "Ride started",
    showSpinner: true,
  },
  COMPLETED: {
    title: "Ride completed",
    showSpinner: false,
  },
  CANCELLED: {
    title: "Ride cancelled",
    showSpinner: false,
  },
};

export default function RideRequest({
  open,
  rideId,
  onOpenChange,
  onConfirmed,
}: Props) {
  const { data, isLoading } = useRideStatus(rideId ?? undefined);
  const [pending, startTransition] = useTransition();

  const ride = data?.ride;
  const status = ride?.status;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Booking Ride</DrawerTitle>
        </DrawerHeader>

        {/* Loading */}
        {isLoading && <Loading />}

        {/* Status-driven UI */}
        {status && ride && (
          <div className="p-6 space-y-4 text-center">
            {STATUS_UI[status].showSpinner && (
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            )}

            <p className="font-medium">
              {STATUS_UI[status].title}
            </p>

            {STATUS_UI[status].description && (
              <p className="text-xs text-muted-foreground">
                {STATUS_UI[status].description}
              </p>
            )}

            {/* Driver details */}
            {status === RideStatus.ACCEPTED && ride.driver && (
              <div className="border rounded-lg p-4 space-y-1 text-left">
                <p className="font-semibold">Driver Assigned</p>
                <p className="text-sm text-muted-foreground">
                  Driver ID: {ride.driver.id.slice(0, 6)}
                </p>
                <p className="text-sm">
                  Name: {ride.driver.name}
                </p>
              </div>
            )}

            {/* Confirm button */}
            {STATUS_UI[status].showConfirm && (
              <Button
                className="w-full"
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    if (!rideId) return;
                    await confirmRide(rideId);
                    onConfirmed();
                  })
                }
              >
                {pending ? "Confirming…" : "Confirm Ride"}
              </Button>
            )}
          </div>
        )}

        {/* Fallback */}
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

function Loading() {
  return (
    <Centered>
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="text-sm text-muted-foreground">Loading ride…</p>
    </Centered>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 flex flex-col items-center gap-3 text-center">
      {children}
    </div>
  );
}
