import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./input";

export function PasswordInput({ register }: { register: ReturnType<typeof useForm>["register"] }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Input type={visible ? "text" : "password"} {...register("password")} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-2 top-2 text-sm text-muted-foreground"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}
