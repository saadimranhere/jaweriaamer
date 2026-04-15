import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free vault: past papers, marking schemes, examiner reports, and checklists for CAIE English. Practise with purpose using official-style materials.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources",
    description:
      "Free vault: past papers, marking schemes, examiner reports, and checklists for CAIE English. Practise with purpose using official-style materials.",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
