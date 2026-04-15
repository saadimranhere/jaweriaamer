import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Structured learning hub: general notes, topical worksheets, past papers, examiner reports, and checklists for Cambridge O Level English.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources",
    description:
      "Structured learning hub: general notes, topical worksheets, past papers, examiner reports, and checklists for Cambridge O Level English.",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
