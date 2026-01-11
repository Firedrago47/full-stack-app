"use client";

import { useState } from "react";
import { Item } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddItemDialog from "./AddItemDialog";
import EditItemDialog from "./EditItemDialog";
import ItemRowActions from "./ItemRowActions";
import Image from "next/image";

interface Props {
  items: Item[];
  shopId: string;
}

export default function ShopItemList({ items, shopId }: Props) {
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [query, setQuery] = useState("");

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Manage Items</h1>

        <Button onClick={() => setAddOpen(true)}>+ Add Item</Button>
      </div>

      {/* Search */}
      <Input
        className="max-w-xs"
        placeholder="Search items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-5 text-gray-500">
                  No items found.
                </td>
              </tr>
            )}

            {filtered.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      width={60}
                      height={60}
                      alt={item.name}
                      className="rounded object-cover h-14 w-14"
                    />
                  ) : (
                    <div className="h-14 w-14 bg-gray-200 rounded"></div>
                  )}
                </td>

                <td className="p-3">{item.name}</td>
                <td className="p-3">₹{(item.priceCents / 100).toFixed(2)}</td>
                <td className="p-3">{item.stock}</td>

                <td className="p-3 text-right">
                  <ItemRowActions
                    item={item}
                    onEdit={() => setEditItem(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialogs */}
      <AddItemDialog open={addOpen} onOpenChange={setAddOpen} shopId={shopId} />

      {editItem && (
        <EditItemDialog
          open={!!editItem}
          onOpenChange={() => setEditItem(null)}
          item={editItem}
        />
      )}
    </div>
  );
}
