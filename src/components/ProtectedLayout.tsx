// components/ProtectedLayout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";

type Role = "CUSTOMER" | "DRIVER" | "SHOP_OWNER" | "ADMIN";

type Props = {
  children: ReactNode;
  allowedRoles?: Role[];
};

/**
 * Canonical landing pages for each role
 */
const ROLE_HOME: Record<Role, string> = {
  CUSTOMER: "/",
  DRIVER: "/driver",
  SHOP_OWNER: "/shop",
  ADMIN: "/admin",
};

/**
 * Login pages for each role
 */
const ROLE_LOGIN: Record<Role, string> = {
  CUSTOMER: "/customer/login",
  DRIVER: "/driver/login",
  SHOP_OWNER: "/shop/login",
  ADMIN: "/admin/login",
};

export default async function ProtectedLayout({
  children,
  allowedRoles,
}: Props) {
  const user = await getCurrentUser();

  
  if (!user) {
    if (allowedRoles?.length === 1) {
      redirect(ROLE_LOGIN[allowedRoles[0]]);
    }

    // fallback (generic login)
    redirect("/login");
  }


  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (allowedRoles.length === 1) {
      redirect(ROLE_HOME[allowedRoles[0]]);
    }

    // fallback → user’s own role home
    redirect(ROLE_HOME[user.role]);
  }

  
  return <>{children}</>;
}
