import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { resources } from "@/lib/data";
import { publicFileAbsoluteUrl } from "@/lib/public-asset-url";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return resources.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const resource = resources.find((r) => r.id === id);
  if (!resource) return { title: "Resource" };
  return {
    title: `${resource.title} | Resources`,
    description: resource.description,
    robots: { index: false, follow: true },
  };
}

export default async function ResourceViewPage({ params }: { params: Params }) {
  const { id } = await params;
  const resource = resources.find((r) => r.id === id);
  if (!resource) notFound();

  const absolutePdfUrl = await publicFileAbsoluteUrl(resource.fileUrl);
  const gviewSrc = `https://docs.google.com/gview?url=${encodeURIComponent(absolutePdfUrl)}&embedded=true`;

  const meta = [resource.level, resource.subject, resource.year, resource.paper].join(" · ");

  return (
    <div className="min-h-screen bg-cream">
      <section className="border-b border-border/70 bg-crimson pb-8 pt-24 text-white sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-rose"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to resources
          </Link>
          <h1 className="font-serif text-2xl font-bold leading-snug sm:text-3xl">{resource.title}</h1>
          <p className="mt-2 text-sm text-white/60">{meta}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">{resource.description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <iframe
          title={resource.title}
          src={gviewSrc}
          className="w-full h-[80vh] rounded-xl border border-border/80 bg-white shadow-sm"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
