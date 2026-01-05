"use client";

import { useSearchParams } from "next/navigation";
import LeftPanel from "./LeftPanel";
import ItemsSection from "./ItemsSection";
import TaxiSection from "./TaxiSection";

type Category = "food" | "groceries" | "taxi";

function resolveCategory(value: string | null): Category {
  if (value === "groceries") return "groceries";
  if (value === "taxi") return "taxi";
  return "food";
}

export default function DashboardContent() {
  const params = useSearchParams();
  const category = resolveCategory(params.get("category"));

  if (category === "taxi") {
    return <TaxiSection />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <LeftPanel />
      <section className="lg:col-span-3 space-y-4">
        <ItemsSection />
      </section>
    </div>
  );
}
