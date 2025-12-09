"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

const CATEGORY_DATA = {
  groceries: "Groceries",
  food: "Food",
  taxi: "Taxi",
} as const;


type CategoryKey = keyof typeof CATEGORY_DATA;

export default function CustomerExplorePage() {
  const params = useSearchParams();
  const selected = params.get("category") as CategoryKey | null;
  const router = useRouter();

  const title = selected ? CATEGORY_DATA[selected] : "Explore Nearby";

  return (
    <div className="min-h-screen bg-gray-50 pb-10">

      {/* ================= NAVBAR ================= */}
      <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
          
          {/* Logo */}
          <Link href="/customer">
            <h1 className="text-xl font-semibold">Quick Explore</h1>
          </Link>

          {/* Search */}
          <div className="relative w-60 md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-9 h-9"
            />
          </div>

          {/* Login */}
          <Button
            variant="outline"
            className="h-9 "
            onClick={() => router.push("/customer/auth/login")}
          >
            Login
          </Button>
        </div>
      </nav>

      {/* ================= PAGE CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-6">

        <h2 className="text-xl font-bold mb-4">{title}</h2>
        
        {!selected && <p className="text-sm text-muted-foreground mb-4">
          Choose a category to get started
        </p>}

        {!selected && <Separator className="my-4" />}

        {/* ================= CATEGORIES ================= */}
        {!selected && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(Object.keys(CATEGORY_DATA) as CategoryKey[]).map((key) => (
                <Link
                  key={key}
                  href={`/customer?category=${key}`}
                  className="flex flex-col items-center"
                >
                  <div className="h-30 w-30 rounded-full overflow-hidden shadow-sm border bg-white hover:shadow-md transition">
                    <Image
                      src={`/images/cat-${key}.png`}
                      alt={CATEGORY_DATA[key]}
                      width={80}
                      height={80}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <p className="text-sm mt-2 font-medium">{CATEGORY_DATA[key]}</p>
                </Link>
              ))}
            </div>

            <Separator className="my-8" />
          </div>
        )}

        {/* ================= SHOP LIST ================= */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {selected
              ? `Top ${CATEGORY_DATA[selected]} Places`
              : "Popular Nearby"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="relative h-32 w-full">
                  <Image
                    src={
                      selected === "food"
                        ? "/images/food-placeholder.jpg"
                        : selected === "groceries"
                        ? "/images/shop-placeholder.jpg"
                        : selected === "taxi"
                        ? "/images/taxi-banner.jpg"
                        : "/images/shop-placeholder.jpg"
                    }
                    alt="Shop"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">
                      {CATEGORY_DATA[selected ?? "groceries"]} #{i + 1}
                    </h4>

                    <Badge variant="secondary">Open</Badge>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {selected === "food"
                      ? "Fast Food • 24 mins"
                      : selected === "groceries"
                      ? "Daily Essentials"
                      : selected === "taxi"
                      ? "Nearby Taxi Available"
                      : "Popular Choice"}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
