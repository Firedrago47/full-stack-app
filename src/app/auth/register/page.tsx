"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema, RegisterInput, Role} from "@/lib/validation/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    },
  });

  const role = form.watch("role");

  const onSubmit = async (data: RegisterInput) => {
    setServerError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      setServerError(err.error ?? "Registration failed");
      return;
    }

    router.push("/auth/login");
  };

  return (
    <AuthCard title="Create Account">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input {...form.register("name")} placeholder="John Doe" />
        </div>

        <div>
          <Label>Email</Label>
          <Input type="email" {...form.register("email")} placeholder="email@example.com" />
        </div>

        <div>
          <Label>Password</Label>
          <Input type="password" {...form.register("password")} />
        </div>

        <div>
          <Label>Role</Label>
          <Select
            onValueChange={(value) => form.setValue("role", value as Role)}
            defaultValue={form.getValues("role")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CUSTOMER">Customer</SelectItem>
              <SelectItem value="DRIVER">Driver</SelectItem>
              <SelectItem value="SHOP_OWNER">Shop Owner</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {role === "DRIVER" && (
          <>
            <div>
              <Label>License Number</Label>
              <Input {...form.register("licenseNumber")} />
            </div>

            <div>
              <Label>Vehicle Number</Label>
              <Input {...form.register("vehicleNumber")} />
            </div>
          </>
        )}

        {role === "SHOP_OWNER" && (
          <>
            <div>
              <Label>Shop Name</Label>
              <Input {...form.register("shopName")} />
            </div>

            <div>
              <Label>Shop Address</Label>
              <Input {...form.register("shopAddress")} />
            </div>
          </>
        )}

        {serverError && (
          <p className="text-red-500 text-sm">{serverError}</p>
        )}

        <Button className="w-full" type="submit">
          Sign Up
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </form>
    </AuthCard>
  );
}
