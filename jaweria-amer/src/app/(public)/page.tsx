import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Target,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";
import { listMarketingCourses } from "@/lib/course-offerings";
import { courses, siteConfig } from "@/lib/data";
import { getSettings } from "@/lib/admin/store";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { ContactEmailLink } from "@/components/contact-email-link";
import { whatsAppGroupUrl, whatsAppUrl } from "@/lib/contact";
import { CourseCard } from "@/components/course-card";
import { WorkshopPromoSection } from "@/components/workshop-promo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

const sectionKicker = "text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground";
const sectionTitle = "font-serif text-2xl font-semibold leading-tight text-ink sm:text-3xl lg:text-[2rem] lg:leading-snug";
const bodyLead = "text-base leading-relaxed text-slate sm:text-[1.05rem] sm:leading-relaxed";

export default async function HomePage() {
  const featuredCourses = listMarketingCourses(courses).filter((c) => c.featured);
  const settings = await getSettings();

  return (
    <>
      <WorkshopPromoSection />

      {/* Hero */}
      <section className="relative overflow-hidden pt-14 pb-24 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-36">
        <div className="absolute inset-0 bg-gradient-to-br from-crimson via-crimson to-crimson-dark" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75 sm:mb-6 sm:text-xs">
              O Level English Specialist
            </p>
            <h1 className="mb-6 font-serif text-[2.1rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl sm:leading-[1.1] lg:text-[2.65rem] lg:leading-[1.08]">
              Master CAIE English
              <span className="mt-2 block font-normal text-white/90">with Clarity and Care</span>
            </h1>
            <p className="mb-9 max-w-xl text-base leading-relaxed text-white/72 sm:mb-11 sm:text-lg sm:leading-relaxed">
              Rubric-driven instruction, calm accountability, and mentorship that builds independent thinkers.
              Structured practice that holds up on exam day.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedWhatsAppLink
                  href={whatsAppUrl()}
                  location="home_hero"
                  variant="direct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-all hover:bg-brand-accent hover:shadow-[0_4px_18px_rgba(0,0,0,0.15)]"
                >
                  Book a Clarity Call
                  <ArrowRight className="h-4 w-4" />
                </TrackedWhatsAppLink>
                <TrackedWhatsAppLink
                  href={whatsAppGroupUrl()}
                  location="home_hero"
                  variant="group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-[2px] transition-all hover:border-white/35 hover:bg-white/16"
                >
                  Join WhatsApp group
                </TrackedWhatsAppLink>
              </div>
              <Link
                href="/courses"
                className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/75 underline-offset-4 transition-colors hover:text-white"
              >
                Explore courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/70 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-12">
            {settings.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="mb-1.5 font-serif text-3xl font-semibold tabular-nums text-crimson sm:text-[2.1rem]">
                  {stat.value}
                </p>
                <p className="text-sm leading-snug text-slate">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value proposition */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
            <p className={`${sectionKicker} mb-3`}>Why Students Choose Us</p>
            <h2 className={`${sectionTitle} mb-5`}>Structure, Not Stress</h2>
            <p className={bodyLead}>
              We don&apos;t do panic prep. We build repeatable exam thinking through a method that&apos;s rubric-led,
              feedback-rich, and designed around how Cambridge actually marks.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4">
            {[
              {
                icon: Target,
                title: "Rubric-Aligned",
                desc: "Every exercise maps to CAIE marking criteria. No guesswork, no wasted effort.",
              },
              {
                icon: BookOpen,
                title: "Examiner Insights",
                desc: "Feedback modelled on examiner reports. You learn what gains marks and what loses them.",
              },
              {
                icon: Users,
                title: "Calm Mentorship",
                desc: "Supportive, structured guidance that keeps confidence intact while raising standards.",
              },
              {
                icon: Award,
                title: "Proven Results",
                desc: "Consistent A*/A outcomes across multiple exam sessions. The method works.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/60 bg-white p-7 shadow-[0_1px_3px_rgba(34,16,18,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-border hover:shadow-[0_6px_24px_rgba(34,16,18,0.06)]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <item.icon className="h-5 w-5 text-brand" aria-hidden />
                </div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-6 sm:mb-16">
            <div>
              <p className={`${sectionKicker} mb-3`}>Programmes</p>
              <h2 className={sectionTitle}>Featured Courses</h2>
            </div>
            <Link
              href="/courses"
              className="hidden items-center gap-1 text-sm font-medium text-ink/80 transition-colors hover:text-brand sm:flex"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1 text-sm font-medium text-ink/80 transition-colors hover:text-brand"
            >
              View all courses
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
            <p className={`${sectionKicker} mb-3`}>The Method</p>
            <h2 className={`${sectionTitle} mb-5`}>Your Step-by-Step Roadmap</h2>
            <p className={bodyLead}>
              A clear, structured journey from diagnostic to exam day. Every step is designed to build skill,
              confidence, and control.
            </p>
          </div>

          <div className="relative mx-auto max-w-2xl">
            <div className="absolute bottom-2 left-[1.125rem] top-2 w-px bg-border sm:left-6" aria-hidden />
            <div className="space-y-10 sm:space-y-12">
              {siteConfig.roadmap.map((step) => (
                <div key={step.step} className="relative flex gap-5 sm:gap-6">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-crimson text-sm font-semibold text-white shadow-sm sm:h-11 sm:w-11 sm:text-base">
                    {step.step}
                  </div>
                  <div className="min-w-0 pt-0.5 sm:pt-1">
                    <h3 className="mb-2 font-serif text-lg font-semibold text-ink sm:text-xl">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-slate">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-crimson-dark/20 bg-gradient-to-b from-crimson to-crimson-dark py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2rem]">
            Ready to Build a Clear Plan?
          </h2>
          <p className="mx-auto mb-4 max-w-lg leading-relaxed text-white/75">
            Book a short clarity call to discuss your goals, current level, and the programme that fits. No pressure,
            no commitment.
          </p>
          <p className="mx-auto mb-10 max-w-lg text-sm text-white/55">
            Or write to <ContactEmailLink variant="onDark" className="font-medium" />
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
            <TrackedWhatsAppLink
              href={whatsAppUrl()}
              location="home_footer_cta"
              variant="direct"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_2px_14px_rgba(0,0,0,0.2)] transition-all hover:bg-brand-accent sm:min-w-[200px]"
            >
              Book a Clarity Call
              <ArrowRight className="h-4 w-4" />
            </TrackedWhatsAppLink>
            <TrackedWhatsAppLink
              href={whatsAppGroupUrl()}
              location="home_footer_cta"
              variant="group"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/18 sm:min-w-[200px]"
            >
              Join WhatsApp group
            </TrackedWhatsAppLink>
          </div>
          <p className="mt-8">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/65 underline-offset-4 transition-colors hover:text-white"
            >
              Browse courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
