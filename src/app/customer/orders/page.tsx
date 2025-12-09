// app/dashboard/customer/orders/page.tsx
export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProtectedLayout from "@/components/ProtectedLayout";
import DashboardSidebar from "../components/DashboardSidebar";

const mockOrders = [
  {
    id: "ORD12345",
    shop: "FreshMart Store",
    image: "/images/shop-placeholder.jpg",
    status: "Delivered",
    date: "Today • 3:15 PM",
    items: "Milk, Vegetables, Snacks",
    amount: "₹420",
  },
  {
    id: "ORD12346",
    shop: "Tasty Kitchen",
    image: "/images/food-placeholder.jpg",
    status: "On the way",
    date: "Today • 12:50 PM",
    items: "Biryani, Coke",
    amount: "₹299",
  },
  {
    id: "ORD12347",
    shop: "Quick Ride Taxi",
    image: "/images/taxi-banner.jpg",
    status: "Completed",
    date: "Yesterday • 9:10 PM",
    items: "Ride to Main Street",
    amount: "₹180",
  },
];

export default function CustomerOrdersPage() {
  return (
    <ProtectedLayout allowedRoles={["CUSTOMER"]}>
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-col flex-1 max-w-4xl mx-auto p-6 space-y-6">
          <h1 className="text-2xl font-bold">My Orders</h1>
          <p className="text-sm text-muted-foreground">
            Track your food, grocery and ride orders here.
          </p>

          <div className="space-y-4">
            {mockOrders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/customer/orders/${order.id}`}
                className="bg-white border rounded-xl p-4 flex gap-4 hover:shadow-md transition"
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                  <Image
                    src={order.image}
                    alt={order.shop}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Order Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base">{order.shop}</h3>
                    <span className="font-semibold text-sm">
                      {order.amount}
                    </span>
                  </div>

                  <Badge
                    variant={
                      order.status === "Delivered" ? "default" : "secondary"
                    }
                    className="mt-1"
                  >
                    {order.status}
                  </Badge>

                  <p className="text-sm text-muted-foreground mt-2">
                    {order.items}
                  </p>

                  <p className="text-xs text-muted-foreground mt-1">
                    {order.date}
                  </p>
                </div>

                {/* View Button */}
                <div className="flex items-center">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
