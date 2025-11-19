import jwt, { JwtPayload } from "jsonwebtoken";

// Ensures TS knows this is ALWAYS a valid secret
export const JWT_SECRET: string = (() => {
  const key = process.env.JWT_SECRET;
  if (!key) throw new Error("JWT_SECRET is missing in environment");
  return key;
})();

export interface JWTPayload extends JwtPayload {
  sub: string; // user ID
  role: "CUSTOMER" | "DRIVER" | "SHOP_OWNER" | "ADMIN";
}

// ---------- SIGN ----------
export function signJwt(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
}

// ---------- VERIFY ----------
export function verifyJwt(token: string): JWTPayload | null {
  try {
    // jwt.verify returns: string | JwtPayload
    const decoded = jwt.verify(token, JWT_SECRET);

    // Force type-narrowing safely
    if (typeof decoded === "string") return null;

    // Check required fields at runtime:
    if (!decoded.sub || !decoded.role) return null;

    return decoded as JWTPayload;
  } catch {
    return null;
  }
}
