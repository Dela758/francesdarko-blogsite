import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/infrastructure/config/site.config";
import { getPostSummaries } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/essays`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic essay post routes
  const postSummaries = getPostSummaries();
  const essayRoutes: MetadataRoute.Sitemap = postSummaries.map((post) => ({
    url: `${baseUrl}/essays/${post.slug}`,
    lastModified: post.frontmatter.date ? new Date(post.frontmatter.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...essayRoutes];
}
