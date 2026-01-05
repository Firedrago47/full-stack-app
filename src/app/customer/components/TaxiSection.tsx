"use client";

import { useState } from "react";
import TaxiMap from "./TaxiMap";
import LocationAutocomplete from "./LocationAutocomplete";
import VehicleOptions from "./VehicleOptions";
import AvailableDrivers from "./AvailableDrivers";

export type VehicleType = "BIKE" | "AUTO" | "CAR";

type Location = {
  address: string;
  lat: number;
  lng: number;
};

export default function TaxiSection() {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [drop, setDrop] = useState<Location | null>(null);
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT: Location inputs */}
      <div className="bg-white border rounded-xl p-4 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Trip Details</h3>

        <LocationAutocomplete
          label="Pickup location"
          value={pickup?.address ?? ""}
          onSelect={setPickup}
        />

        <LocationAutocomplete
          label="Drop location"
          value={drop?.address ?? ""}
          onSelect={setDrop}
        />
      </div>

      {/* RIGHT: Map */}
      <div className="bg-white shadow-sm border rounded-xl p-4">
        <TaxiMap pickup={pickup ?? undefined} drop={drop ?? undefined} />
      </div>

      {/* VEHICLES */}
      <div className="lg:col-span-2">
        <VehicleOptions
          disabled={!pickup || !drop}
          selected={vehicle}
          onSelect={setVehicle}
        />
      </div>

      {/* AVAILABLE DRIVERS */}
      {vehicle && (
        <div className="lg:col-span-2">
          <AvailableDrivers vehicle={vehicle} />
        </div>
      )}
    </div>
  );
}
