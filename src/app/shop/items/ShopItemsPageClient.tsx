"use client";

import { useState } from "react";
import AddItemDialog from "../components/items/AddItemDialog";
import ShopItemList from "../components/items/ShopItemsList";
import { Item, Shop } from "@prisma/client";

interface Props {
  shop: Shop & { items: Item[] };
}

export default function ShopItemsPageClient({ shop }: Props) {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <div className="p-6 space-y-6">
      
      <ShopItemList items={shop.items} shopId={shop.id} />

      {/* Dialog */}
      <AddItemDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        shopId={shop.id}
      />
    </div>
  );
}
