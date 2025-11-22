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
// import { PasswordInput } from "@/components/ui/PasswordInput"; // optional, see below

export default function LoginPage() {
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
      console.log("Submitting login", data);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let json: any;
      try {
        json = await res.json();
      } catch (err) {
        console.error("Failed to parse login response as JSON", err);
        setServerError("Unexpected server response");
        setLoading(false);
        return;
      }

      console.log("Login response", res.status, json);

      if (!res.ok) {
        const msg =
          json?.error?.message ||
          (json?.error?.formErrors ? JSON.stringify(json.error.formErrors) : json?.error) ||
          "Invalid credentials";
        setServerError(msg);
        setLoading(false);
        return;
      }

      const returnedUser = json.user;
      if (!returnedUser?.role) {
        console.warn("Login succeeded but server didn't return user. Response:", json);
        setServerError("Login succeeded but could not determine user role");
        setLoading(false);
        return;
      }

      const role = returnedUser.role as "CUSTOMER" | "DRIVER" | "SHOP_OWNER" | "ADMIN";
      const path =
        role === "CUSTOMER"
          ? "/dashboard/customer"
          : role === "DRIVER"
          ? "/dashboard/driver"
          : role === "SHOP_OWNER"
          ? "/dashboard/shop"
          : "/dashboard/admin";

      router.push(path);
    } catch (err) {
      console.error("Login submit failed", err);
      setServerError("Network or unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label className="mb-2 font-bold">Phone or Email</Label>
          <Input
            type="text"
            placeholder="Phone number or Email"
            {...register("identifier")}
          />
        </div>

        <div>
          <Label className="mb-2 font-bold">Password</Label>
          {/* Using plain Input to avoid prop contract mismatch */}
          <Input type="password" placeholder="****" {...register("password")} />
        </div>

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

        <Button type="submit" className="w-full font-semibold" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-blue-600 underline">
            Sign Up
          </a>
        </p>
      </form>
    </AuthCard>
  );
}
