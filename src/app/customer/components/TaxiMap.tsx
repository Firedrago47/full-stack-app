"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "/images/marker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface TaxiMapProps {
  pickup?: { lat: number; lng: number };
  drop?: { lat: number; lng: number };
}

export default function TaxiMap({ pickup, drop }: TaxiMapProps) {
  const center = pickup ?? { lat: 12.9716, lng: 77.5946 }; // Bangalore

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      className="h-80 w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {pickup && (
        <Marker position={[pickup.lat, pickup.lng]} icon={markerIcon} />
      )}

      {drop && (
        <Marker position={[drop.lat, drop.lng]} icon={markerIcon} />
      )}
    </MapContainer>
  );
}
