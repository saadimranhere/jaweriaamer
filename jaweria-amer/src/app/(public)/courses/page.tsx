"use client";

import { useState } from "react";
import { courses } from "@/lib/data";
import { CourseCard } from "@/components/course-card";
import { cn } from "@/lib/utils";
import {
  listMarketingCourses,
  MARKETING_COURSE_FILTER_CHIPS,
  type MarketingCourseFilterValue,
} from "@/lib/course-offerings";

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState<MarketingCourseFilterValue>("all");

  const marketingCourses = listMarketingCourses(courses);

  const filtered =
    activeCategory === "all"
      ? marketingCourses
      : marketingCourses.filter((c) => c.category === activeCategory);

  return (
    <>
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-crimson">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-rose text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Programmes
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Course Directory
          </h1>
          <p className="text-white/60 max-w-xl leading-relaxed">
            Structured programmes for Cambridge O Level, Literature, and Creative Writing. Each course is
            rubric-aligned and feedback-driven.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            {MARKETING_COURSE_FILTER_CHIPS.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeCategory === cat.value
                    ? "bg-crimson text-white"
                    : "bg-white text-slate hover:bg-crimson/5 border border-border/60"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-slate py-16">
              No courses found in this category.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
