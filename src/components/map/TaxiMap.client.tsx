"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "/images/marker.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
});

interface TaxiMapProps {
  pickup?: { lat: number; lng: number };
  drop?: { lat: number; lng: number };
}

export default function TaxiMapClient({ pickup, drop }: TaxiMapProps) {
  const center = pickup ?? { lat: 12.9716, lng: 77.5946 };

  return (
    <div className="relative z-0 overflow-hidden rounded-lg">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        className="h-60 w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pickup && (
          <Marker position={[pickup.lat, pickup.lng]} icon={markerIcon} />
        )}

        {drop && (
          <Marker position={[drop.lat, drop.lng]} icon={markerIcon} />
        )}
      </MapContainer>

      {/* Local z-index override */}
      <style jsx global>{`
        .leaflet-pane,
        .leaflet-top,
        .leaflet-bottom {
          z-index: 0 !important;
        }
      `}</style>
    </div>
  );
}
