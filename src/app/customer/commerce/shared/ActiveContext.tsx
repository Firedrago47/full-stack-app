export default function ActiveContext() {
  // later fetch active ride/order via API
  const activeRide = false;

  if (!activeRide) return null;

  return (
    <div className="rounded-xl border p-4 bg-blue-50">
      <p className="font-semibold">🚗 You have an active ride</p>
      <p className="text-sm text-muted-foreground">
        Driver is on the way
      </p>
    </div>
  );
}
