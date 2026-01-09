"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 text-slate-900">
      <div className="min-h-screen">
        <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              F
            </div>
            <div className="font-semibold text-lg">Full-Stack Delivery</div>
          </div>
          <nav className="flex items-center gap-4">
            <a
              href="/driver"
              className="text-sm text-slate-700 hover:text-slate-900"
            >
              For Drivers
            </a>
            <a
              href="/shop"
              className="text-sm text-slate-700 hover:text-slate-900"
            >
              For Shops
            </a>
            <a
              href="/customer/login"
              className="ml-4 inline-flex items-center px-4 py-2 rounded-md bg-slate-900 text-white text-sm hover:opacity-90"
            >
              Login
            </a>
          </nav>
        </header>

        <main className="ax-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* -------------------- HERO SECTION -------------------- */}
          <section className="px-6 md:px-16 pt-16 pb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Everything you need,{" "}
              <span className="text-primary">delivered fast.</span>
            </h1>
            <p className="mt-4 text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Order groceries, hot food, essentials, or book a ride — all in one
              app.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <Button
                size="lg"
                className="px-8 shadow-md"
                onClick={() => (window.location.href = "/customer/login")}
              >
                Login
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 shadow-md"
                onClick={() =>
                  (window.location.href = "/customer/register")
                }
              >
                Get Started
              </Button>
            </div>
          </section>

          {/* -------------------- CATEGORIES -------------------- */}
          <section className="sm:px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-4">
              What are you looking for?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* GROCERIES */}
              <Link href={`/customer?category=groceries`}>
                <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
                  {/* IMAGE BLOCK */}
                  <div className="relative h-44 w-full">
                    <Image
                      src="/images/cat-groceries.png"
                      alt="Groceries"
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* TEXT BLOCK */}
                  <div className="p-4 flex items-center justify-between bg-white">
                    <h3 className="font-semibold text-lg">Groceries</h3>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Link>

              {/* FOOD */}
              <Link href={`/customer?category=food`}>
                <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
                  <div className="relative h-44 w-full">
                    <Image
                      src="/images/cat-food.png"
                      alt="Food Delivery"
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className="p-4 flex items-center justify-between bg-white">
                    <h3 className="font-semibold text-lg">Food</h3>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Link>

              {/* TAXI */}
              <Link href={`/customer?category=taxi`}>
                <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
                  <div className="relative h-44 w-full">
                    <Image
                      src="/images/cat-taxi.png"
                      alt="Taxi"
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className="p-4 flex items-center justify-between bg-white">
                    <h3 className="font-semibold text-lg">Rides & Taxi</h3>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </main>
      </div>
      {/* -------------------- WHY US SECTION -------------------- */}
      <section className="px-6 md:px-16 pb-24 bg-white border-t">
        <h2 className="text-3xl font-bold m-10 text-center">Why choose us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold">Fast Delivery</h3>
            <p className="text-muted-foreground mt-2">
              Under 30 minutes for most orders.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Wide Selection</h3>
            <p className="text-muted-foreground mt-2">
              Thousands of groceries, meals, and stores.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Best Prices</h3>
            <p className="text-muted-foreground mt-2">
              Frequent offers & discounts.
            </p>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-8 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} Devsync Delivery</div>
          <div className="flex items-center gap-4">
            <a href="/terms" className="hover:underline">
              Terms
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
