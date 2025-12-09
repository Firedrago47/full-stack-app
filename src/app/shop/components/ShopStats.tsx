import { Card, CardContent } from "@/components/ui/card";

export default function ShopStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm text-muted-foreground">Today's Orders</h3>
          <p className="text-2xl font-bold mt-1">12</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm text-muted-foreground">Revenue Today</h3>
          <p className="text-2xl font-bold mt-1">₹2,850</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm text-muted-foreground">Pending Orders</h3>
          <p className="text-2xl font-bold mt-1">4</p>
        </CardContent>
      </Card>
    </div>
  );
}
