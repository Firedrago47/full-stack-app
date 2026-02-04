"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema, RegisterInput } from "@/lib/validation/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { fa } from "zod/v4/locales";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrength } from "@/components/auth/password-strength";

export default function ShopRegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      role: "SHOP_OWNER",
      shopName: "",
      shopAddress: "",
    },
  });
  const password = form.watch("password");

  const onSubmit = async (data: RegisterInput) => {
    setServerError("");
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      setServerError(err.error ?? "Registration failed");
      setLoading(false);
      return;
    }

    router.push("/shop/login");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* LEFT SIDE — Hero section */}
      <div className="hidden lg:flex flex-col justify-between rounded-r-4xl bg-gradient-to-br from-green-600 to-emerald-700 text-white w-1/2 p-12">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Empower Your
            <br />
            Local Business
          </h1>
          <p className="mt-4 text-lg text-green-100 max-w-md">
            Join thousands of shop owners who grow their business every day
            using our platform.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold">Easy Product Management</h3>
            <p className="text-sm text-green-100">
              Add, update, and track your inventory instantly.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold">Secure Payments</h3>
            <p className="text-sm text-green-100">
              Integrated payments with fast settlements.
            </p>
          </div>
        </div>

        <p className="opacity-70 text-sm">© 2025 Shop Partner Portal</p>
      </div>

      {/* RIGHT SIDE — Auth Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AuthCard title="Registration">
            {/* PLACE YOUR EXISTING REGISTER FORM HERE */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label className="font-semibold mb-2">Name</Label>
                <Input
                  placeholder="Enter the Name"
                  {...form.register("name")}
                />
              </div>

              <div>
                <Label className="font-semibold mb-2">Phone</Label>
                <Input
                  placeholder="Enter the Phone Number"
                  {...form.register("phone")}
                />
              </div>

              <div>
                <Label className="font-semibold mb-2">Email</Label>
                <Input
                  type="email"
                  placeholder="Enter the Email"
                  {...form.register("email")}
                />
              </div>

              <div>
                <Label className="mb-2 font-semibold">Password</Label>

                <PasswordInput
                  className="mb-2"
                  placeholder="Enter the Password"
                  {...form.register("password")}
                />

                <PasswordStrength password={password ?? ""} />
              </div>

              <div>
                <Label className="font-semibold mb-2">Shop Name</Label>
                <Input
                  placeholder="Enter the Shop Name"
                  {...form.register("shopName")}
                />
              </div>

              <div>
                <Label className="font-semibold mb-2">Shop Address</Label>
                <Input
                  placeholder="Enter the Address"
                  {...form.register("shopAddress")}
                />
              </div>

              {serverError && <p className="text-red-500">{serverError}</p>}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="h-4 w-4" />
                    Signing up…
                  </span>
                ) : (
                  "Login"
                )}
              </Button>

              <p className="mb-2 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a href="/shop/login" className="text-blue-600 underline">
                  Login
                </a>
              </p>
            </form>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
