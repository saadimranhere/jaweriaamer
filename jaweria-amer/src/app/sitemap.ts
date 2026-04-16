import type { MetadataRoute } from "next";
import { courses, resources } from "@/lib/data";
import { listMarketingCourses } from "@/lib/course-offerings";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().href.replace(/\/$/, "");
  const lastModified = new Date();

  const staticPaths = ["", "/about", "/courses", "/resources", "/privacy", "/terms"] as const;

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: path === "" ? `${base}/` : `${base}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.85,
  }));

  for (const course of listMarketingCourses(courses)) {
    entries.push({
      url: `${base}/courses/${course.id}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  for (const resource of resources) {
    entries.push({
      url: `${base}/resources/view/${resource.id}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.55,
    });
  }

  return entries;
}
