import type { MetadataRoute } from "next";
import { stories } from "@/data/stories";

const siteUrl = "https://wanderlouge.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blog", "/gallery", "/about", "/contact"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const storyRoutes = stories.map((story) => ({
    url: `${siteUrl}/blog/${story.slug}`,
    lastModified: story.date,
  }));

  return [...staticRoutes, ...storyRoutes];
}
