"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TaxiRidePanel() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  return (
    <aside className="lg:col-span-1 mx-6 space-y-4">
      <div className="p-4 bg-white border rounded-xl shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Book a Ride</h3>

        {/* Map Placeholder */}
        <div className="h-40 w-full rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
          Map will appear here
        </div>

        {/* Pickup */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Pickup location</label>
          <Input
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </div>

        {/* Drop */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Drop location</label>
          <Input
            placeholder="Enter drop location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
          />
        </div>

        <Button
          className="w-full"
          disabled={!pickup || !drop}
        >
          Find Rides
        </Button>
      </div>
    </aside>
  );
}
