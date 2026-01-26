"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { DashboardCategory } from "@/types/category";

type Promo = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

const PROMOS: Record<
  DashboardCategory | "default",
  Promo[]
> = {
  grocery: [
    {
      id: 1,
      title: "20% off fresh veggies",
      subtitle: "Today only",
      image: "/images/promo-veg.jpg",
    },
    {
      id: 2,
      title: "Buy 1 Get 1 on fruits",
      subtitle: "Limited time",
      image: "/images/promo-fruit.jpg",
    },
    {
      id: 3,
      title: "Savings on household items",
      subtitle: "Essentials",
      image: "/images/promo-grocery.jpg",
    },
  ],

  food: [
    {
      id: 1,
      title: "Flat 30% at SushiPlace",
      subtitle: "Use code SUSHI30",
      image: "/images/promo-food.jpg",
    },
    {
      id: 2,
      title: "₹100 off on first 3 orders",
      subtitle: "Restaurants near you",
      image: "/images/food-placeholder.jpg",
    },
    {
      id: 3,
      title: "Free dessert with meals",
      subtitle: "Selected restaurants",
      image: "/images/promo-dessert.jpg",
    },
  ],

  ride: [
    {
      id: 1,
      title: "20% off on Airport rides",
      subtitle: "Ride now",
      image: "/images/promo-taxi.jpg",
    },
    {
      id: 2,
      title: "₹50 Flat discount",
      subtitle: "For new customers",
      image: "/images/promo-cab2.jpg",
    },
    {
      id: 3,
      title: "Ride more, save more",
      subtitle: "Earn rewards",
      image: "/images/promo-cab3.jpg",
    },
  ],

  default: [
    {
      id: 1,
      title: "Free delivery above ₹499",
      subtitle: "Across all categories",
      image: "/images/driver-hero.jpg",
    },
    {
      id: 2,
      title: "Deals of the day",
      subtitle: "Don’t miss out",
      image: "/images/food-placeholder.jpg",
    },
    {
      id: 3,
      title: "Save on your next purchase",
      subtitle: "Popular category picks",
      image: "/images/promo-fruit.jpg",
    },
  ],
};

interface Props {
  category?: DashboardCategory;
}

export default function FeaturedGrid({ category }: Props) {
  const promos =
    (category && PROMOS[category]) ?? PROMOS.default;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {promos.map((p) => (
        <Card
          key={p.id}
          className="overflow-hidden hover:shadow-lg transition"
        >
          <div className="relative h-44 w-full">
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover"
            />
          </div>

          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {p.subtitle}
                </p>
              </div>
              <Badge variant="secondary">Hot</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
