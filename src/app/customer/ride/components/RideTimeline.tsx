"use client";

import { RideStatus } from "@prisma/client";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS: RideStatus[] = [
  "REQUESTED",
  "ACCEPTED",
  "CONFIRMED",
  "STARTED",
  "COMPLETED",
  "CANCELLED",
];

export function RideTimeline({ status }: { status: RideStatus }) {
  const currentIndex = STEPS.indexOf(status);

  return (
    <div className="space-y-4">
      {STEPS.map((step, idx) => {
        const active = idx <= currentIndex;

        return (
          <div key={step} className="flex items-center gap-3">
            {active ? (
              <CheckCircle className="text-primary" />
            ) : (
              <Circle className="text-muted-foreground" />
            )}
            <span
              className={cn(
                "text-sm",
                active ? "font-medium" : "text-muted-foreground"
              )}
            >
              {step.replace("_", " ")}
            </span>
          </div>
        );
      })}
    </div>
  );
}
