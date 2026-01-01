"use client";

import { useSearchParams } from "next/navigation";
import Filter from "./Filter";
import TaxiRidePanel from "./TaxiRidePanel";
import TaxiVehicleSelector from "./TaxiVehicleSelector";
import { useState } from "react";

type Category = "food" | "groceries" | "taxi";
type VehicleType = "BIKE" | "AUTO" | "CAR";


function resolveCategory(value: string | null): Category {
    if (value === "groceries") return "groceries";
    if (value === "taxi") return "taxi";
    return "food";
}

export default function LeftPanel() {
const [vehicle, setVehicle] = useState<VehicleType | undefined>(undefined);
  const params = useSearchParams();
  const category = resolveCategory(params.get("category"));

  if (category === "taxi") {
    return <TaxiVehicleSelector selected={vehicle}
          onSelect={setVehicle} />;
  }

  return <Filter />;
}
