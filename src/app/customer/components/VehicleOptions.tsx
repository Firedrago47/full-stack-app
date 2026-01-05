"use client";

import { cn } from "@/lib/utils";
import type { VehicleType } from "./TaxiSection";
import Image from "next/image";

const VEHICLES: {
  type: VehicleType;
  label: string;
  rate: string;
  image: string;
}[] = [
  {
    type: "BIKE",
    label: "Bike",
    rate: "₹8 / km",
    image: "/images/vehicle-bike.png",
  },
  {
    type: "AUTO",
    label: "Auto",
    rate: "₹12 / km",
    image: "/images/cat-taxi.png",
  },
  {
    type: "CAR",
    label: "Car",
    rate: "₹18 / km",
    image: "/images/vehicle-car.png",
  },
];

interface Props {
  selected: VehicleType | null;
  disabled: boolean;
  onSelect: (v: VehicleType) => void;
}

export default function VehicleOptions({
  selected,
  disabled,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {VEHICLES.map((v) => (
        <button
          key={v.type}
          disabled={disabled}
          onClick={() => onSelect(v.type)}
          className={cn(
            "flex flex-row rounded-xl border p-4 text-left shadow-sm transition",
            selected === v.type
              ? "border-primary bg-primary/10 shadow-md"
              : "border-gray-200 hover:shadow-md",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <Image
            src={v.image}
            alt={v.label}
            width={55}
            height={55}
            className="ml-4 object-contain"
          />
          <div className="p-2 flex flex-col">
            <p className="font-semibold">{v.label}</p>
            <p className="text-sm text-muted-foreground">{v.rate}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
