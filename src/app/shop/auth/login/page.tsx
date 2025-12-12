"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema, LoginInput } from "@/lib/validation/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ShopLoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setServerError(json.error ?? "Invalid credentials");
        setLoading(false);
        return;
      }

      if (json.user?.role !== "SHOP_OWNER") {
        setServerError("This login is only for shop owners.");
        setLoading(false);
        return;
      }

      router.push("/shop/dashboard/");
    } catch (err) {
      console.error("Shop login error:", err);
      setServerError("Unexpected server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* LEFT HERO */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br rounded-r-4xl from-emerald-500 to-green-600 text-white w-1/2 p-12">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Welcome Back,
            <br />
            Shop Owner
          </h1>
          <p className="mt-4 text-lg text-emerald-100 max-w-md">
            Manage your incoming orders, stock, offers, and delivery operations.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold">Boost Sales</h3>
            <p className="text-sm text-emerald-100">
              Grow with online visibility and promotions.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold">Real-Time Analytics</h3>
            <p className="text-sm text-emerald-100">
              Track sales, customers, and trends instantly.
            </p>
          </div>
        </div>

        <p className="opacity-70 text-sm">© 2025 Shop Portal</p>
      </div>

      {/* RIGHT FORM */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <AuthCard title="Login">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label className="mb-2 font-bold">Email or Phone</Label>
                <Input
                  type="text"
                  placeholder="Phone or Email"
                  {...register("identifier")}
                />
              </div>

              <div>
                <Label className="mb-2 font-bold">Password</Label>
                <Input
                  type="password"
                  placeholder="•••••••••"
                  {...register("password")}
                />
              </div>

              {serverError && (
                <p className="text-red-500 text-sm">{serverError}</p>
              )}

              <Button
                type="submit"
                className="w-full font-semibold"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <a
                  href="/shop/auth/register"
                  className="text-blue-600 underline"
                >
                  Register
                </a>
              </p>
            </form>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
