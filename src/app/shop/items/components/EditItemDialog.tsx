"use client";

import { useEffect, useState } from "react";
import { Item } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: () => void;
  item: Item;
}

export default function EditItemDialog({ open, onOpenChange, item }: Props) {
  const [name, setName] = useState(item.name);
  const [priceRupees, setPriceRupees] = useState(
    (item.priceCents / 100).toString()
  );
  const [stock, setStock] = useState(item.stock.toString());
  const [imageUrl, setImageUrl] = useState(item.imageUrl ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(item.name);
    setPriceRupees((item.priceCents / 100).toString());
    setStock(item.stock.toString());
    setImageUrl(item.imageUrl ?? "");
  }, [item]);

  const handleSave = async () => {
    const price = Number(priceRupees);
    const qty = Number(stock);

    if (!name || isNaN(price) || price <= 0 || isNaN(qty)) {
      alert("Invalid input");
      return;
    }

    setLoading(true);

    await fetch(`/api/shop/items/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        priceCents: Math.round(price * 100), // 🔥 convert to paise
        stock: qty,
        imageUrl,
      }),
    });

    setLoading(false);
    onOpenChange();
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
          />

          <Input
            type="number"
            value={priceRupees}
            onChange={(e) => setPriceRupees(e.target.value)}
            placeholder="Price in ₹"
          />

          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
          />

          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
          />

          <Button className="w-full" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
