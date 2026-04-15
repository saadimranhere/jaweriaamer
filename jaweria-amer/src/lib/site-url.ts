/**
 * Canonical site URL for metadata (Open Graph, etc.).
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.example.com).
 */
export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      return new URL(raw.endsWith("/") ? raw.slice(0, -1) : raw);
    } catch {
      // fall through
    }
  }
  return new URL("http://localhost:3000");
}
