import Link from "next/link";
import { Clock, CalendarDays, ArrowRight, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/lib/data";
import { getPublicCoursePriceLabel } from "@/lib/pricing-display";
import { whatsAppUrl } from "@/lib/contact";

const categoryColors: Record<string, string> = {
  "o-level": "border-crimson/15 bg-crimson/8 text-crimson",
  "a-level": "border-rose/20 bg-rose/10 text-rose-dark",
  literature: "border-border bg-brand-soft/80 text-brand",
  "creative-writing": "border-border bg-muted text-ink-muted",
};

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="group overflow-hidden border-border/70 motion-reduce:hover:translate-y-0">
      <CardContent className="flex h-full flex-col p-6 sm:p-7">
        <div className="mb-5 flex items-start justify-between gap-3">
          <Badge
            variant="outline"
            className={categoryColors[course.category] ?? "border-border bg-muted/50 text-muted-foreground"}
          >
            {course.categoryLabel}
          </Badge>
          <span className="max-w-[14rem] shrink-0 text-right text-xs font-medium leading-snug text-slate sm:max-w-[15rem] sm:text-sm">
            {getPublicCoursePriceLabel(course)}
          </span>
        </div>

        <h3 className="mb-1.5 font-serif text-lg font-semibold leading-snug text-ink sm:text-xl">{course.title}</h3>
        <p className="mb-3 text-xs leading-snug text-slate-light">{course.subtitle}</p>

        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate">{course.description}</p>

        <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-light">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
            {course.schedule}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={whatsAppUrl(`Hi, I'm interested in the ${course.title} programme.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground shadow-[0_1px_2px_rgba(34,16,18,0.08)] transition-all hover:bg-brand-accent hover:shadow-[0_4px_14px_rgba(112,20,20,0.18)]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Enquire on WhatsApp
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href={`/courses/${course.id}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white py-3 text-sm font-medium text-ink transition-colors hover:border-border hover:bg-muted/40"
          >
            View syllabus
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
