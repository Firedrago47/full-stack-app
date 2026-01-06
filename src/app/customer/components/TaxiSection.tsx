"use client";

import { useState } from "react";
import TaxiMap from "./TaxiMap";
import LocationAutocomplete from "./LocationAutocomplete";
import VehicleOptions from "./VehicleOptions";
import RideRequest from "./RideRequest";
import { createRide } from "@/app/actions/create-ride";

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
  const [booking, setBooking] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rideId, setRideId] = useState<string | null>(null);

  async function handleBookRide() {
    if (!pickup || !drop || !vehicle) return;

    try {
      setBooking(true);

      const ride = await createRide({
        pickupLat: pickup.lat,
        pickupLng: pickup.lng,
        pickupAddress: pickup.address,
        dropLat: drop.lat,
        dropLng: drop.lng,
        dropAddress: drop.address,
      });

      setRideId(ride.id);
      setDrawerOpen(true);
    } finally {
      setBooking(false);
    }
  }

  return (
    <>
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

        {/* VEHICLE OPTIONS */}
        <div className="lg:col-span-2">
          <VehicleOptions
            disabled={!pickup || !drop}
            selected={vehicle}
            booking={booking}
            onSelect={setVehicle}
            onBook={handleBookRide}
          />
        </div>

        {/* BOOK BUTTON */}
      </div>

      {/* RIDE REQUEST DRAWER */}
      <RideRequest
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        rideId={rideId ?? undefined}
      />
    </>
  );
}
