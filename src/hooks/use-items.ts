"use client";

import useSWR from "swr";
import type { DashboardItem, DashboardCategory } from "@/types/category";

interface ItemsResponse {
  items: DashboardItem[];
}

const fetcher = async (url: string): Promise<ItemsResponse> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
};

/**
 * useItems
 *
 * - Always callable (no conditional hooks)
 * - When category is null → NO FETCH (Taxi case)
 */
export function useItems(
  category: DashboardCategory | null
) {
  const shouldFetch = category !== null;

  const { data, error, isLoading } = useSWR<ItemsResponse>(
    shouldFetch ? `/api/items?category=${category}` : null,
    fetcher
  );

  return {
    items: data?.items ?? [],
    isLoading: shouldFetch ? isLoading : false,
    error,
  };
}
