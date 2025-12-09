"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = [
  { id: "groceries", title: "Groceries", image: "/images/cat-groceries.png" },
  { id: "food", title: "Food Delivery", image: "/images/cat-food.png" },
  { id: "taxi", title: "Taxis & Rides", image: "/images/cat-taxi.png" },
];

export default function CategoryCarousel() {
  const params = useSearchParams();
  const router = useRouter();

  const selected = params.get("category");

  return (
    <div className="overflow-x-auto py-2">
      <div className="flex gap-8 px-2">
        {categories.map((c) => {
          const isActive = selected === c.id;

          return (
            <button
              key={c.id}
              onClick={() => router.push(`/customer/dashboard?category=${c.id}`)}
              className={cn(
                "flex items-center ml-2 gap-6 min-w-[400px] rounded-xl px-4 py-3 shadow-sm transition-all text-left",
                "hover:shadow-md active:scale-[0.98] border",

                isActive
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-gray-200 bg-white"
              )}
            >
              {/* IMAGE */}
              <div className="h-14 w-14 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={c.image}
                  alt={c.title}
                  width={80}
                  height={80}
                  className="object-cover h-full w-full"
                />
              </div>

              {/* TEXT */}
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-[15px] font-medium",
                    isActive ? "text-primary" : "text-gray-800"
                  )}
                >
                  {c.title}
                </span>

                <span className="text-xs text-gray-500">
                  Tap to explore
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
