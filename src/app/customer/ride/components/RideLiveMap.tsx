"use client";

import { useEffect, useRef } from "react";
import { Map, MapControls } from "@/components/ui/map";
import maplibregl, { Marker } from "maplibre-gl";

interface LatLng {
  lat: number;
  lng: number;
}

interface Props {
  pickup?: LatLng;
  drop?: LatLng;
  driver?: LatLng;
}

export default function RideLiveMap({ pickup, drop, driver }: Props) {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Marker[]>([]);

  // Clear markers helper
  function clearMarkers() {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
  }

  useEffect(() => {
    if (!mapRef.current) return;

    clearMarkers();

    if (pickup) {
      markersRef.current.push(
        new maplibregl.Marker({ color: "green" })
          .setLngLat([pickup.lng, pickup.lat])
          .addTo(mapRef.current)
      );
    }

    if (drop) {
      markersRef.current.push(
        new maplibregl.Marker({ color: "red" })
          .setLngLat([drop.lng, drop.lat])
          .addTo(mapRef.current)
      );
    }

    if (driver) {
      markersRef.current.push(
        new maplibregl.Marker({ color: "blue" })
          .setLngLat([driver.lng, driver.lat])
          .addTo(mapRef.current)
      );
    }
  }, [pickup, drop, driver]);

  return (
    <div className="h-60 w-full rounded-xl overflow-hidden">
      <Map
        ref={mapRef}
        center={
          pickup
            ? [pickup.lng, pickup.lat]
            : [77.5946, 12.9716]
        }
        zoom={13}
      >
        <MapControls />
      </Map>
    </div>
  );
}
