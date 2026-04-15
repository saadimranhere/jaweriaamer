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

      <ResourcesHub />
    </>
  );
}
