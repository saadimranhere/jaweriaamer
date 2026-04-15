import type { Metadata } from "next";
import { requireAuth } from "@/lib/admin/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-64">
        <AdminTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
