"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  BookOpen,
  ClipboardCheck,
  Search,
} from "lucide-react";
import { resources } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const typeFilters = [
  { value: "all", label: "All Resources" },
  { value: "past-paper", label: "Past Papers" },
  { value: "marking-scheme", label: "Marking Schemes" },
  { value: "examiner-report", label: "Examiner Reports" },
  { value: "checklist", label: "Checklists" },
];

const typeIcons: Record<string, typeof FileText> = {
  "past-paper": BookOpen,
  "marking-scheme": FileText,
  "examiner-report": Search,
  checklist: ClipboardCheck,
};

const typeBadgeColors: Record<string, string> = {
  "past-paper": "bg-navy/10 text-navy",
  "marking-scheme": "bg-gold/15 text-gold-dark",
  "examiner-report": "bg-brand-soft/90 text-brand",
  checklist: "bg-navy-light/10 text-navy-light",
};

export default function ResourcesPage() {
  const [activeType, setActiveType] = useState("all");

  const filtered =
    activeType === "all"
      ? resources
      : resources.filter((r) => r.type === activeType);

  return (
    <>
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Free Vault
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Resources
          </h1>
          <p className="text-white/60 max-w-xl leading-relaxed">
            Past papers, marking schemes, examiner reports, and structured
            checklists. Everything you need to practise with purpose.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            {typeFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveType(filter.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeType === filter.value
                    ? "bg-navy text-white"
                    : "bg-white text-slate hover:bg-navy/5 border border-border/60"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((resource) => {
              const Icon = typeIcons[resource.type] || FileText;
              return (
                <div
                  key={resource.id}
                  className="bg-white rounded-xl border border-border/60 p-5 hover:shadow-md hover:border-gold/30 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center">
                      <Icon className="w-5 h-5 text-navy" />
                    </div>
                    <Badge
                      variant="secondary"
                      className={typeBadgeColors[resource.type] || ""}
                    >
                      {resource.typeLabel}
                    </Badge>
                  </div>

                  <h3 className="font-serif text-base font-semibold text-navy mb-1.5">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed mb-4 flex-1">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-light">
                      {resource.subject} &middot; {resource.year}
                    </span>
                    <button className="inline-flex items-center gap-1.5 text-sm text-navy hover:text-gold font-medium transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      {resource.downloadLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-slate py-16">
              No resources found for this filter.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
