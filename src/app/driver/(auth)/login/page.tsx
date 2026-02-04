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
import { PasswordInput } from "@/components/auth/password-input";

export default function DriverLoginPage() {
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

      // Must be driver
      if (json.user?.role !== "DRIVER") {
        setServerError("This login is only for drivers.");
        setLoading(false);
        return;
      }

      router.push("/driver/dashboard/");
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
      <div className="hidden lg:flex flex-col rounded-r-4xl justify-between bg-gradient-to-br from-yellow-500 to-orange-600 text-white w-1/2 p-12">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Welcome Back,
            <br />
            Delivery Partner
          </h1>
          <p className="mt-4 text-lg text-yellow-100 max-w-md">
            Earn more, deliver faster, and enjoy flexible timings.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold">Flexible Hours</h3>
            <p className="text-sm text-yellow-100">
              Work whenever you want — your schedule is yours.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold">Fast Payouts</h3>
            <p className="text-sm text-yellow-100">
              Daily or weekly—choose the payout cycle that works for you.
            </p>
          </div>
        </div>

        <p className="opacity-70 text-sm">© 2025 Driver Portal</p>
      </div>

      {/* RIGHT FORM */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <AuthCard title="Driver Login">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label className="mb-2 font-bold">Email or Phone</Label>
                <Input
                  type="text"
                  placeholder="Enter the Email or Phone"
                  {...register("identifier")}
                />
              </div>

              <div>
                <Label className="mb-2 font-bold">Password</Label>
                <PasswordInput
                  placeholder="Enter the Password"
                  {...register("password")}
                />
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

              <p className="mb-4 text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <a
                  href="/driver/register"
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
