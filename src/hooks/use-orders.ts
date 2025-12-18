"use client";

import useSWR from "swr";
import type { Order, OrderItem, Shop } from "@prisma/client";

export interface OrderWithRelations extends Order {
  shop: Shop | null;
  items: (OrderItem & { item: any })[];
}

interface OrdersResponse {
  orders: OrderWithRelations[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useOrders() {
  const { data, error, isLoading, mutate } = useSWR<OrdersResponse>(
    "/api/orders",
    fetcher
  );

  return {
    orders: data?.orders ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export async function cancelOrder(id: string) {
  const res = await fetch(`/api/orders/${id}/cancel`, {
    method: "POST",
  });

  return res.json();
}
