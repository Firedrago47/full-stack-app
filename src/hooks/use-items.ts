"use client";

import useSWR from "swr";
import type { DashboardItem, DashboardCategory } from "@/types/category";

interface ItemsResponse {
  items: DashboardItem[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useItems(category: DashboardCategory) {
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
