import jwt, { JwtPayload } from "jsonwebtoken";

function getJwtSecret(): string {
  const key = process.env.JWT_SECRET;
  if (!key) {
    // Throw when we actually need the secret at runtime (clear message)
    throw new Error("JWT_SECRET is missing from environment at runtime");
  }
  return key;
}

export interface JWTPayload extends JwtPayload {
  sub: string; // user ID
  role: "CUSTOMER" | "DRIVER" | "SHOP_OWNER" | "ADMIN";
}

/** Sign a JWT with HS256, expires in 7 days. Throws if JWT_SECRET missing. */
export function signJwt(payload: JWTPayload): string {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
}

/** Verify a JWT and return the JWTPayload or null if invalid. Throws if JWT_SECRET missing. */
export function verifyJwt(token: string): JWTPayload | null {
  const secret = getJwtSecret();
  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") return null;

    // runtime validation: ensure required fields exist
    if (!decoded.sub || !decoded.role) return null;

    return decoded as JWTPayload;
  } catch {
    return null;
  }
}
