import { getSession } from "@/lib/admin/auth";
import { getSettings } from "@/lib/admin/store";

export async function GET() {
  const session = await getSession();
  if (!session.authenticated) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = await getSettings();
  return Response.json(settings);
}
