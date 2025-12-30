import { Package } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-3">
      <Package className="h-10 w-10 text-muted-foreground" />
      <p className="text-lg font-medium">No active orders</p>
      <p className="text-sm text-muted-foreground max-w-xs">
        Stay online to start receiving delivery requests.
      </p>
    </div>
  );
}
