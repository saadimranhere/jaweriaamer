import Link from "next/link";
import { Clock, CalendarDays, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/lib/data";

const categoryColors: Record<string, string> = {
  "o-level": "bg-crimson/10 text-crimson",
  "a-level": "bg-rose/15 text-rose-dark",
  literature: "bg-brand-soft/90 text-brand",
  "creative-writing": "bg-crimson-light/10 text-crimson-light",
};

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="group border border-border/60 bg-white hover:border-brand/25 hover:shadow-lg motion-reduce:hover:translate-y-0 overflow-hidden">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <Badge
            variant="secondary"
            className={categoryColors[course.category] || "bg-muted text-muted-foreground"}
          >
            {course.categoryLabel}
          </Badge>
          <span className="text-lg font-serif font-semibold text-crimson">
            {course.price}
          </span>
        </div>

        <h3 className="font-serif text-xl font-semibold text-crimson mb-1">
          {course.title}
        </h3>
        <p className="text-xs text-slate-light mb-3">{course.subtitle}</p>

        <p className="text-sm text-slate leading-relaxed mb-5 flex-1">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-light mb-5">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            {course.schedule}
          </span>
        </div>

        <Link
          href={`/courses/${course.id}`}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-crimson py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-rose group-hover:shadow-md"
        >
          View Syllabus
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
