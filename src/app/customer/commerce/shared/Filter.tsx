"use client";

import { useSearchParams } from "next/navigation";

type Category = "food" | "grocery";


export default function Filter({
  category,
}: {
  category: Category;
}) {
  
  return (
    <aside className="lg:col-span-1 mx-6 space-y-4">
      <div className="p-4 bg-white border rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold">Filters</h3>

        <div className="mt-3 space-y-2">
          {/* FOOD FILTERS */}
          {category === "food" && (
            <>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Vegetarian</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Vegan</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Fast Delivery</span>
              </label>
            </>
          )}

          {/* GROCERY FILTERS */}
          {category === "grocery" && (
            <>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Organic</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>In Stock</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Discounted</span>
              </label>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
