import { Card, CardContent } from "@/components/ui/card";

type FareProps = {
  base: number;
  distance: number;
  tax: number;
};

export function FareDetails({ base, distance, tax }: FareProps) {
  const total = base + distance + tax;

  return (
    <Card>
      <CardContent className="p-4 space-y-2 text-sm">
        <Row label="Base Fare" value={base} />
        <Row label="Distance Fare" value={distance} />
        <Row label="Tax" value={tax} />
        <hr />
        <Row label="Total" value={total} bold />
      </CardContent>
    </Card>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: number;
  bold?: boolean;
}) {
  return (
    <div className={`flex justify-between ${bold && "font-semibold"}`}>
      <span>{label}</span>
      <span>₹{value.toFixed(2)}</span>
    </div>
  );
}
