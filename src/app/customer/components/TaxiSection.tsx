"use client";

import { useState } from "react";
import TaxiVehicleSelector from "./TaxiVehicleSelector";
import TaxiRidePanel from "./TaxiRidePanel";

export type VehicleType = "BIKES" | "AUTOS" | "CARS";

export default function TaxiSection() {
  const [vehicle, setVehicle] = useState<VehicleType | undefined>();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* LEFT */}
      <TaxiVehicleSelector
        selected={vehicle}
        onSelect={setVehicle}
      />

      {/* RIGHT */}
      <section className="lg:col-span-3">
        <TaxiRidePanel vehicle={vehicle} />
      </section>
    </div>
  );
}
