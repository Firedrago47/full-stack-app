"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema, RegisterInput } from "@/lib/validation/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

export default function CustomerRegisterPage() {
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
      role: "CUSTOMER",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setServerError("");
    setLoading(true);
    const res = await fetch("/api/auth/register/", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      setServerError(err.error ?? "Registration failed");
      setLoading(false);
      return;
    }

    router.push("/customer/login");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* LEFT HERO */}
      <div className="hidden lg:flex flex-col rounded-r-4xl justify-between bg-gradient-to-br from-blue-600 to-indigo-700 text-white w-1/2 p-12">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Create Your Account
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-md">
            Join millions of customers enjoying fast delivery and exclusive
            rewards.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold">Secure & Simple</h3>
            <p className="text-sm text-blue-100">
              Your data is safe and protected.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold">Personalized Experience</h3>
            <p className="text-sm text-blue-100">
              Get suggestions based on your shopping habits.
            </p>
          </div>
        </div>

        <p className="opacity-70 text-sm">© 2025 Customer Portal</p>
      </div>

      {/* RIGHT AUTH FORM */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <AuthCard title="Create Account">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1">
              <div>
                <Label className="mb-2 font-semibold ">Name</Label>
                <Input placeholder="Enter the Name" {...form.register("name")} />
              </div>

              <div>
                <Label className="mb-2 font-semibold">Phone</Label>
                <Input placeholder="Enter the Phone Number" {...form.register("phone")} />
              </div>

              <div>
                <Label className="mb-2 font-semibold ">Email</Label>
                <Input type="email" placeholder="Enter the Email"{...form.register("email")} />
              </div>

              <div>
                <Label className="mb-2 font-semibold ">Password</Label>
                <Input type="password" placeholder="Enter the Password" {...form.register("password")}/>
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
                <a
                  href="/customer/login"
                  className="text-blue-600 underline"
                >
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
