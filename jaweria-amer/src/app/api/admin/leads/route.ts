import { getSession } from "@/lib/admin/auth";
import { getLeads } from "@/lib/admin/store";

export async function GET() {
  const session = await getSession();
  if (!session.authenticated) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const leads = await getLeads();
  return Response.json(leads);
}
