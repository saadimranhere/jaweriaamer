/** Admin session cookie secret; required in production. */
export function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET?.trim();
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "SESSION_SECRET must be set in production. Add a long random string in your hosting provider's environment variables."
    );
  }
  return "jaweria-amer-dev-session-secret";
}
