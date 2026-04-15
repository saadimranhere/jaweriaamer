import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Jaweria Amer collects and uses contact information for course enrollment.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy pt-28 pb-10 sm:pt-36 sm:pb-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Legal
          </p>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/55">
            Last updated: April 14, 2026
          </p>
        </div>
      </section>

      <section className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article className="space-y-8 text-sm leading-relaxed text-slate sm:text-base">
            <p>
              Jaweria Amer uses the contact details you provide (including
              email addresses and WhatsApp numbers) only to respond to
              enquiries, manage course enrollment, and deliver related
              communications about your learning.
            </p>
            <p>
              We do not sell, rent, or share your personal data with third
              parties for marketing or unrelated purposes.
            </p>
            <p>
              For full terms governing use of materials and intellectual
              property, see our{" "}
              <Link
                href="/terms"
                className="font-medium text-navy underline-offset-4 hover:text-gold hover:underline"
              >
                Terms of Service
              </Link>
              .
            </p>
          </article>

          <Link
            href="/"
            className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
