import type { MetadataRoute } from "next";

import { campDetails } from "@/data/camps";
import { fallbackBlogPosts } from "@/data/content";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "/",
  "/about",
  "/what-we-do",
  "/research",
  "/academy",
  "/events",
  "/events/camps",
  "/get-involved",
  "/portal",
  "/outreach",
  "/publications",
  "/resources",
  "/blog",
  "/media",
  "/media/videos",
  "/contact",
  "/transparency",
  "/legal/privacy",
  "/legal/terms",
  "/legal/refund",
  "/legal/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const dynamicRoutes = [
    ...campDetails.map((c) => `/events/camps/${c.slug}`),
    ...fallbackBlogPosts.map((p) => `/blog/${p.slug}`),
  ];

  const allRoutes = [...new Set([...staticRoutes, ...dynamicRoutes])];

  return allRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
