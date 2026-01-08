"use client";

import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ItemWithSource } from "@/types/item";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function ItemList({
  items,
  isLoading,
}: {
  items: ItemWithSource[];
  isLoading: boolean;
}) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card className="flex flex-col rounded-xl overflow-hidden border shadow-sm" key={i}>
            <Skeleton className="h-44 w-full" />

            <CardContent className="p-3 space-y-3 flex-1 flex flex-col">
              <Skeleton className="h-4 w-3/4" />

              <div className="mt-auto space-y-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  if (!items || items.length === 0) {
    return <p className="text-muted-foreground text-sm">No items available</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="flex flex-col border hover:shadow-md transition rounded-xl overflow-hidden"
        >
          <div className="relative h-40 w-full bg-gray-100">
            <Image
              src={item.imageUrl || "/images/placeholder.png"}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          <CardContent className="p-3 flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h3 className="font-semibold text-base">{item.name}</h3>

              {item.source === "SHOP" ? (
                <p className="text-xs text-gray-500">
                  From shop: {item.shop?.name ?? "Unknown"}
                </p>
              ) : (
                <p className="text-xs text-green-600 font-medium">
                  
                </p>
              )}
            </div>

            <div className="mt-1">
              <p className="font-bold text-lg mb-2">
                ₹{(item.priceCents / 100).toFixed(2)}
              </p>

              <Button
                size="sm"
                className="w-full"
                onClick={() => addToCart(item.id)}
              >
               {loading ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="h-4 w-4" />
                    Adding to cart
                  </span>
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
