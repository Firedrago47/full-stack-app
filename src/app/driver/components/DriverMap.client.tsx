"use client";

import dynamic from "next/dynamic";
import TaxiMapSkeleton from "@/components/map/TaxiMapSkeleton";

const Map = dynamic(() => import("@/components/map/TaxiMap.client"), {
  ssr: false,
  loading: () => <TaxiMapSkeleton />,
});

export default function DriverMapClient() {
  return <Map />;
}
