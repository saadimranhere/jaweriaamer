import { ExternalLink, FolderOpen, PlayCircle } from "lucide-react";
import { contact } from "@/lib/contact";
import { ResourcesHub } from "@/components/resources-hub";

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-navy pb-12 pt-28 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">Learning hub</p>
          <h1 className="mb-4 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Resources
          </h1>
          <p className="max-w-2xl leading-relaxed text-white/65">
            Notes, worksheets, past papers, examiner reports, and checklists — organised so you can
            find what you need quickly and practise with purpose.
          </p>
        </div>
      </section>

      <section className="border-b border-border/70 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
            <div className="flex flex-col justify-center rounded-2xl border border-border/80 bg-cream/40 p-8 shadow-sm sm:p-10">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                <PlayCircle className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand">Channel</p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-navy sm:text-3xl">
                English with Jaweria on YouTube
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate">
                Lesson-style explanations, exam thinking, and revision support — built to complement
                the materials below.
              </p>
              <a
                href={contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-light"
              >
                Open YouTube channel
                <ExternalLink className="h-4 w-4 opacity-90" aria-hidden />
              </a>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-gold/25 bg-gradient-to-br from-navy via-navy to-navy-light p-8 text-white shadow-md sm:p-10">
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/20 text-gold">
                  <FolderOpen className="h-5 w-5" aria-hidden />
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold/90">Full vault</p>
                <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">Full Resource Pack</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                  The curated folder bundles extended handouts and session materials in one place —
                  for students who want the complete archive alongside this hub.
                </p>
              </div>
              <a
                href={contact.drive}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-navy shadow-sm transition-all hover:bg-gold-dark hover:text-white"
              >
                Open full pack
                <ExternalLink className="h-4 w-4 opacity-90" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      <ResourcesHub />
    </>
  );
}
