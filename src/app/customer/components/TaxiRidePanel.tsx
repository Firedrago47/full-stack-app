"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaxiMap from "./TaxiMap";

export default function TaxiRidePanel() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  // TEMP: static coordinates (replace with geocoding later)
  const pickupCoords = pickup
    ? { lat: 12.9716, lng: 77.5946 }
    : undefined;

  const dropCoords = drop
    ? { lat: 12.9352, lng: 77.6245 }
    : undefined;

  return (
    <aside className="lg:col-span-1 mx-6 space-y-4">

      <div className="flex flex-row p-4 bg-white border rounded-xl shadow-sm space-y-4">
      <div className="flex flex-col w-full">
        <h3 className="mb-2 text-lg font-semibold">Book a Ride</h3>

        {/* REAL MAP */}
        <TaxiMap pickup={pickupCoords} drop={dropCoords} />
        </div>

      <div className="flex flex-col p-4">

        {/* Pickup */}
        <div className="mt-2 space-y-2">
          <label className="text-sm font-medium">Pickup location</label>
          <Input
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </div>

        {/* Drop */}
        <div className="mt-2 space-y-2">
          <label className="text-sm font-medium">Drop location</label>
          <Input
            placeholder="Enter drop location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
          />
        </div>

        <Button
          className="mt-4"
          disabled={!pickup || !drop}
        >
          Find Rides
        </Button>
      </div>
      </div>
    </aside>
  );
}
