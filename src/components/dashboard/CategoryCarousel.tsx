// File: components/dashboard/CategoryCarousel.tsx

import Image from "next/image";
import { cn } from "@/lib/utils";

const categories = [
  { id: "groceries", title: "Groceries", image: "/images/cat-groceries.png" },
  { id: "food", title: "Food", image: "/images/cat-food.png" },
  { id: "taxi", title: "Taxis", image: "/images/cat-taxi.png" },
];

export default function CategoryCarousel() {
  return (
    <div className="overflow-x-auto py-3">
      <div className="flex gap-6 px-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className={cn(
              "flex flex-col items-center cursor-pointer group",
              "min-w-[90px]"
            )}
          >
            <div
              className={cn(
                "h-20 w-20 rounded-full overflow-hidden shadow-sm",
                "transition-transform group-hover:scale-105"
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

            <p className="mt-2 text-sm font-medium">{c.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
