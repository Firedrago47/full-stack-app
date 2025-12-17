"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreateItemSchema,
  ItemInput,
} from "@/lib/validation/item";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shopId: string;
}

export default function AddItemDialog({ open, onOpenChange, shopId }: Props) {
  const [form, setForm] = useState<ItemInput>({
    shopId,
    name: "",
    priceCents: undefined as unknown as number,
    stock: undefined as unknown as number,
    imageUrl: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const parsed = CreateItemSchema.safeParse(form);
    if (!parsed.success) {
      alert("Invalid input, please fill properly.");
      return;
    }

    setLoading(true);

    await fetch("/api/shop/items", {
      method: "POST",
      body: JSON.stringify(parsed.data),
    });

    setLoading(false);
    onOpenChange(false);
    window.location.reload();
  };

  const updateField = (field: keyof ItemInput, value: string) => {
    if (field === "priceCents" || field === "stock") {
      const num = value === "" ? undefined : Number(value);
      setForm((prev) => ({ ...prev, [field]: num as number }));
      return;
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add New Item
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Item Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Item Name</label>
            <Input
              placeholder="Ex: Chicken Biryani"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Price (₹)</label>
            <Input
              type="number"
              placeholder="Enter price"
              value={form.priceCents ?? ""}
              onChange={(e) => updateField("priceCents", e.target.value)}
            />
          </div>

          {/* Stock */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Stock Available</label>
            <Input
              type="number"
              placeholder="Ex: 30"
              value={form.stock ?? ""}
              onChange={(e) => updateField("stock", e.target.value)}
            />
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(e) => {
                updateField("imageUrl", e.target.value);
                setPreview(e.target.value || null);
              }}
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="rounded-lg overflow-hidden border h-32">
              <img
                src={preview}
                className="w-full h-full object-cover"
                alt="preview"
              />
            </div>
          )}

          <Button
            className="w-full font-semibold"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Item"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
