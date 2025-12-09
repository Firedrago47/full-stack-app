import { z } from "zod";

export const CreateItemSchema = z.object({
  shopId: z.string(),
  name: z.string().min(1),
  priceCents: z.number().int().min(1),
  stock: z.number().int().min(0),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export type CreateItemInput = z.infer<typeof CreateItemSchema>;
