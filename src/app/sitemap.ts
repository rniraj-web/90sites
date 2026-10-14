import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified: new Date() },
    { url: `${site.url}/about`, lastModified: new Date() },
    { url: `${site.url}/packages`, lastModified: new Date() },
    { url: `${site.url}/our-work`, lastModified: new Date() },
    { url: `${site.url}/services`, lastModified: new Date() },
    { url: `${site.url}/testimonials`, lastModified: new Date() },
    { url: `${site.url}/contact`, lastModified: new Date() },
    { url: `${site.url}/privacy`, lastModified: new Date() },
    { url: `${site.url}/terms`, lastModified: new Date() },
    { url: `${site.url}/cookies`, lastModified: new Date() },
  ];
}
