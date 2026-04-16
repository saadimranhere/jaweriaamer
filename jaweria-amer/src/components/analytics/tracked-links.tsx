"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { trackCourseClick, trackOutboundLink, trackWhatsAppClick } from "@/lib/analytics";

type TrackedWhatsAppProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  location: string;
  variant?: "direct" | "group";
};

/** External WhatsApp (`wa.me` / `api.whatsapp.com`) with click analytics. */
export function TrackedWhatsAppLink({
  href,
  location,
  variant = "direct",
  onClick,
  children,
  ...rest
}: TrackedWhatsAppProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        trackWhatsAppClick({ location, variant });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

type OutboundChannel = "youtube" | "instagram" | "facebook" | "drive" | "other";

type TrackedOutboundProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  channel: OutboundChannel;
};

export function TrackedOutboundLink({
  href,
  channel,
  onClick,
  children,
  ...rest
}: TrackedOutboundProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        trackOutboundLink(href, channel);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

type TrackedCourseSyllabusProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
  courseId: string;
};

/** Internal navigation to a course detail page (vault card “View syllabus”). */
export function TrackedCourseSyllabusLink({ href, courseId, onClick, ...rest }: TrackedCourseSyllabusProps) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        trackCourseClick(courseId, "course_card_syllabus");
        onClick?.(e);
      }}
      {...rest}
    />
  );
}
