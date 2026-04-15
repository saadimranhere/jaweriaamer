import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Globe,
  BookOpen,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { ContactEmailLink } from "@/components/contact-email-link";
import { whatsAppGroupUrl, whatsAppUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Jaweria Amer. Cambridge English mentor focused on rubric-driven practice, examiner-aligned feedback, and calm mentorship for O Level students.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description:
      "Meet Jaweria Amer. Cambridge English mentor focused on rubric-driven practice, examiner-aligned feedback, and calm mentorship for O Level students.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About",
    description:
      "Meet Jaweria Amer. Cambridge English mentor focused on rubric-driven practice, examiner-aligned feedback, and calm mentorship for O Level students.",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-crimson to-crimson-dark pb-16 pt-28 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
            About
          </p>
          <h1 className="mb-4 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.35rem]">
            Jaweria Amer
          </h1>
          <p className="max-w-xl leading-relaxed text-white/70">
            Cambridge English specialist with international education
            experience, dedicated to structured mentorship that builds
            independent thinkers.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">
            {/* Portrait placeholder */}
            <div className="lg:col-span-2">
              <div className="aspect-[3/4] bg-crimson/5 rounded-2xl border border-border/60 flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="w-24 h-24 rounded-full bg-crimson/10 flex items-center justify-center mx-auto mb-4">
                    <span className="font-serif text-3xl font-bold text-crimson">
                      JA
                    </span>
                  </div>
                  <p className="font-serif text-lg font-semibold text-ink">
                    Jaweria Amer
                  </p>
                  <p className="text-xs text-slate-light tracking-wider uppercase mt-1">
                    O Level English Specialist
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h2 className="mb-4 font-serif text-xl font-semibold text-ink sm:text-2xl">
                  Teaching Philosophy
                </h2>
                <div className="space-y-4 text-slate leading-relaxed">
                  <p>
                    My approach is simple: reduce confusion, increase control.
                    We work with real paper patterns, build repeatable writing
                    structures, and practise under timed conditions &mdash; while
                    keeping confidence intact.
                  </p>
                  <p>
                    I teach English the way high-performing students need it:
                    clear structures, precise feedback, and habits that hold up
                    on exam day. Every session is designed around Cambridge
                    marking criteria, because understanding how examiners think
                    is what changes grades.
                  </p>
                  <p>
                    Having worked across education systems in Karachi, London,
                    and Athens, I bring a global perspective grounded in local
                    understanding. I know the pressures students at KGS, Nixor,
                    and The Lyceum face &mdash; and I know how to turn that
                    pressure into structured, purposeful effort.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: GraduationCap,
                    title: "Pedagogical Expertise",
                    desc: "Trained in flipped classrooms, active learning strategies, and medical education innovation.",
                  },
                  {
                    icon: Globe,
                    title: "International Experience",
                    desc: "Education administration across Karachi, London, and Athens. A global perspective on university pathways.",
                  },
                  {
                    icon: BookOpen,
                    title: "Cambridge Specialist",
                    desc: "Deep expertise in CAIE English Language (1123, 9093) and Literature syllabi.",
                  },
                  {
                    icon: Heart,
                    title: "Student-Centred",
                    desc: "Mentorship that prioritises well-being alongside academic rigour. No shortcuts, no burnout.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl p-5 border border-border/60"
                  >
                    <item.icon className="w-5 h-5 text-rose mb-3" />
                    <h3 className="mb-1.5 font-serif text-sm font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="mb-4 font-serif text-xl font-semibold text-ink sm:text-2xl">
                  What Sets This Apart
                </h2>
                <div className="space-y-3">
                  {[
                    "Rubric-driven instruction aligned to how Cambridge actually marks",
                    "Examiner-style feedback on every piece of work",
                    "Structured programmes, not ad-hoc sessions",
                    "Calm, supportive mentorship that builds independence",
                    "Transparent method: diagnostic, plan, practice, feedback",
                    "No grade guarantees, no inflated claims. Just honest, consistent work",
                  ].map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-rose shrink-0 mt-0.5" />
                      <span className="text-sm text-slate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-crimson to-crimson-dark py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Let&apos;s Start with a Conversation
          </h2>
          <p className="text-white/70 leading-relaxed mb-6 max-w-lg mx-auto">
            A short call to understand where you are, where you want to be, and
            whether this is the right fit. No obligation.
          </p>
          <p className="mb-8 text-sm text-white/65 max-w-lg mx-auto">
            Prefer email?{" "}
            <ContactEmailLink variant="onDark" className="font-medium" />
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
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
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-white/20 sm:w-auto"
            >
              Join WhatsApp group
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
