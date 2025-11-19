import { getCurrentUser } from "@/lib/auth/current-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CustomerDashboard() {
  const user = await getCurrentUser();
  if (!user) return null; // middleware prevents this anyway

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">Welcome, {user.name}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No orders yet</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Browse Shops</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Shop list coming soon…</p>
        </CardContent>
      </Card>
    </div>
  );
}
