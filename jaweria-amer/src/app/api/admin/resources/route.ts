import { getSession } from "@/lib/admin/auth";
import { getResources } from "@/lib/admin/store";

export async function GET() {
  const session = await getSession();
  if (!session.authenticated) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const resources = await getResources();
  return Response.json(resources);
}
