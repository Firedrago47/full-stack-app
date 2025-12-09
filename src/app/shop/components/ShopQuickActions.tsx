import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ShopQuickActions() {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h3 className="text-lg font-semibold">Quick Actions</h3>

        <Button className="w-full" asChild>
          <Link href="/shop/items/add">Add New Item</Link>
        </Button>

        <Button variant="outline" className="w-full" asChild>
          <Link href="/shop/items">Manage Items</Link>
        </Button>

        <Button variant="secondary" className="w-full" asChild>
          <Link href="/shop/settings">Shop Settings</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
