const COOKIE_NAME = "dream_staff_session";

type SessionPayload = {
  email: string;
  exp: number;
};

function getSecret(): string {
  const secret = process.env.STAFF_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("STAFF_SESSION_SECRET must be set (min 16 characters).");
  }
  return secret;
}

async function sign(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Buffer.from(signature).toString("base64url");
}

export async function createSessionToken(
  email: string,
  ttlMs = 7 * 24 * 60 * 60 * 1000,
): Promise<string> {
  const payload: SessionPayload = {
    email,
    exp: Date.now() + ttlMs,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = await sign(payloadB64);
  return `${payloadB64}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;

  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  try {
    const expected = await sign(payloadB64);
    if (signature.length !== expected.length) return null;

    let mismatch = 0;
    for (let i = 0; i < signature.length; i++) {
      mismatch |= signature.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    if (mismatch !== 0) return null;

    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8"),
    ) as SessionPayload;

    if (!payload.email || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export const staffSessionCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  },
};
