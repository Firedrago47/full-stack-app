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

export default function DriverRegisterPage() {
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
      role: "DRIVER",
      licenseNumber: "",
      vehicleNumber: "",
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

    router.push("/driver/auth/login");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* LEFT HERO */}
      <div className="hidden lg:flex flex-col rounded-r-4xl justify-between bg-gradient-to-br from-yellow-500 to-orange-600 text-white w-1/2 p-12">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Become a Delivery Partner
          </h1>
          <p className="mt-4 text-lg text-yellow-100 max-w-md">
            Earn big with every trip. Work at your convenience.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold">Quick Onboarding</h3>
            <p className="text-sm text-yellow-100">
              Start delivering within hours.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold">Boost Earnings</h3>
            <p className="text-sm text-yellow-100">
              Get incentives, bonuses & fuel reimbursements.
            </p>
          </div>
        </div>

        <p className="opacity-70 text-sm">© 2025 Driver Portal</p>
      </div>

      {/* RIGHT FORM */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <AuthCard title="Driver Registration">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label className="font-semibold mb-2">Name</Label>
                <Input placeholder="Enter the Name"{...form.register("name")} />
              </div>

              <div>
                <Label className="font-semibold mb-2">Phone</Label>
                <Input placeholder="Enter the Phone Number" {...form.register("phone")} />
              </div>

              <div>
                <Label className="font-semibold mb-2">Email</Label>
                <Input type="email" placeholder="Enter the Email"{...form.register("email")} />
              </div>

              <div>
                <Label className="font-semibold mb-2">Password</Label>
                <Input type="password" placeholder="Enter the Password"{...form.register("password")} />
              </div>

              <div>
                <Label className="font-semibold mb-2">License Number</Label>
                <Input placeholder="Enter the License Number"{...form.register("licenseNumber")} />
              </div>

              <div>
                <Label className="font-semibold mb-2">Vehicle Number</Label>
                <Input placeholder="Enter the Vehicle Number"{...form.register("vehicleNumber")} />
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
                  href="/driver/login"
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
