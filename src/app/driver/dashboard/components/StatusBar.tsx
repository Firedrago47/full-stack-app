interface Props {
  todayEarningsCents: number;
}

export default function StatusBar({
  todayEarningsCents,
}: Props) {
  return (
    <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-muted-foreground">
          Today’s Earnings
        </p>
        <p className="text-xl font-semibold">
          ₹{(todayEarningsCents / 100).toFixed(2)}
        </p>
      </div>

      <span className="text-sm text-green-600 font-medium">
        Online
      </span>
    </div>
  );
}
