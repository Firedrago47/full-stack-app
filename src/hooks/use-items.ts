"use client";

import useSWR from "swr";
import type { DashboardItem } from "@/types/category";

type ItemsCategory = "food" | "groceries";

interface ItemsResponse {
  items: DashboardItem[];
}

const fetcher = async (url: string): Promise<ItemsResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }
  return res.json();
};

export function useItems(category: ItemsCategory) {
  const { data, error, isLoading } = useSWR<ItemsResponse>(
    `/api/items?category=${category}`,
    fetcher
  );

  return {
    items: data?.items ?? [],
    isLoading,
    error,
  };
}
