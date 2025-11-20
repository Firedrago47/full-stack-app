import { z } from "zod";

export const RoleEnum = z.enum(["CUSTOMER", "DRIVER", "SHOP_OWNER"]);

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be 8+ chars"),
  phone: z.string().min(10, "Phone is required"),
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
  identifier: z.string().min(3, "Email or mobile is required"),
  password: z.string().min(8, "Password must be 8+ chars"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
