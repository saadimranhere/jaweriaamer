"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpen,
  ClipboardList,
  Eye,
  FileSearch,
  FolderOpen,
  LayoutGrid,
} from "lucide-react";
import {
  RESOURCE_HUB_CATEGORIES,
  resources,
  type Resource,
  type ResourceHubCategory,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryIcon: Record<ResourceHubCategory, typeof BookOpen> = {
  "general-notes": BookOpen,
  "topical-worksheets": LayoutGrid,
  "yearly-past-papers": FolderOpen,
  "examiner-reports": FileSearch,
  checklists: ClipboardList,
};

function uniqueSorted(values: string[]) {
  return [...new Set(values.map((v) => v.trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
}

const selectClass =
  "w-full rounded-xl border border-border/80 bg-white px-3 py-2.5 text-sm text-crimson shadow-sm focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35";

export function ResourcesHub() {
  const [category, setCategory] = useState<ResourceHubCategory | "all">("all");
  const [subject, setSubject] = useState("all");
  const [level, setLevel] = useState("all");
  const [paper, setPaper] = useState("all");
  const [year, setYear] = useState("all");

  function selectCategory(next: ResourceHubCategory | "all") {
    setCategory(next);
    setSubject("all");
    setLevel("all");
    setPaper("all");
    setYear("all");
  }

  const scoped = useMemo(
    () => (category === "all" ? resources : resources.filter((r) => r.category === category)),
    [category]
  );

  const subjectOptions = useMemo(() => uniqueSorted(scoped.map((r) => r.subject)), [scoped]);
  const levelOptions = useMemo(() => uniqueSorted(scoped.map((r) => r.level)), [scoped]);
  const paperOptions = useMemo(() => uniqueSorted(scoped.map((r) => r.paper)), [scoped]);
  const yearOptions = useMemo(() => uniqueSorted(scoped.map((r) => r.year)), [scoped]);

  const filtered = useMemo(() => {
    return scoped.filter((r) => {
      if (subject !== "all" && r.subject !== subject) return false;
      if (level !== "all" && r.level !== level) return false;
      if (paper !== "all" && r.paper !== paper) return false;
      if (year !== "all" && r.year !== year) return false;
      return true;
    });
  }, [scoped, subject, level, paper, year]);

  function resetFilters() {
    selectCategory("all");
  }

  return (
    <section className="bg-cream py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <button
            type="button"
            onClick={() => selectCategory("all")}
            className={cn(
              "rounded-xl border bg-white p-4 text-left shadow-sm transition-all hover:border-brand/30 hover:bg-brand-soft/40 hover:shadow-md",
              category === "all" ? "border-brand ring-2 ring-brand/25" : "border-border/70"
            )}
          >
            <p className="font-serif text-sm font-semibold text-crimson">All</p>
            <p className="mt-1 text-xs leading-snug text-slate">Browse the full vault.</p>
          </button>
          {RESOURCE_HUB_CATEGORIES.map((cat) => {
            const Icon = categoryIcon[cat.id];
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.id)}
                className={cn(
                  "rounded-xl border bg-white p-4 text-left shadow-sm transition-all hover:border-brand/30 hover:bg-brand-soft/40 hover:shadow-md",
                  active ? "border-brand ring-2 ring-brand/25" : "border-border/70"
                )}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="font-serif text-sm font-semibold text-crimson">{cat.label}</span>
                </div>
                <p className="text-xs leading-relaxed text-slate">{cat.blurb}</p>
              </button>
            );
          })}
        </div>

        <div
          id="resource-filters"
          className="mb-10 rounded-xl border border-border/70 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">Refine</p>
              <h2 className="font-serif text-lg font-semibold text-crimson">Filters</h2>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="self-start text-xs font-medium text-slate underline-offset-4 transition-colors hover:text-brand sm:self-auto"
            >
              Reset all
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block space-y-1">
              <span className="text-xs font-medium text-slate">Subject</span>
              <select className={selectClass} value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="all">All subjects</option>
                {subjectOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-medium text-slate">Level</span>
              <select className={selectClass} value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="all">All levels</option>
                {levelOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-medium text-slate">Paper</span>
              <select className={selectClass} value={paper} onChange={(e) => setPaper(e.target.value)}>
                <option value="all">All papers</option>
                {paperOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-medium text-slate">Year</span>
              <select className={selectClass} value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="all">All years</option>
                {yearOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-slate">No resources match these filters.</p>
        )}
      </div>
    </section>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const meta = [resource.level, resource.subject, resource.year, resource.paper].join(" · ");

  return (
    <article className="flex flex-col rounded-xl border border-border/70 bg-white p-5 shadow-sm transition-all duration-300 hover:border-brand/25 hover:bg-brand-soft/30 hover:shadow-md">
      <h3 className="font-serif text-base font-semibold leading-snug text-crimson">{resource.title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-slate">{meta}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{resource.description}</p>
      <div className="mt-5">
        <Link
          href={`/resources/view/${resource.id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-accent hover:shadow-md"
        >
          <Eye className="h-4 w-4 shrink-0" aria-hidden />
          View Resource
        </Link>
      </div>
    </article>
  );
}
