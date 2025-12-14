"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashboardCategory } from "@/types/category";

function isDashboardCategory(value: string | null): value is DashboardCategory {
  return value === "food" || value === "groceries" || value === "taxi";
}
const categories: { id: DashboardCategory; title: string; image: string }[] = [
  { id: "food", title: "Food Delivery", image: "/images/cat-food.png" },
  { id: "groceries", title: "Groceries", image: "/images/cat-groceries.png" },
  { id: "taxi", title: "Taxis & Rides", image: "/images/cat-taxi.png" },
];

export default function CategoryCarousel() {
  const params = useSearchParams();
  const router = useRouter();

  const raw = params.get("category");
  const selected: DashboardCategory = isDashboardCategory(raw) ? raw : "food";

  return (
    <div className="w-full">
      {/* MOBILE */}
      <div className="md:hidden sm:grid grid-cols-2 mx-auto py-2">
        <div className="flex items-center gap-6 px-4">
          {categories.map((c) => {
            const isActive = selected === c.id;

            return (
              <button
                key={c.id}
                onClick={() => router.push(`/customer/dashboard?category=${c.id}`)}
                className="flex flex-col items-center min-w-[90px] space-y-2"
              >
                <div
                  className={cn(
                    "flex items-center h-18 w-18 rounded-full overflow-hidden shadow-sm border transition-transform",
                    isActive ? "border-primary scale-110 shadow-md" : "border-gray-200"
                  )}
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={80}
                    height={80}
                    className="object-cover h-full w-full"
                  />
                </div>

                <p
                  className={cn(
                    "text-sm font-semibold text-center",
                    isActive ? "text-primary" : "text-gray-800"
                  )}
                >
                  {c.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-3 gap-6 max-w-6xl mx-auto py-2">
        {categories.map((c) => {
          const isActive = selected === c.id;

          return (
            <button
              key={c.id}
              onClick={() => router.push(`/customer/dashboard?category=${c.id}`)}
              className={cn(
                "flex items-center gap-4 rounded-xl px-4 py-2 shadow-sm border transition-all",
                isActive
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-gray-200 bg-white hover:shadow-md"
              )}
            >
              <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={c.image}
                  alt={c.title}
                  width={80}
                  height={80}
                  className="object-cover h-full w-full"
                />
              </div>

              <div>
                <p
                  className={cn(
                    "text-[15px] font-medium",
                    isActive ? "text-primary" : "text-gray-900"
                  )}
                >
                  {c.title}
                </p>
                <p className="text-xs text-gray-500">Tap to explore</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
