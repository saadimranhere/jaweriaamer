import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Structured Cambridge O Level, A Level, Literature, and Creative Writing programmes. Rubric-aligned pathways with clear outcomes and curriculum detail.",
  alternates: { canonical: "/courses" },
  openGraph: {
    title: "Courses",
    description:
      "Structured Cambridge O Level, A Level, Literature, and Creative Writing programmes. Rubric-aligned pathways with clear outcomes and curriculum detail.",
  },
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
