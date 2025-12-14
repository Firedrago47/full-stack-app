import { Prisma, Item } from "@prisma/client";

export type ShopItem = Prisma.ItemGetPayload<{
  include: { shop: true };
}>;

export type WarehouseItem = Item & {
  shop?: undefined; 
};

export type ItemWithSource = ShopItem | WarehouseItem;
