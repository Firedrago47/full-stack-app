import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";

export function normalizePhone(raw?: string, defaultCountry: CountryCode = "IN"): string | null {
  if (!raw) return null;
  const value = raw.trim();
  const pn = parsePhoneNumberFromString(value, defaultCountry);
  if (!pn || !pn.isValid()) return null;
  return pn.number; // E.164 e.g. +911234567890
}
