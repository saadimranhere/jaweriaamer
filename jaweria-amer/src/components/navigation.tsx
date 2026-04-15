"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { whatsAppGroupUrl, whatsAppUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Home begins with a bright workshop banner — keep nav legible. */
  const isTransparent = !scrolled && pathname !== "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex flex-col">
            <span
              className={cn(
                "font-serif text-lg sm:text-xl font-semibold tracking-tight transition-colors",
                isTransparent ? "text-white" : "text-navy"
              )}
            >
              Jaweria Amer
            </span>
            <span
              className={cn(
                "text-[10px] sm:text-xs tracking-[0.2em] uppercase transition-colors",
                isTransparent ? "text-white/60" : "text-slate-light"
              )}
            >
              English Specialist
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm tracking-wide transition-colors",
                  isTransparent
                    ? pathname === item.href
                      ? "text-white font-medium"
                      : "text-white/70 hover:text-white"
                    : pathname === item.href
                      ? "text-navy font-medium"
                      : "text-slate hover:text-navy"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              <Link
                href={whatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-gold px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-gold-dark hover:shadow-md"
              >
                WhatsApp
              </Link>
              <Link
                href={whatsAppGroupUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-sm font-medium shadow-sm transition-all",
                  isTransparent
                    ? "border-white/35 bg-white/10 text-white hover:bg-white/15"
                    : "border-border bg-white text-navy hover:border-gold/40 hover:bg-cream/50"
                )}
              >
                Group
              </Link>
            </div>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                "md:hidden p-2 transition-colors",
                isTransparent ? "text-white" : "text-navy"
              )}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white p-6">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-base tracking-wide transition-colors",
                      pathname === item.href
                        ? "text-navy font-medium"
                        : "text-slate hover:text-navy"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-2 flex flex-col gap-2">
                  <Link
                    href={whatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-gold px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:bg-gold-dark hover:shadow-md"
                  >
                    WhatsApp
                  </Link>
                  <Link
                    href={whatsAppGroupUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-border bg-white px-5 py-2.5 text-center text-sm font-medium text-navy shadow-sm transition-all hover:border-gold/40 hover:bg-cream/50"
                  >
                    WhatsApp group
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
