"use client";

import useSWR from "swr";
import { Cart } from "@/types/cart";

const fetcher = async (url: string): Promise<{ cart: Cart | null }> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
};

export function useCart() {
  const { data, mutate, isLoading, error } = useSWR<{ cart: Cart | null }>(
    "/api/cart",
    fetcher
  );

  const cart = data?.cart ?? null;
  const items = cart?.items ?? [];

  // ADD TO CART
  async function addToCart(itemId: string, quantity: number = 1): Promise<void> {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, quantity }),
    });

    await mutate();
  }

  // UPDATE QUANTITY
  async function updateQuantity(orderItemId: string, quantity: number): Promise<void> {
    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderItemId, quantity }),
    });

    await mutate();
  }

  // REMOVE ITEM
  async function removeItem(orderItemId: string): Promise<void> {
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderItemId }),
    });

    await mutate();
  }

  async function checkout() {
    const res = await fetch("/api/cart/checkout",{
      method : "POST",
    });
    const data = await res.json();
    if(!res.ok){
      return {ok:false,error:data.error ?? "Checkout Failed"};
    }

    mutate();
    return {ok:true,order:data.order};
  }

  return {
    cart,
    items,
    isLoading,
    error,
    addToCart,
    updateQuantity,
    removeItem,
    checkout,
  };
}
