import type { Metadata } from "next";
import AboutStorySection from "@/components/about-story-section";
import WhyUsSection from "@/components/why-us-section";
import { site } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About - Our Web Design Studio",
  description: `${site.name} is a small Manchester-based web design studio, taking your business from first idea to a live site - design, build, SEO and accessibility included.`,
  alternates: { canonical: "/about" },
};

const breadcrumbsJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <AboutStorySection />
      <WhyUsSection />
    </>
  );
}
