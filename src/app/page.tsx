"use client";
import Image from 'next/image';
import HERO_IMAGE from 'public/images/chainsawman.jpg'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-slate-900">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">F</div>
          <div className="font-semibold text-lg">Full-Stack Delivery</div>
        </div>
        <nav className="flex items-center gap-4">
          <a href="/customer" className="text-sm text-slate-700 hover:text-slate-900">For Customers</a>
          <a href="/driver" className="text-sm text-slate-700 hover:text-slate-900">For Drivers</a>
          <a href="/shop" className="text-sm text-slate-700 hover:text-slate-900">For Shops</a>
          <a href="/customer/auth/login" className="ml-4 inline-flex items-center px-4 py-2 rounded-md bg-slate-900 text-white text-sm hover:opacity-90">Login</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <section className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Fast local delivery for every need — <span className="text-blue-600">shops, groceries, and rides</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl">
            Combine a powerful instant-delivery marketplace with driver routing and shop management. Built for scale, designed for simplicity.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/auth/register"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Get Started
            </a>

            <a
              href="/docs"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-slate-200 text-sm text-slate-700 hover:bg-slate-100"
            >
              View Docs
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <div className="text-2xl font-semibold">24k+</div>
              <div className="text-sm text-slate-500">Deliveries/month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">1.8k</div>
              <div className="text-sm text-slate-500">Active drivers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">3.2k</div>
              <div className="text-sm text-slate-500">Shops onboarded</div>
            </div>
          </div>
        </section>

        <aside className="hidden lg:block">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={HERO_IMAGE}
              alt="App preview"
              className="w-full h-full object-cover block"
            />
          </div>
        </aside>
      </main>

      <section className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold">For Customers</h3>
            <p className="text-sm text-slate-600">Order from nearby stores and track deliveries in real-time.</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">For Drivers</h3>
            <p className="text-sm text-slate-600">Accept rides & deliveries, view earnings, and manage availability.</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">For Shops</h3>
            <p className="text-sm text-slate-600">Manage products, set availability, and receive orders instantly.</p>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-8 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} Devsync Delivery</div>
          <div className="flex items-center gap-4">
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
