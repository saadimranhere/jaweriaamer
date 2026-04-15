import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContactEmailLink } from "@/components/contact-email-link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Jaweria Amer: usage of the Free Vault, intellectual property, and how student contact data is handled.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-crimson pt-28 pb-10 sm:pt-36 sm:pb-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-rose">
            Legal
          </p>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-white/55">
            Last updated: April 14, 2026
          </p>
        </div>
      </section>

      <section className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article className="max-w-none space-y-10 text-slate">
            <section>
              <h2 className="font-serif text-lg font-semibold text-crimson">
                Usage
              </h2>
              <p className="mt-3 text-sm leading-relaxed sm:text-base">
                Content in the &quot;Free Vault&quot; is for personal,
                non-commercial use only.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg font-semibold text-crimson">
                Copyright
              </h2>
              <p className="mt-3 text-sm leading-relaxed sm:text-base">
                All course materials, videos, and custom notes are the
                intellectual property of Jaweria Amer. Unauthorized
                distribution or resale is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg font-semibold text-crimson">
                Privacy
              </h2>
              <p className="mt-3 text-sm leading-relaxed sm:text-base">
                Student data provided via WhatsApp or email is used solely for
                course enrollment and related communication, and will never be
                shared with third parties.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg font-semibold text-crimson">
                Contact
              </h2>
              <p className="mt-3 text-sm leading-relaxed sm:text-base">
                For questions about these terms: <ContactEmailLink className="font-medium" />.
              </p>
            </section>
          </article>

          <Link
            href="/"
            className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-crimson transition-colors hover:text-rose"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
