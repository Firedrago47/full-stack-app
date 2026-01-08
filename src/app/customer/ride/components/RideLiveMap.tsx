"use client";

import { LatLng } from "@/types/ride";

interface Props {
  pickup?: LatLng;
  drop?: LatLng;
  driver?: LatLng;
}

export default function RideLiveMap({ pickup, drop, driver }: Props) {
  return (
    <div className="h-64 w-full rounded-xl bg-muted flex items-center justify-center">
      <span className="text-sm text-muted-foreground">
        Live map loading…
      </span>
    </div>
  );
}
