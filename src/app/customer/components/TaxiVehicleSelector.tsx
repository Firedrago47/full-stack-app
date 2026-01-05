"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type VehicleType = "BIKE" | "AUTO" | "CAR";

const VEHICLES: {
  type: VehicleType;
  title: string;
  image: string;
}[] = [
  { type: "BIKE", title: "Two-Wheelers | Bike", image: "/images/vehicle-bike.png" },
  { type: "AUTO", title: "Three-Wheelers | Auto", image: "/images/cat-taxi.png" },
  { type: "CAR", title: "Four-Wheelers | Car", image: "/images/vehicle-car.png" },
];

interface Props {
  selected?: VehicleType;
  onSelect: (type: VehicleType) => void;
}

export default function TaxiVehicleSelector({ selected, onSelect }: Props) {
  return (
    <div className="ml-6 flex flex-col gap-4">
      {VEHICLES.map((v) => {
        const active = selected === v.type;

        return (
          <button
            key={v.type}
            onClick={() => onSelect(v.type)}
            className={cn(
              "h-20 rounded-xl bg-white border p-4 flex flex-row items-center gap-4 shadow-sm transition",
              active
                ? "border-primary bg-primary/10 shadow-md"
                : "border-gray-200 hover:shadow-sm"
            )}
          >
            <Image
              src={v.image}
              alt={v.title}
              width={55}
              height={55}
              className="ml-4 object-contain"
            />
            <p className="flex-1 mr-6 text-sm">{v.title}</p>
          </button>
        );
      })}
    </div>
  );
}
