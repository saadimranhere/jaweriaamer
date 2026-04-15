import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowRight,
  Clock,
  CalendarDays,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { courses, siteConfig } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categoryColors: Record<string, string> = {
  "o-level": "bg-navy/10 text-navy",
  "a-level": "bg-gold/15 text-gold-dark",
  literature: "bg-slate/10 text-slate",
  "creative-writing": "bg-navy-light/10 text-navy-light",
};

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  return courses.map((course) => ({ id: course.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
    },
    alternates: {
      canonical: `/courses/${course.id}`,
    },
  };
}

export default async function CourseDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (!course) notFound();

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Courses
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge
              variant="secondary"
              className={categoryColors[course.category] || ""}
            >
              {course.categoryLabel}
            </Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
            {course.title}
          </h1>
          <p className="text-white/50 text-sm mb-4">{course.subtitle}</p>
          <p className="text-white/70 max-w-2xl leading-relaxed">
            {course.description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* What You Will Learn */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy mb-6">
                What You Will Learn
              </h2>
              <div className="space-y-3">
                {course.outcomes.map((outcome) => (
                  <div key={outcome} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-slate text-sm leading-relaxed">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus Overview */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy mb-6">
                Syllabus Coverage
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.syllabus.map((item) => (
                  <div
                    key={item}
                    className="bg-cream rounded-lg px-4 py-3 text-sm text-navy border border-border/40"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy mb-6">
                Curriculum
              </h2>
              <Accordion className="space-y-3">
                {course.curriculum.map((module, i) => (
                  <AccordionItem
                    key={i}
                    value={`module-${i}`}
                    className="bg-white rounded-lg border border-border/60 px-5 overflow-hidden"
                  >
                    <AccordionTrigger className="text-sm font-medium text-navy hover:no-underline py-4">
                      <span className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-navy/5 flex items-center justify-center text-xs font-semibold text-navy shrink-0">
                          {i + 1}
                        </span>
                        {module.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <ul className="space-y-2 pl-10">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="text-sm text-slate flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 bg-white rounded-xl border border-border/60 p-6 space-y-6">
              <div>
                <p className="font-serif text-3xl font-bold text-navy">
                  {course.price}
                </p>
                <p className="text-xs text-slate-light mt-1">
                  Full programme fee
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-slate">
                  <Clock className="w-4 h-4 text-gold" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-2 text-slate">
                  <CalendarDays className="w-4 h-4 text-gold" />
                  {course.schedule}
                </div>
              </div>

              <div className="border-t border-border pt-5 space-y-3">
                <Link
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hi, I'm interested in the ${course.title} programme.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-white font-medium py-3 rounded-lg transition-colors text-sm"
                >
                  Enrol via WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-navy hover:bg-navy-light text-white font-medium py-3 rounded-lg transition-colors text-sm"
                >
                  Book a Clarity Call
                </Link>
              </div>

              <p className="text-xs text-slate-light leading-relaxed">
                Not sure if this is the right fit? Book a free 15-minute call.
                We&apos;ll assess your level and recommend a plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
