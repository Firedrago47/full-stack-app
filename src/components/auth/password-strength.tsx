import { getPasswordStrength } from "@/lib/validation/passwordStrength";
import { Check, X } from "lucide-react";

export function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const { score, label, color, uc, lc, num, sym } =
    getPasswordStrength(password);

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${color}`}
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>

      {/* Label */}
      <p
        className={`text-sm font-medium ${
          label === "Weak"
            ? "text-red-600"
            : label === "Medium"
            ? "text-yellow-600"
            : "text-green-600"
        }`}
      >
        Password strength: {label}
      </p>

      {/* Rule checklist */}
      <ul className="text-xs space-y-1">
        <Rule ok={password.length >= 8} text="At least 8 characters" />
        <Rule ok={uc} text="Uppercase letter (A–Z)" />
        <Rule ok={lc} text="Lowercase letter (a–z)" />
        <Rule ok={num} text="Number (0–9)" />
        <Rule ok={sym} text="Special character (!@#$)" />
      </ul>
    </div>
  );
}

function Rule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <li
      className={`flex items-center gap-2 ${
        ok ? "text-green-600" : "text-muted-foreground"
      }`}
    >
      {ok ? <Check size={14} /> : <X size={14} />}
      {text}
    </li>
  );
}
