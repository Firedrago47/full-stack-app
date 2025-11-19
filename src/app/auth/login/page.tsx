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

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
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
        // credentials: "include" // uncomment if you later rely on cookies cross-origin
      });

      // Always attempt to parse JSON (catch non-JSON)
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
        // If server returned detailed zod errors, flatten them or show message
        const msg =
          json?.error?.message ||
          (json?.error?.formErrors ? JSON.stringify(json.error.formErrors) : json?.error) ||
          "Invalid credentials";
        setServerError(msg);
        setLoading(false);
        return;
      }

      // Expect server to return user object on success
      const returnedUser = json.user;
      if (!returnedUser?.role) {
        // If server didn't return user, show error and optionally request /me
        console.warn("Login succeeded but server didn't return user. Response:", json);
        setServerError("Login succeeded but could not determine user role");
        setLoading(false);
        return;
      }

      // Determine path and redirect
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
          <Label>Email</Label>
          <Input type="email" {...register("email")} />
        </div>

        <div>
          <Label>Password</Label>
          <Input type="password" {...register("password")} />
        </div>

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
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
