import { z } from "zod";

export const CreateItemSchema = z.object({
  shopId: z.string(),
  name: z.string().min(1),
  priceCents: z.number().int().min(1),
  stock: z.number().int().min(0),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export type ItemInput = z.infer<typeof CreateItemSchema>;

export const UpdateItemSchema = z.object({
  name: z.string().min(1).optional(),
  priceCents: z.number().int().positive().optional(),
  stock: z.number().int().min(0).optional(),
  imageUrl: z.string().url().nullable().optional(),
});

export type UpdateItemInput = z.infer<typeof UpdateItemSchema>;