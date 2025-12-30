"use client";

import { useState, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { toggleDriverAvailability } from "../dashboard/action";
import { cn } from "@/lib/utils";

interface StatusToggleProps {
  initialAvailable: boolean;
}

export default function StatusToggle({
  initialAvailable,
}: StatusToggleProps) {
  const [isAvailable, setIsAvailable] = useState(initialAvailable);
  const [isPending, startTransition] = useTransition();

  function onToggle(value: boolean) {
    setIsAvailable(value); // optimistic

    startTransition(async () => {
      try {
        await toggleDriverAvailability(value);
      } catch {
        setIsAvailable(!value); // rollback
      }
    });
  }

  return (
    <div className="flex items-center gap-3">
      <p
        className={cn(
          "text-sm font-medium",
          isAvailable ? "text-green-600" : "text-muted-foreground"
        )}
      >
        {isAvailable ? "Online" : "Offline"}
      </p>

      <Switch
        checked={isAvailable}
        onCheckedChange={onToggle}
        disabled={isPending}
      />
    </div>
  );
}
