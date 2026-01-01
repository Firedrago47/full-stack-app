"use client";

import { useSearchParams } from "next/navigation";
import { useItems } from "@/hooks/use-items";
import ItemList from "./ItemList";
import TaxiVehicleSelector from "./TaxiVehicleSelector";
import { useState } from "react";
import Filter from "./Filter";

type Category = "food" | "groceries" | "taxi";
type VehicleType = "BIKE" | "AUTO" | "CAR";

function resolveCategory(value: string | null): Category {
  if (value === "groceries") return "groceries";
  if (value === "taxi") return "taxi";
  return "food";
}

export default function ItemsSection() {
  const params = useSearchParams();
  const category = resolveCategory(params.get("category"));

  const [vehicle, setVehicle] = useState<VehicleType | undefined>(undefined);

  const { items, isLoading } = useItems(
    category === "taxi" ? null : category
  );

  /* ---------------- TAXI UI ---------------- */
  if (category === "taxi") {
    return (
      <div className="space-y-6">
        <TaxiVehicleSelector
          selected={vehicle}
          onSelect={setVehicle}
        />

        {vehicle && (
          <p className="text-sm text-muted-foreground">
            Showing available {vehicle.toLowerCase()} rides near you
          </p>
        )}
      </div>
    );
  }

  /* ---------------- FOOD / GROCERY UI ---------------- */
  return (
      <ItemList items={items} isLoading={isLoading} />
);
}
