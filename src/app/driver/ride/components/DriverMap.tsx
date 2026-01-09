"use client";

import dynamic from "next/dynamic";

const DriverMapClient = dynamic(
  () => import("./DriverMap.client"),
  { ssr: false }
);

export default function DriverMap() {
  return <DriverMapClient />;
}
