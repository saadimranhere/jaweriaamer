"use client";

import { useState } from "react";
import { courses } from "@/lib/data";
import { CourseCard } from "@/components/course-card";
import { cn } from "@/lib/utils";

const categories = [
  { value: "all", label: "All Programmes" },
  { value: "o-level", label: "O Level" },
  { value: "a-level", label: "A Level" },
  { value: "literature", label: "Literature" },
  { value: "creative-writing", label: "Creative Writing" },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <>
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Programmes
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Course Directory
          </h1>
          <p className="text-white/60 max-w-xl leading-relaxed">
            Structured programmes for Cambridge O Level, A Level, Literature,
            and Creative Writing. Each course is rubric-aligned and
            feedback-driven.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeCategory === cat.value
                    ? "bg-navy text-white"
                    : "bg-white text-slate hover:bg-navy/5 border border-border/60"
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
