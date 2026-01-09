"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { DashboardCategory } from "@/types/category";

type CarouselCategory = DashboardCategory | "default";

const categories: {
  id: DashboardCategory;
  title: string;
  image: string;
}[] = [
  { id: "food", title: "Food Delivery", image: "/images/cat-food.png" },
  { id: "grocery", title: "Groceries", image: "/images/cat-groceries.png" },
  { id: "ride", title: "Taxis & Rides", image: "/images/vehicle-car.png" },
];

interface Props {
  active?: CarouselCategory; 
}

export default function CategoryCarousel({ active = "default" }: Props) {
  const router = useRouter();

  return (
    <div className="w-full">
      {/* MOBILE */}
      <div className="md:hidden sm:grid grid-cols-2 mx-auto py-2">
        <div className="flex items-center gap-6 px-4">
          {categories.map((c) => {
            const isActive = active === c.id;

            return (
              <button
                key={c.id}
                onClick={() => router.push(`/customer/dashboard/${c.id}`)}
                className="flex flex-col items-center min-w-[90px] cursor-pointer space-y-2"
              >
                <div
                  className={cn(
                    "flex items-center h-18 w-18 rounded-full overflow-hidden shadow-sm border transition-transform",
                    isActive
                      ? "border-primary scale-110 shadow-md"
                      : "border-gray-200"
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
          const isActive = active === c.id;

          return (
            <button
              key={c.id}
              onClick={() => router.push(`/customer/dashboard/${c.id}`)}
              className={cn(
                "flex items-center gap-4 rounded-xl px-4 py-2 shadow-sm border cursor-pointer transition-all",
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
