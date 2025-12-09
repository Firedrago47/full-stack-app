"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, cart } = useCart();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 space-y-4">
          {items.length === 0 && (
            <p className="text-muted-foreground text-sm">Cart is empty.</p>
          )}

          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <div>
                <p className="font-medium">{it.item.name}</p>
                <p className="text-sm text-muted-foreground">
                  ₹{it.unitPriceCents / 100}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() =>
                    updateQuantity(it.id, Math.max(1, it.quantity - 1))
                  }
                >
                  -
                </Button>

                <span>{it.quantity}</span>

                <Button
                  variant="ghost"
                  onClick={() => updateQuantity(it.id, it.quantity + 1)}
                >
                  +
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(it.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="p-4 border-t flex justify-between">
            <p className="font-medium">Delivery Fee</p>
            <p className="font-semibold">₹0</p>
          </div>
        ) : (
          <div className="p-4 border-t flex justify-between">
            <p className="font-medium">Deliver Fee</p>
            <p className="font-semibold">₹40</p>
          </div>
        )}

        <div className="p-4 border-t flex justify-between">
          <p className="font-semibold">Total</p>
          <p className="font-bold">₹{(cart?.totalCents ?? 0) / 100}</p>
        </div>

        <div className="p-4">
          <Button className="w-full">Checkout</Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
