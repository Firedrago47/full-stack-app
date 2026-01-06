"use client";

import { cn } from "@/lib/utils";
import type { VehicleType } from "./TaxiSection";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
  booking: boolean;
  onSelect: (v: VehicleType) => void;
  onBook: () => void;
}

export default function VehicleOptions({
  selected,
  disabled,
  booking,
  onSelect,
  onBook,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {VEHICLES.map((v) => {
        const isActive = selected === v.type;

        return (
          <div
            key={v.type}
            className={cn(
              "rounded-xl border p-4 shadow-sm transition space-y-3",
              isActive
                ? "border-primary bg-primary/10 shadow-md"
                : "border-gray-200 hover:shadow-md",
              disabled && "opacity-50"
            )}
          >
            {/* Vehicle selector */}
            <button
              disabled={disabled}
              onClick={() => onSelect(v.type)}
              className="flex flex-row w-full text-left items-center gap-4"
            >
              <Image
                src={v.image}
                alt={v.label}
                width={55}
                height={55}
                className="object-contain"
              />

              <div className="flex flex-col">
                <p className="font-semibold">{v.label}</p>
                <p className="text-sm text-muted-foreground">{v.rate}</p>
              </div>
            </button>

            {/* Book button — ONLY for selected vehicle */}
            {isActive && (
              <Button
                className="w-full"
                disabled={disabled || booking}
                onClick={onBook}
              >
                {booking ? "Booking..." : `Book ${v.label}`}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
