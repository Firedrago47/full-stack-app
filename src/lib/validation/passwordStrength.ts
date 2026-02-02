// lib/utils/password-strength.ts
export function getPasswordStrength(password: string) {
  let score = 0;
  let uc = false;
  let lc = false;
  let num = false;
  let sym = false;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) {
    score++
    uc = true;};
  if (/[a-z]/.test(password)) {
    score++;
    lc = true;
  }
  if (/[0-9]/.test(password)) {
    score++;
    num = true;
  }
  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
    sym = true;
  }

  if (score <= 2) return { score, label: "Weak", color: "bg-red-500", uc, lc, num, sym };
  if (score <= 4) return { score, label: "Medium", color: "bg-yellow-500", uc, lc, num, sym };
  return { score, label: "Strong", color: "bg-green-500", uc, lc, num, sym };
}
