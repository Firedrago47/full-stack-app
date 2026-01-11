"use client";

import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

import DashboardSidebar from "./DashboardSidebar";

export default function DashboardTopbar() {

  return (
    <>
      <header className="w-full border-b bg-white px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">

        {/* ---------- LEFT: MENU + LOGO ---------- */}
        <div className="flex items-center gap-3">

          {/* Hamburger → opens sidebar */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md hover:bg-gray-100">
                <Menu size={22} />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="p-0 w-72">
              <SheetHeader className="px-4 py-3 border-b">
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>

              {/* Customer Sidebar */}
              <DashboardSidebar />
            </SheetContent>
          </Sheet>

          <Link href="/customer/dashboard">
            <h1 className="font-extrabold text-xl tracking-tight">
              Full Stack <span className="text-primary">App</span>
            </h1>
          </Link>
        </div>

        {/* ---------- MIDDLE: SEARCH BAR (Desktop only) ---------- */}
        <div className="hidden md:flex items-center w-[380px]">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search food, shops, rides..."
              className="pl-10 pr-4 w-full rounded-md"
            />
          </div>
        </div>

        {/* ---------- RIGHT: CART + PROFILE ---------- */}
        <div className="flex items-center gap-4">

          {/* Mobile search icon */}
          <button className="md:hidden p-2 rounded hover:bg-gray-100">
            <Search size={20} />
          </button>

          {/* Profile Avatar */}
          <Link href="/customer/profile">
            <div className="h-9 w-9 rounded-full bg-gray-200 border shadow-sm cursor-pointer flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-700">D</span>
            </div>
          </Link>
        </div>
      </header>

    </>
  );
}
