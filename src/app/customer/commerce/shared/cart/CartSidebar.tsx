"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Minus, Plus, Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartSidebar({ open, onOpenChange }: Props) {
  const { items, updateQuantity, removeItem, cart, checkout } = useCart();

  // lg breakpoint
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const CartBody = (
    <div className="flex flex-col h-full">
      {/* ITEMS */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Your cart is empty.
          </p>
        )}

        {items.map((it) => (
          <div key={it.id} className="flex justify-between gap-4">
            <div className="flex">
              <div className="flex-1">

              <p className="font-medium">{it.item.name}</p>
              <p className="text-sm text-muted-foreground">
                ₹{(it.unitPriceCents / 100).toFixed(2)}
              </p>
              </div>

              <div className="flex ml-6 items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() =>
                    updateQuantity(it.id, Math.max(1, it.quantity - 1))
                  }
                >
                  <Minus size={14} />
                </Button>

                <span className="text-sm w-6 text-center">
                  {it.quantity}
                </span>

                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() =>
                    updateQuantity(it.id, it.quantity + 1)
                  }
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeItem(it.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="border-t p-5 space-y-3">
        <Row label="Subtotal" value={`₹${((cart?.totalCents ?? 0) / 100).toFixed(2)}`} />
        <Row label="Delivery Fee" value={items.length ? "₹40.00" : "₹0.00"} />
        <Separator />
        <Row
          label="Total"
          value={`₹${((cart?.totalCents ?? 0) / 100).toFixed(2)}`}
          bold
        />

        <Button
          className="w-full mt-4 cursor-pointer"
          size="lg"
          disabled={!items.length}
          onClick={checkout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );

  // 🔥 Render ONLY ONE
  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-[380px] p-0">
          <SheetHeader className="border-b p-5">
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          {CartBody}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh]">
        {CartBody}
      </DrawerContent>
    </Drawer>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      className={`flex justify-between ${
        bold ? "font-semibold text-base" : "text-sm"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
