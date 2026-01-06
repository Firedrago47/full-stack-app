import StatusToggle from "./status-toggle";

interface StatusBarProps {
  isAvailable: boolean;
  todayEarningsCents: number;
}

export default function StatusBar({
  isAvailable,
  todayEarningsCents,
}: StatusBarProps) {
  return (
    <div className="flex items-center justify-between p-4 mx  -4 rounded-xl border bg-white shadow-sm">
      <div>
        <p className="text-sm text-muted-foreground">Today’s Earnings</p>
        <p className="text-xl font-semibold">
          ₹{(todayEarningsCents / 100).toFixed(2)}
        </p>
      </div>

      <StatusToggle initialAvailable={isAvailable} />
    </div>
  );
}
