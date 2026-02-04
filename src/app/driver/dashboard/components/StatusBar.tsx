import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";

interface Props {
  todayEarningsCents: number;
}

export default function StatusBar({
  todayEarningsCents,
}: Props) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
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
    <div className=" bg-white border rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-muted-foreground">
          Total Rides Today
        </p>
        <p className="text-xl font-semibold">
          7
        </p>
      </div>

      <span className="text-sm text-red-600 font-medium">
          <ArrowDownNarrowWide size={16} className="inline" /> 0.1%
      </span>
      </div>
      <div className=" bg-white border rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-muted-foreground">
          Rating
        </p>
        <p className="text-xl font-semibold">
          4.9
        </p>
      </div>

      <span className="text-sm text-green-600 font-medium">
        <ArrowUpNarrowWide size={16} className="inline" /> 0.1%
      </span>
      </div>
    </div>
  );
}
