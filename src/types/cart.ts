import { Order, OrderItem, Item, Shop } from "@prisma/client";

export type CartItem = OrderItem & {
  item: Item;
};

export type Cart = Order & {
  items: CartItem[];
};
