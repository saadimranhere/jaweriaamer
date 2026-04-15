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
    <div className="mx-auto w-full max-w-7xl px-4 pb-3 pt-20 sm:px-6 sm:pt-24 lg:px-8">
      <div className="overflow-hidden rounded-xl border border-border/60 shadow-[0_2px_12px_rgba(34,16,18,0.06)] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
        <div className="relative aspect-video w-full">
          <Image
            src="/images/workshop-banner.jpg"
            alt="Miss Jay O Level English Workshop — 5 to 7 day online and physical programme, syllabus revision, mock exams, and contact details on banner"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
            className="object-cover object-left sm:object-center"
          />
        </div>
      </div>

      <section
        id="workshop-reserve"
        className="mx-auto max-w-lg px-2 py-12 text-center sm:py-14"
        aria-labelledby="workshop-reserve-heading"
      >
        <h2
          id="workshop-reserve-heading"
          className="font-serif text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-[1.75rem]"
        >
          Reserve your spot
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate sm:text-[0.9375rem]">
          Limited seats available
        </p>
        <Link
          href={registerHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-[0_1px_2px_rgba(34,16,18,0.08)] transition-all hover:bg-brand-accent hover:shadow-[0_4px_14px_rgba(112,20,20,0.15)] focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Reserve via WhatsApp
          <ArrowRight className="size-4 shrink-0" aria-hidden />
        </Link>
      </section>
    </div>
  );
}
