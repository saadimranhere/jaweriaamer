import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { workshopRegisterUrl } from "@/lib/contact";

/**
 * Homepage workshop banner (image only — artwork includes all copy) + reserve CTA block below.
 */
export function WorkshopPromoSection() {
  const registerHref = workshopRegisterUrl();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-2 pt-20 sm:px-6 sm:pt-24 lg:px-8">
      {/* Banner: image only — no text overlay on artwork */}
      <div className="overflow-hidden rounded-xl border border-brand/15 shadow-md motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
        <div className="relative aspect-video w-full">
          <Image
            src="/images/workshop-banner.jpg"
            alt="Miss Jay O and A Level English Workshop — 5 to 7 day online and physical programme, syllabus revision, mock exams, and contact details on banner"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
            className="object-cover object-left sm:object-center"
          />
        </div>
      </div>

      {/* Conversion block below banner — avoids duplicating text on the image */}
      <section
        id="workshop-reserve"
        className="mx-auto max-w-lg px-2 py-10 text-center sm:py-12"
        aria-labelledby="workshop-reserve-heading"
      >
        <h2
          id="workshop-reserve-heading"
          className="font-serif text-2xl font-bold tracking-tight text-navy sm:text-3xl"
        >
          Reserve Your Spot
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate sm:text-base">
          Limited seats available
        </p>
        <Link
          href={registerHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-accent hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Reserve via WhatsApp
          <ArrowRight className="size-4 shrink-0" aria-hidden />
        </Link>
      </section>
    </div>
  );
}
