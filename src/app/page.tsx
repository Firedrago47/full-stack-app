"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Truck,
  Store,
  Bike,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 text-slate-900">
      {/* ================= HEADER ================= */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            D
          </div>
          <div className="font-semibold text-lg">Devsync Delivery</div>
        </div>

        <nav className="flex items-center gap-5">
          <Link href="/driver" className="text-sm hover:underline">
            For Drivers
          </Link>
          <Link href="/shop" className="text-sm hover:underline">
            For Shops
          </Link>
          <Link href="/customer/login">
            <Button size="sm">Login</Button>
          </Link>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto mt-15 px-6 pt-16 pb-24 text-center">
        <Badge className="mb-4">All-in-One Local Commerce Platform</Badge>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Food, Groceries & Rides —
          <span className="text-primary block mt-2">
            Everything delivered fast.
          </span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
          One platform to order food, groceries, essentials, or book rides.
          Built for customers, drivers, and local shops.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/customer/register">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/customer/login">
            <Button size="lg" variant="outline" className="px-8">
              Login
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto mt-20 px-6 pb-24">
        <h2 className="text-3xl font-bold mb-6 text-center">
          What can you do?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Groceries",
              img: "/images/cat-groceries.png",
              href: "/customer?category=groceries",
            },
            {
              title: "Food Delivery",
              img: "/images/cat-food.png",
              href: "/customer?category=food",
            },
            {
              title: "Rides & Taxi",
              img: "/images/cat-taxi.png",
              href: "/customer?category=taxi",
            },
          ].map((c) => (
            <Link key={c.title} href={c.href}>
              <Card className="group overflow-hidden hover:shadow-xl transition cursor-pointer">
                <div className="relative h-44 px-25 py-3 justify-center items-center">
                  <Image
                    src={c.img}
                    alt={c.title}
                    height={200}
                    width={200}
                    className=" group-hover:scale-105 transition duration-500"
                  />
                </div>
                <CardContent className="p-4 flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{c.title}</h3>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= WHO IS IT FOR ================= */}
      <section className="bg-white border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built for everyone
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RoleCard
              icon={<Truck />}
              title="Customers"
              desc="Order food, groceries, essentials, or book rides — all from one app."
            />
            <RoleCard
              icon={<Bike />}
              title="Drivers"
              desc="Accept nearby ride & delivery requests and earn consistently."
            />
            <RoleCard
              icon={<Store />}
              title="Shop Owners"
              desc="List your shop, manage items, and receive online orders."
            />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Step
              icon={<MapPin />}
              title="Choose Service"
              desc="Select food, grocery, or ride."
            />
            <Step
              icon={<Clock />}
              title="Real-time Tracking"
              desc="Track orders and rides live."
            />
            <Step
              icon={<ShieldCheck />}
              title="Safe & Reliable"
              desc="Verified drivers & secure payments."
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Ready to get started?
          </h2>
          <p className="mt-4 text-primary-foreground/90">
            Join as a customer, driver, or shop today.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/customer/register">
              <Button size="lg" variant="secondary" className="hover:scale-102 cursor-pointer">
                Join as Customer
              </Button>
            </Link>
            <Link href="/driver/register">
              <Button size="lg" className="border cursor-pointer hover:scale-102">
                Join as Driver
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="max-w-7xl mx-auto px-6 py-8 text-sm text-muted-foreground">
        <Separator className="mb-6" />
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} Devsync</div>
          <div className="flex gap-4">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function RoleCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="text-center">
      <CardContent className="p-6 space-y-4">
        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}

function Step({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="space-y-3">
      <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
