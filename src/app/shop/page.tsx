"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Store, TrendingUp, Timer } from "lucide-react";

export default function ShopLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">

      {/* -------------------- HERO -------------------- */}
      <section className="px-6 md:px-16 pt-24 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* TEXT */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
            Grow Your Business <br />
            with <span className="text-primary">QuickGo Partner</span>
          </h1>

          <p className="mt-4 text-lg text-muted-foreground max-w-md">
            Reach thousands of customers in your area. Increase sales, manage orders easily, and deliver faster than ever.
          </p>

          <div className="mt-6 flex gap-4">
            <Button
              size="lg"
              className="px-8 shadow-md"
              onClick={() => (window.location.href = "/shop/auth/register")}
            >
              Register Shop
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 shadow-md"
              onClick={() => (window.location.href = "/shop/auth/login")}
            >
              Login
            </Button>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative h-80 md:h-[420px] w-full">
          <Image
            src="/images/shop-hero.jpg"
            alt="Shop Owner"
            fill
            className="object-cover rounded-2xl shadow-xl"
            priority
          />
        </div>
      </section>


      {/* -------------------- BENEFITS -------------------- */}
      <section className="px-6 md:px-16 pb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Join QuickGo?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <Store className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">More Customers</h3>
            <p className="text-muted-foreground mt-2">
              List your shop and get orders from thousands of customers instantly.
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <TrendingUp className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Grow Sales</h3>
            <p className="text-muted-foreground mt-2">
              Increase your revenue through online ordering and promotions.
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <Timer className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Fast Setup</h3>
            <p className="text-muted-foreground mt-2">
              Register your shop and start receiving orders within minutes.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="px-10 py-6 text-lg"
            onClick={() => (window.location.href = "/shop/auth/register")}
          >
            Become a Partner Today
          </Button>
        </div>
      </section>

    </div>
  );
}
