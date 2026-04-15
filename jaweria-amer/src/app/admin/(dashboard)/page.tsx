import { BookOpen, FolderOpen, Users, TrendingUp } from "lucide-react";
import { getCourses, getResources, getLeads } from "@/lib/admin/store";
import Link from "next/link";

export default async function AdminDashboard() {
  const [courses, resources, leads] = await Promise.all([
    getCourses(),
    getResources(),
    getLeads(),
  ]);

  const newLeads = leads.filter((l) => l.status === "new").length;
  const activeCourses = courses.filter((c) => c.status === "active").length;

  const stats = [
    { label: "Total Courses", value: courses.length, icon: BookOpen, href: "/admin/courses", color: "bg-brand-soft text-brand" },
    { label: "Active Courses", value: activeCourses, icon: TrendingUp, href: "/admin/courses", color: "bg-cream-dark text-navy" },
    { label: "Resources", value: resources.length, icon: FolderOpen, href: "/admin/resources", color: "bg-brand-soft/70 text-brand" },
    { label: "New Leads", value: newLeads, icon: Users, href: "/admin/leads", color: "bg-brand-soft text-brand-accent" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-sm text-slate mt-1">Welcome back, Jaweria. Here&apos;s your overview.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl border border-border/60 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="font-serif text-2xl font-bold text-navy">{stat.value}</p>
            <p className="text-xs text-slate mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border/60 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-semibold text-navy mb-4">Recent Leads</h2>
          {leads.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-8 h-8 text-slate-light/50 mx-auto mb-2" />
              <p className="text-sm text-slate-light">No inquiries yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-navy">{lead.name}</p>
                    <p className="text-xs text-slate-light">{lead.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    lead.status === "new" ? "bg-brand-soft text-brand" :
                    lead.status === "contacted" ? "bg-amber-50 text-amber-700" :
                    "bg-green-50 text-green-700"
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border/60 bg-white p-5 shadow-sm">
          <h2 className="font-serif text-lg font-semibold text-navy mb-4">Courses Overview</h2>
          {courses.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-8 h-8 text-slate-light/50 mx-auto mb-2" />
              <p className="text-sm text-slate-light">No courses created yet</p>
              <Link href="/admin/courses" className="mt-1 inline-block text-xs text-brand transition-colors hover:text-brand-accent">
                Create your first course
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {courses.slice(0, 5).map((course) => (
                <div key={course.id} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-navy">{course.title}</p>
                    <p className="text-xs text-slate-light">{course.level}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    course.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {course.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
