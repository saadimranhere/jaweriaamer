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
import { ContactEmailLink } from "@/components/contact-email-link";
import { whatsAppGroupUrl, whatsAppUrl } from "@/lib/contact";
import { CourseCard } from "@/components/course-card";
import { WorkshopPromoSection } from "@/components/workshop-promo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const featuredCourses = listMarketingCourses(courses).filter((c) => c.featured);
  const settings = await getSettings();

  return (
    <>
      <WorkshopPromoSection />

      {/* Hero */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-crimson via-crimson-light to-crimson" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-rose text-sm font-medium tracking-[0.2em] uppercase mb-4 sm:mb-6">
              O Level English Specialist
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Master CAIE English
              <span className="block text-rose mt-2">with Clarity and Care</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mb-8 sm:mb-10">
              Rubric-driven instruction, calm accountability, and mentorship
              that builds independent thinkers. Structured practice that holds
              up on exam day.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={whatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose px-7 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-rose-dark hover:shadow-md"
                >
                  Book a Clarity Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={whatsAppGroupUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-white/20 hover:shadow-md"
                >
                  Join WhatsApp group
                </Link>
              </div>
              <Link
                href="/courses"
                className="inline-flex w-fit items-center gap-1 text-sm font-medium text-white/80 underline-offset-4 transition-colors hover:text-white"
              >
                Explore courses
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {settings.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-crimson mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-slate">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-rose text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Why Students Choose Us
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-crimson mb-4">
              Structure, Not Stress
            </h2>
            <p className="text-slate leading-relaxed">
              We don&apos;t do panic prep. We build repeatable exam thinking
              through a method that&apos;s rubric-led, feedback-rich, and
              designed around how Cambridge actually marks.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="bg-white rounded-xl p-6 border border-border/60 hover:shadow-md hover:border-rose/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-rose/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-rose" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-crimson mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 sm:mb-14">
            <div>
              <p className="text-rose text-sm font-medium tracking-[0.2em] uppercase mb-3">
                Programmes
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-crimson">
                Featured Courses
              </h2>
            </div>
            <Link
              href="/courses"
              className="hidden sm:flex items-center gap-1 text-sm text-crimson hover:text-rose font-medium transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="sm:hidden mt-8 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1 text-sm text-crimson hover:text-rose font-medium transition-colors"
            >
              View All Courses
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Course Roadmap */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-rose text-sm font-medium tracking-[0.2em] uppercase mb-3">
              The Method
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-crimson mb-4">
              Your Step-by-Step Roadmap
            </h2>
            <p className="text-slate leading-relaxed">
              A clear, structured journey from diagnostic to exam day. Every
              step is designed to build skill, confidence, and control.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8 sm:space-y-10">
              {siteConfig.roadmap.map((step) => (
                <div key={step.step} className="relative flex gap-5 sm:gap-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-crimson text-white flex items-center justify-center font-serif font-bold text-sm sm:text-base shrink-0 z-10">
                    {step.step}
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-crimson mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-crimson">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Build a Clear Plan?
          </h2>
          <p className="text-white/70 leading-relaxed mb-4 max-w-lg mx-auto">
            Book a short clarity call to discuss your goals, current level, and
            the programme that fits. No pressure, no commitment.
          </p>
          <p className="mb-8 text-sm text-white/60 max-w-lg mx-auto">
            Or write to{" "}
            <ContactEmailLink variant="onDark" className="font-medium" />
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={whatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-rose px-7 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-rose-dark hover:shadow-md sm:w-auto"
            >
              Book a Clarity Call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={whatsAppGroupUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-white/20 hover:shadow-md sm:w-auto"
            >
              Join WhatsApp group
            </Link>
          </div>
          <p className="mt-6 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1 text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white"
            >
              Browse courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
