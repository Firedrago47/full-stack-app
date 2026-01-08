import type { Prisma } from "@prisma/client";

// FOOD item includes shop
export type FoodItem = Prisma.ItemGetPayload<{ include: { shop: true } }>;

// GROCERY item has no shop
export type GroceryItem = Prisma.ItemGetPayload<{}>;

export type DashboardItem = FoodItem | GroceryItem;

export type DashboardCategory = "food" | "grocery" | "ride";
