"use client";

import { useSearchParams } from "next/navigation";
import Filter from "./Filter";
import { useState } from "react";

type Category = "food" | "groceries" | "taxi";
type VehicleType = "BIKES" | "AUTOS" | "CARS";


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
    return null;
  }

  return <Filter />;
}