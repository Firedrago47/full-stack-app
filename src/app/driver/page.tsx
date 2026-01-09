"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Clock, DollarSign, ShieldCheck } from "lucide-react";

export default function DriverLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">

      {/* -------------------- HERO SECTION -------------------- */}
      <section className="min-h-screen px-6 md:px-16 pt-24 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* TEXT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Earn More. <br /> Drive on Your Schedule.
          </h1>

          <p className="mt-4 text-lg text-muted-foreground max-w-md">
            Become a driver or delivery partner. Work when you want. Earn instantly. 
            Join thousands who trust QuickGo.
          </p>

          <div className="mt-6 flex gap-4">
            <Button size="lg" className="px-8" onClick={() => window.location.href = "/driver/register"}>
              Start Driving
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8"
              onClick={() => window.location.href = "/driver/login"}
            >
              Login
            </Button>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="relative h-80 md:h-[420px] w-full">
          <Image
            src="/images/driver-hero.jpg"
            alt="Driver"
            fill
            className="object-cover rounded-2xl shadow-xl"
            priority
          />
        </div>
      </section>


      {/* -------------------- BENEFITS -------------------- */}
      <section className="px-6 md:px-16 pb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Drive with QuickGo?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <DollarSign className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Earn More</h3>
            <p className="text-muted-foreground mt-2">
              Transparent fares, bonuses, and high-demand earnings every day.
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <Clock className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Your Schedule</h3>
            <p className="text-muted-foreground mt-2">
              Drive anytime you want. Full-time, part-time, or weekends only.
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Safe & Secure</h3>
            <p className="text-muted-foreground mt-2">
              Live support, safety features, insurance coverage options.
            </p>
          </div>

        </div>

        {/* CTA SECTION */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="px-10 py-6 text-lg"
            onClick={() => window.location.href = "/driver/register"}
          >
            Become a Driver Today
          </Button>
        </div>
      </section>

    </div>
  );
}
