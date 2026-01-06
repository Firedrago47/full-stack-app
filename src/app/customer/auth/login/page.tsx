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
import { Spinner } from "@/components/ui/spinner";

export default function CustomerLoginPage() {
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

      if (json.user?.role !== "CUSTOMER") {
        setServerError("This login is only for customers.");
        setLoading(false);
        return;
      }

      router.push("/customer/dashboard/");
    } catch (err) {
      console.error("Login error:", err);
      setServerError("Unexpected server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* LEFT HERO */}
      <div className="hidden lg:flex flex-col rounded-r-4xl justify-between bg-gradient-to-br from-blue-600 to-indigo-700 text-white w-1/2 p-12">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Welcome Back,
            <br />
            Start Exploring!
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-md">
            Shop groceries, food, essentials and more. Fast delivery to your
            door.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold">Lightning Fast Delivery</h3>
            <p className="text-sm text-blue-100">
              Under 10 minutes in most areas.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold">Exclusive Offers</h3>
            <p className="text-sm text-blue-100">Enjoy discounts every day.</p>
          </div>
        </div>

        <p className="opacity-70 text-sm">© 2025 Customer Portal</p>
      </div>

      {/* RIGHT AUTH FORM */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <AuthCard title="Login">
            <form onSubmit={handleSubmit(onSubmit)} className="p-2 space-y-4">
              <div>
                <Label className="mb-2 font-bold">Email or Phone</Label>
                <Input type="text" {...register("identifier")} />
              </div>

              <div>
                <Label className="mb-2 font-bold">Password</Label>
                <Input type="password" {...register("password")} />
              </div>

              {serverError && (
                <p className="text-red-500 text-sm">{serverError}</p>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="h-4 w-4" />
                    Logging in…
                  </span>
                ) : (
                  "Login"
                )}
              </Button>

              <p className="mb-2 text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <a
                  href="/customer/auth/register"
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
