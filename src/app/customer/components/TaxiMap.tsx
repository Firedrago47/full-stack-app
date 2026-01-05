import TaxiMapSkeleton from "@/components/map/TaxiMapSkeleton";
import dynamic from "next/dynamic";

const TaxiMap = dynamic(() => import("@/components/map/TaxiMap.client"), {
  ssr: false,
  loading: () => <TaxiMapSkeleton />,
});

export default TaxiMap;
