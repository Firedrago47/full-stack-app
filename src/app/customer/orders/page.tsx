"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardTopbar from "../components/DashboardTopbar";
import { useOrders, cancelOrder } from "@/hooks/use-orders";
import { OrderStatus } from "@prisma/client";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerOrdersPage() {
  const { orders, isLoading, refresh } = useOrders();
  const [canceling, setCanceling] = useState<string | null>(null);

  const handleCancel = async (orderId: string) => {
    setCanceling(orderId);
    await cancelOrder(orderId);
    await refresh(); // reload orders
    setCanceling(null);
  };

  return (
      <div>
        <DashboardTopbar />

        <div className="flex-col flex-1 max-w-4xl mx-auto p-6 space-y-6">
          <h1 className="text-2xl font-bold">My Orders</h1>
          <p className="text-sm text-muted-foreground">
            Track your food, grocery and ride orders here.
          </p>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border rounded-xl p-4 flex gap-4">
                  <Skeleton className="h-24 w-24 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && orders.length === 0 && (
            <p className="text-center text-muted-foreground">No orders yet.</p>
          )}

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border rounded-xl p-4 flex gap-4 hover:shadow-md transition"
              >

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base">
                      {order.shop?.name ?? "Shop"}
                    </h3>
                    <span className="font-semibold text-sm">
                      ₹{order.totalCents / 100}
                    </span>
                  </div>

                  <Badge
                    className="mt-1 capitalize"
                    variant={
                      order.status === OrderStatus.DELIVERED
                        ? "default"
                        : order.status === OrderStatus.CREATED
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {order.status.toLowerCase()}
                  </Badge>

                  <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                    {order.items.map((i) => i.item.name).join(", ")}
                  </p>

                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                  {/* Cancel Button */}
                  {order.status === OrderStatus.CREATED && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-3"
                      onClick={() => handleCancel(order.id)}
                      disabled={canceling === order.id}
                    >
                      {canceling === order.id ? "Cancelling..." : "Cancel Order"}
                    </Button>
                  )}
                </div>

                {/* View Button */}
                <div className="">
                  <Link href={`/customer/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
