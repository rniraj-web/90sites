import type { Metadata } from "next";
import OurWorkSection from "@/components/our-work-section";
import { site } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Work - Client Website Portfolio",
  description: `Browse real websites ${site.name} has designed and built for restaurants, retailers, tradespeople and service businesses - see the results for yourself.`,
  alternates: { canonical: "/our-work" },
};

const breadcrumbsJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Our Work", path: "/our-work" },
]);

export default function OurWorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <OurWorkSection headingLevel="h1" />
    </>
  );
}
