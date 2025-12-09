"use client";

import { Item } from "@prisma/client";
import { useCart } from "@/hooks/use-cart";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ItemListProps {
  items?: Item[]; // make optional
}

export default function ItemList({ items = [] }: ItemListProps) {
  const { addToCart } = useCart();

  if (!items.length) {
    return <p className="text-muted-foreground">No items available</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it) => (
        <Card key={it.id} className="flex flex-col">
          <div className="relative h-48 w-full">
            {it.imageUrl && (
              <Image
                src={it.imageUrl}
                alt={it.name}
                fill
                className="object-cover p-4 rounded-4xl"
              />
            )}
          </div>
            <div className="border"></div>
          <CardContent className="flex-1 py-2">
            <h3 className="font-semibold">{it.name}</h3>
            <p className="text-sm text-muted-foreground">{it.description}</p>
            <p className="font-bold text-lg mt-2">₹{it.priceCents / 100}</p>

            <Button className="mt-3 w-full" onClick={() => addToCart(it.id)}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
