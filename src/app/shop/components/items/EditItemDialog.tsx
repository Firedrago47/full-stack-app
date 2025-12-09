"use client";

import { useState } from "react";
import { Item } from "@prisma/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: () => void;
  item: Item;
}

export default function EditItemDialog({ open, onOpenChange, item }: Props) {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.priceCents);
  const [stock, setStock] = useState(item.stock);
  const [imageUrl, setImageUrl] = useState(item.imageUrl ?? "");

  const handleSave = async () => {
    await fetch(`/api/shop/items/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify({ name, priceCents: price, stock, imageUrl }),
    });

    onOpenChange();
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

          <Button className="w-full" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
