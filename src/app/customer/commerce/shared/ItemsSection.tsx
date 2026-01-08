"use client";

import { useItems } from "@/hooks/use-items";
import ItemList from "./ItemList";

type Category = "food" | "groceries";

export default function ItemsSection({
  category,
}: {
  category: Category;
}) {
  const { items, isLoading } = useItems(category);

  return <ItemList items={items} isLoading={isLoading} />;
}
