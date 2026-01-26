"use client";

import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ItemWithSource } from "@/types/item";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ItemList({
  items,
  isLoading,
}: {
  items: ItemWithSource[];
  isLoading: boolean;
}) {
  const { addToCart } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className="flex flex-col rounded-xl overflow-hidden">
            <Skeleton className="h-44 w-full" />
            <CardContent className="p-3 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-9 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <p className="text-muted-foreground text-sm">No items available</p>;
  }

  const handleAdd = async (itemId: string) => {
    setAddingId(itemId);
    try {
      await addToCart(itemId); // 👈 must support async
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 mx-4 gap-4">
      {items.map((item) => {
        const isAdding = addingId === item.id;

        return (
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
              <div>
                <h3 className="font-semibold text-base">{item.name}</h3>
                {item.source === "SHOP" && (
                  <p className="text-xs text-gray-500">
                    From shop: {item.shop?.name ?? "Unknown"}
                  </p>
                )}
              </div>

              <div className="mt-2">
                <p className="font-bold text-lg mb-2">
                  ₹{(item.priceCents / 100).toFixed(2)}
                </p>

                <Button
                  size="sm"
                  className="w-full"
                  disabled={isAdding}
                  onClick={() => handleAdd(item.id)}
                >
                  {isAdding ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding…
                    </span>
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
