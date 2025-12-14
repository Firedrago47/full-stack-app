"use client";

import { useSearchParams } from "next/navigation";
import { useItems } from "@/hooks/use-items";
import ItemList from "./ItemList";

function resolveCategory(value: string | null) {
  if (value === "groceries") return "groceries";
  if (value === "taxi") return "taxi";
  return "food";
}

export default function ItemsSection() {
  const params = useSearchParams();
  const category = resolveCategory(params.get("category"));

  const { items, isLoading } = useItems(category);

  if (isLoading) return <p>Loading...</p>;

  return <ItemList items={items} />;
}
