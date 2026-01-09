import { Ride } from "@prisma/client";

interface Props {
  ride: Ride;
}

export default function RideInfoPanel({ ride }: Props) {
  return (
    <div className="bg-white border rounded-xl p-4 space-y-4">
      <h2 className="text-lg font-semibold">Ride Details</h2>

      <div>
        <p className="text-sm text-muted-foreground">Pickup</p>
        <p className="font-medium">{ride.pickupAddress}</p>
      </div>

      {ride.dropAddress && (
        <div>
          <p className="text-sm text-muted-foreground">Drop</p>
          <p className="font-medium">{ride.dropAddress}</p>
        </div>
      )}

      <div>
        <p className="text-sm text-muted-foreground">Status</p>
        <p className="font-medium">{ride.status}</p>
      </div>
    </div>
  );
}
