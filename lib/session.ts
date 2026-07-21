import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type TypeSessionPayload = {
  userId: string;
  username: string;
  expiresAt: Date;
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: TypeSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as TypeSessionPayload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(userId: string, username: string) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 day
  //   const expiresAt = new Date(Date.now() + 5 * 1000); // 5 seconds
  const session = await encrypt({ userId, username, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("userId", userId);
  cookieStore.set("username", username);

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
  });

  cookieStore.set("userId", userId, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
  });

  cookieStore.set("username", username, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  //   const expiresAt = new Date(Date.now() + 5 * 1000); // 5 seconds
  const cookieStore = await cookies();

  cookieStore.set("userId", String(payload.userId));
  cookieStore.set("username", String(payload.username));

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
  });

  cookieStore.set("userId", payload.userId, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
  });

  cookieStore.set("username", payload.username, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  cookieStore.delete("userId");
  cookieStore.delete("username");
}
