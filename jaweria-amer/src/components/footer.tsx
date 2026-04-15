import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data";

const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export function Footer() {
  return (
    <footer className="bg-navy text-white/75">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <p className="font-serif text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-gold">
                {siteConfig.name}
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">
                O/A Level English Specialist
              </p>
            </Link>
            <p className="text-sm leading-relaxed text-white/65 max-w-xs">
              Rubric-driven Cambridge English mentorship that builds clarity,
              examiner-aligned skill, and independent thinking for O/A Level
              students.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-white/90 mb-5">
              Quick Links
            </h2>
            <ul className="space-y-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-white/90 mb-5">
              Contact
            </h2>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-start gap-2.5 text-white/70 transition-colors hover:text-gold"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-gold"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>Karachi, Pakistan (General Location)</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-white/90 mb-5">
              Legal
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-white/70 transition-colors hover:text-gold"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/70 transition-colors hover:text-gold"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-navy-dark/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-center text-xs text-white/50 sm:text-left">
            © 2026 Jaweria Amer. All Rights Reserved.
          </p>
          <p className="mt-4 max-w-4xl text-[11px] leading-relaxed text-white/40 text-center sm:text-left">
            CAIE™, O Level™, and A Level™ are trademarks of Cambridge
            Assessment International Education. This site is not affiliated
            with or endorsed by Cambridge Assessment.
          </p>
        </div>
      </div>
    </footer>
  );
}
