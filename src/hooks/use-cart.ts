"use client";

import useSWR from "swr";
import { Cart } from "@/types/cart";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
} from "@/app/actions/cart";
import { redirect } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useCart() {
  const { data, mutate, isLoading, error } = useSWR<{ cart: Cart | null }>(
    "/api/cart",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      dedupingInterval: 60_000,
    }
  );

  const cart = data?.cart ?? null;
  const items = cart?.items ?? [];

  async function add(itemId: string, quantity = 1) {
    await addToCart(itemId, quantity);
    mutate();
  }

  async function update(orderItemId: string, quantity: number) {
    await updateCartItem(orderItemId, quantity);
    mutate();
  }

  async function remove(orderItemId: string) {
    await removeCartItem(orderItemId);
    mutate();
  }

  async function checkout() {
      const res = await fetch("/api/cart/checkout",{
        method : "POST",
      });
      const data = await res.json();
      if(!res.ok){
        return {ok:false,error:data.error ?? "Checkout Failed"};
      }
      redirect("/customer/orders")
      mutate();
      return {ok:true,order:data.order};
    }

  return {
    cart,
    items,
    isLoading,
    error,
    addToCart: add,
    updateQuantity: update,
    removeItem: remove,
    checkout,
  };
}
