"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function CustomerLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">

      {/* -------------------- HERO SECTION -------------------- */}
      <section className="px-6 md:px-16 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Everything you need, <span className="text-primary">delivered fast.</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Order groceries, hot food, essentials, or book a ride — all in one app.
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-lg mx-auto">
          <Input
            placeholder="Search groceries, restaurants, or services..."
            className="h-12 shadow-lg bg-white"
          />
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <Button size="lg" className="px-8" onClick={() => window.location.href = "/customer/auth/login"}>
            Login
          </Button>
          <Button size="lg" variant="outline" className="px-8" onClick={() => window.location.href = "/customer/auth/register"}>
            Get Started
          </Button>
        </div>
      </section>


      {/* -------------------- CATEGORIES -------------------- */}
      <section className="px-6 md:px-16 pb-20">
        <h2 className="text-3xl font-bold mb-8">What are you looking for?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Category Card */}
          <div className="group rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
            <div className="relative h-44">
              <Image
                src="/images/cat-groceries.jpg"
                fill
                alt="Groceries"
                className="object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Groceries</h3>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="group rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
            <div className="relative h-44">
              <Image
                src="/images/cat-food.jpg"
                fill
                alt="Food"
                className="object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Food Delivery</h3>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="group rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
            <div className="relative h-44">
              <Image
                src="/images/cat-taxi.jpg"
                fill
                alt="Taxi"
                className="object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Rides & Taxi</h3>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>


      {/* -------------------- WHY US SECTION -------------------- */}
      <section className="px-6 md:px-16 pb-24 bg-white border-t">
        <h2 className="text-3xl font-bold mb-10 text-center">Why choose us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold">Fast Delivery</h3>
            <p className="text-muted-foreground mt-2">Under 30 minutes for most orders.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Wide Selection</h3>
            <p className="text-muted-foreground mt-2">Thousands of groceries, meals, and stores.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Best Prices</h3>
            <p className="text-muted-foreground mt-2">Frequent offers & discounts.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
