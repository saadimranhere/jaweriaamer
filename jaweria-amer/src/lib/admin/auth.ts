import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionSecret } from "@/lib/session-secret";

const SESSION_COOKIE = "ja_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

function generateToken(email: string): string {
  const secret = getSessionSecret();
  const payload = `${email}:${Date.now()}:${secret}`;
  return Buffer.from(payload).toString("base64");
}

function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const secret = getSessionSecret();
    return decoded.includes(secret);
  } catch {
    return false;
  }
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail || password !== adminPassword) {
    return { success: false, error: "Invalid credentials" };
  }

  const token = generateToken(email);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return { success: true };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<{ authenticated: boolean }> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return { authenticated: false };
  return { authenticated: verifyToken(token) };
}

export async function requireAuth(): Promise<void> {
  const session = await getSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }
}
