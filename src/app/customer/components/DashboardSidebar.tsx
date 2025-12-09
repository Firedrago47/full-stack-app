"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  Heart,
  Wallet,
  HelpCircle,
  Settings,
} from "lucide-react";

const MENU = [
  { name: "Overview", href: "/customer/dashboard", icon: Home },
  { name: "My Orders", href: "/customer/orders", icon: ShoppingBag },
  { name: "Favourites", href: "/customer/favourites", icon: Heart },
  { name: "Payments", href: "/customer/payments", icon: Wallet },
  { name: "Support", href: "/customer/support", icon: HelpCircle },
  { name: "Settings", href: "/customer/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white">

      <nav className="p-4 space-y-1">
        {MENU.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition text-[15px]",
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              )}
            >
              <Icon className="h-4 w-4" />
              {name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
