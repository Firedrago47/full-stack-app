// components/ProtectedLayout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";

type Props = {
  children: ReactNode;
  allowedRoles?: Array<"CUSTOMER" | "DRIVER" | "SHOP_OWNER" | "ADMIN">;
  fallbackRedirect?: string;
};

export default async function ProtectedLayout({
  children,
  allowedRoles,
  fallbackRedirect = "/auth/login",
}: Props) {
  const user = await getCurrentUser();
  if (!user) {
    // not authenticated
    redirect(fallbackRedirect);
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // authenticated but wrong role
    // choose safe location — home or role-specific landing
    redirect("/customer/auth/login");
  }

  return <>{children}</>;
}
