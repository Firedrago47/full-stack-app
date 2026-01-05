"use client";

import { useSearchParams } from "next/navigation";
import { useItems } from "@/hooks/use-items";
import ItemList from "./ItemList";

type Category = "food" | "groceries";

function resolveCategory(value: string | null): Category {
  if (value === "groceries") return "groceries";
  return "food";
}

export default function ItemsSection() {
  const params = useSearchParams();
  const category = resolveCategory(params.get("category"));

  const { items, isLoading } = useItems(category);

  return <ItemList items={items} isLoading={isLoading} />;
}
