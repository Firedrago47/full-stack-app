"use client";

import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ItemWithSource } from "@/types/item";

interface ItemListProps {
  items: ItemWithSource[];
}

export default function ItemList({ items }: ItemListProps) {
  const { addToCart } = useCart();

  if (!items || items.length === 0) {
    return <p className="text-muted-foreground text-sm">No items available</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  Warehouse Item
                </p>
              )}
            </div>

            <div className="mt-3">
              <p className="font-bold text-lg mb-2">
                ₹{(item.priceCents / 100).toFixed(2)}
              </p>

              <Button
                size="sm"
                className="w-full"
                onClick={() => addToCart(item.id)}
              >
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
