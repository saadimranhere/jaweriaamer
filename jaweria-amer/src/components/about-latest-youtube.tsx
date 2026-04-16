"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { TrackedOutboundLink } from "@/components/analytics/tracked-links";
import { contact, youtubeLatestEmbedSrc } from "@/lib/contact";

const LOAD_TIMEOUT_MS = 14_000;

/**
 * Channel uploads embed (latest first). If the player does not signal load in time, a fallback panel
 * appears on top (same footprint — no layout shift) with channel CTA copy.
 */
export function AboutLatestYoutube() {
  const [showFallback, setShowFallback] = useState(false);
  const loadedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleIframeLoad = useCallback(() => {
    loadedRef.current = true;
    setShowFallback(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleIframeError = useCallback(() => {
    setShowFallback(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    loadedRef.current = false;
    timeoutRef.current = setTimeout(() => {
      if (!loadedRef.current) setShowFallback(true);
    }, LOAD_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const embedSrc = youtubeLatestEmbedSrc();

  return (
    <div className="mx-auto mt-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-border/70 bg-muted/30 shadow-[0_8px_32px_rgba(34,16,18,0.08)]">
      <div className="relative aspect-video w-full">
        <iframe
          className="absolute inset-0 z-0 h-full w-full"
          src={embedSrc}
          title="Latest from English with Jaweria on YouTube"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          aria-hidden={showFallback}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
        {showFallback && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 overflow-y-auto bg-gradient-to-b from-white/98 to-blush/95 px-6 py-10 text-center sm:px-10"
            role="region"
            aria-label="YouTube channel preview unavailable"
          >
            <h3 className="font-serif text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              Learn directly from Jaweria
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-slate sm:text-base">
              Full lessons and paper-style breakdowns on YouTube — structured, calm, and aligned to how
              Cambridge marks.
            </p>
            <p className="max-w-md text-xs leading-relaxed text-slate-light sm:text-sm">
              Used by students preparing for Cambridge O Level English exams
            </p>
            <TrackedOutboundLink
              href={contact.youtube}
              channel="youtube"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 rounded-xl bg-crimson px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose"
            >
              Open full channel
              <ExternalLink className="h-4 w-4 opacity-90" aria-hidden />
            </TrackedOutboundLink>
          </div>
        )}
      </div>
    </div>
  );
}
