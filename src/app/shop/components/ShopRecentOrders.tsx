import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sampleOrders = [
  {
    id: "ORD501",
    customer: "Rahul",
    item: "Chicken Biryani",
    amount: "₹250",
    status: "Preparing",
    img: "/images/food-placeholder.jpg",
  },
  {
    id: "ORD502",
    customer: "Pooja",
    item: "Paneer Tikka",
    amount: "₹180",
    status: "Delivered",
    img: "/images/food-placeholder.jpg",
  },
];

export default function ShopRecentOrders() {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h3 className="text-lg font-semibold">Recent Orders</h3>

        {sampleOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center gap-4 border rounded-lg p-3 hover:shadow-sm transition"
          >
            <Image
              src={order.img}
              alt={order.item}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="font-medium">{order.item}</p>
              <p className="text-sm text-muted-foreground">
                Ordered by {order.customer}
              </p>
            </div>

            <div className="text-right">
              <Badge>{order.status}</Badge>
              <p className="text-sm font-semibold mt-2 mr-4">{order.amount}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
