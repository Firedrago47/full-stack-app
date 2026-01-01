"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type VehicleType = "BIKE" | "AUTO" | "CAR";

const VEHICLES: {
  type: VehicleType;
  title: string;
  image: string;
}[] = [
  { type: "BIKE", title: "Bike", image: "/images/vehicle-bike.png" },
  { type: "AUTO", title: "Auto", image: "/images/cat-taxi.png" },
  { type: "CAR", title: "Car", image: "/images/vehicle-car.png" },
];

interface Props {
  selected?: VehicleType;
  onSelect: (type: VehicleType) => void;
}

export default function TaxiVehicleSelector({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-rows-5 gap-4">
      {VEHICLES.map((v) => {
        const active = selected === v.type;

        return (
          <button
            key={v.type}
            onClick={() => onSelect(v.type)}
            className={cn(
              "h-20 rounded-xl border p-4 flex flex-row items-center gap-4 transition",
              active
                ? "border-primary bg-primary/10 shadow-md"
                : "border-gray-200 hover:shadow-sm"
            )}
          >
            <Image
              src={v.image}
              alt={v.title}
              width={50}
              height={50}
              className="object-contain"
            />
            <p className="font-semibold">{v.title}</p>
          </button>
        );
      })}
    </div>
  );
}
