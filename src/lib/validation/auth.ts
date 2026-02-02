import { z } from "zod";

export const RoleEnum = z.enum(["CUSTOMER", "DRIVER", "SHOP_OWNER"]);

const StrongPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[^A-Za-z0-9]/, "Password must contain a special character");

export const RegisterSchema = z
  .object({
    name: z.string().min(2, "Name required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Phone is required"),

    password: StrongPassword,
    role: RoleEnum,

    // DRIVER
    licenseNumber: z.string().optional(),
    vehicleNumber: z.string().optional(),

    // SHOP
    shopName: z.string().optional(),
    shopAddress: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Driver validation
    if (data.role === "DRIVER") {
      if (!data.licenseNumber) {
        ctx.addIssue({
          path: ["licenseNumber"],
          message: "License number is required for drivers",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.vehicleNumber) {
        ctx.addIssue({
          path: ["vehicleNumber"],
          message: "Vehicle number is required for drivers",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // Shop validation
    if (data.role === "SHOP_OWNER") {
      if (!data.shopName) {
        ctx.addIssue({
          path: ["shopName"],
          message: "Shop name is required",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.shopAddress) {
        ctx.addIssue({
          path: ["shopAddress"],
          message: "Shop address is required",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

  export const LoginSchema = z.object({
  identifier: z.string().min(3, "Email or mobile is required"),
  password: z.string().min(8, "Password must be 8+ chars"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type Role = z.infer<typeof RoleEnum>;
export type StrongPasswordType = z.infer<typeof StrongPassword>;