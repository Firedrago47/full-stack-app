"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import TaxiMap from "@/app/customer/components/TaxiMap";
import LocationAutocomplete from "@/app/customer/shared/location/LocationAutocomplete";
import VehicleOptions from "@/app/customer/ride/components/VehicleOptions";
import RideRequest from "@/app/customer/ride/components/RideRequest";

import { createRide } from "@/app/actions/create-ride";
import { cancelRide } from "@/app/actions/cancel-ride";
import type { VehicleType } from "@/types/ride";
import DashboardShell from "../../shared/layout/DashboardShell";

type Location = {
  address: string;
  lat: number;
  lng: number;
};

export default function RideBookingPage() {
  const router = useRouter();

  const [pickup, setPickup] = useState<Location | null>(null);
  const [drop, setDrop] = useState<Location | null>(null);
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [booking, setBooking] = useState(false);
  const [rideId, setRideId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function handleBookRide() {
    if (!pickup || !drop || !vehicle || booking) return;

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
      setVehicle(null);
    }
  }

  function handleConfirmed() {
    if (!rideId) return;
    const id = rideId;

    setRideId(null);
    setDrawerOpen(false);
    router.replace(`/customer/ride/${id}`);
  }

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trip details */}
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Trip Details</h3>

          <div className="flex ml-2 gap-4">
            <div className="flex flex-col items-center pt-4 pb-6">
              <div className="h-3 w-3 rounded-full bg-green-600" />
              <div className="flex-1 w-px border-l-2 border-dashed border-gray-400 my-2" />
              <div className="h-3 w-3 rounded-full bg-red-600" />
            </div>

            <div className="flex flex-col gap-4 mr-4 flex-1">
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
          </div>
        </div>

        {/* Map */}
        <div className="bg-white shadow-sm border rounded-xl p-4">
          <TaxiMap pickup={pickup ?? undefined} drop={drop ?? undefined} />
        </div>

        {/* Vehicles */}
        <div className="lg:col-span-2">
          <VehicleOptions
            disabled={!pickup || !drop}
            selected={vehicle}
            booking={booking}
            onSelect={setVehicle}
            onBook={handleBookRide}
          />
        </div>
      </div>

      {/* Booking drawer */}
      <RideRequest
        open={drawerOpen}
        rideId={rideId ?? null}
        onConfirmed={handleConfirmed}
        onOpenChange={(open) => {
          if (!open && rideId) {
            cancelRide(rideId);
            setRideId(null);
          }
          setDrawerOpen(open);
        }}
      />
    </DashboardShell>
  );
}
