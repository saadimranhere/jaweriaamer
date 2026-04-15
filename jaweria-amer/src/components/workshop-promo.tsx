import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { workshopRegisterUrl } from "@/lib/contact";

/** Left-weighted tint: keeps baked-in banner text readable; supports overlay CTA copy. */
const BANNER_OVERLAY =
  "linear-gradient(90deg, rgba(11, 29, 58, 0.42) 0%, rgba(198, 40, 57, 0.28) 38%, rgba(233, 30, 99, 0.12) 72%, transparent 100%)";

/**
 * Homepage workshop strip + hero banner. Image: `/public/images/workshop-banner.jpg`.
 */
export function WorkshopPromoSection() {
  const registerHref = workshopRegisterUrl();

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
      aria-labelledby="workshop-promo-heading"
    >
      <div className="overflow-hidden rounded-t-xl border border-brand/15 bg-brand-soft/90 px-4 py-2.5 sm:px-5">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm text-navy">
            <span className="font-semibold text-brand">Workshop</span>
            <span className="text-slate"> — Limited seats. Reserve via WhatsApp.</span>
          </p>
          <Link
            href={registerHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-brand transition-colors hover:text-brand-accent"
          >
            Reserve now
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="relative w-full overflow-hidden rounded-b-xl border border-t-0 border-brand/15 shadow-md">
        {/* Intrinsic ratio 1024×379 (provided asset) — reserves space before paint to avoid CLS */}
        <div className="relative aspect-[1024/379] w-full">
          <Image
            src="/images/workshop-banner.jpg"
            alt="Miss Jay O and A Level English Workshop — online and physical, register for the 5 to 7 day programme"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
            className="object-cover object-left sm:object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: BANNER_OVERLAY }}
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col justify-center px-5 py-6 sm:px-10 sm:py-8">
            <div className="max-w-xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white sm:text-xs [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
                Cambridge English · Karachi
              </p>
              <h2
                id="workshop-promo-heading"
                className="mt-2 font-serif text-xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]"
              >
                English Writing Workshop — examiner-aligned practice
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.55)]">
                Structured sessions, clear feedback, and a calm path to exam readiness.
              </p>
              <Link
                href={registerHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Reserve Your Spot
                <ArrowRight className="size-4 shrink-0" aria-hidden />
              </Link>
              <p className="mt-2 text-xs font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
                Limited seats available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
