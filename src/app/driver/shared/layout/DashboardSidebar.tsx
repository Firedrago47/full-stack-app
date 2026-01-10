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
  Car,
} from "lucide-react";

const MENU = [
  { id: "dashboard", name: "Overview", href: "/driver/dashboard", icon: Home },
  {
    id: "ride",
    name: "Active Ride",
    href: "/driver/ride",
    icon: Car,
  },
  {
    id: "earnings",
    name: "Earnings",
    href: "/driver/earnings",
    icon: Wallet,
  },
  { id: "support", name: "Support", href: "/driver/support", icon: HelpCircle },
  {
    id: "settings",
    name: "Settings",
    href: "/driver/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white">
      <nav className="p-4 space-y-1">
        {MENU.map(({ id, name, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={id}
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
