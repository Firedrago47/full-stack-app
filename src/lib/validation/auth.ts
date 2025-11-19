import { z } from "zod";

export const RoleEnum = z.enum(["CUSTOMER", "DRIVER", "SHOP_OWNER"]);

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be 6+ chars"),
  phone: z.string().optional(),

  role: RoleEnum,

  // driver
  licenseNumber: z.string().optional(),
  vehicleNumber: z.string().optional(),

  // shop
  shopName: z.string().optional(),
  shopAddress: z.string().optional(),
});

export type Role = z.infer<typeof RoleEnum>;

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginInput = z.infer<typeof LoginSchema>;
