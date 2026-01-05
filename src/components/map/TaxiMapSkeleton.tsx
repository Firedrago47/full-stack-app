import { Skeleton } from "@/components/ui/skeleton";

export default function TaxiMapSkeleton() {
  return (
    <div className="h-60 w-full rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
}
