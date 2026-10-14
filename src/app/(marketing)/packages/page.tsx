import type { Metadata } from "next";
import PackagesSection from "@/components/packages-section";
import { site, packages } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Website Packages & Pricing",
  description: `Compare ${site.name}'s website packages, from a £90/month starter site to a fully custom build - with SEO, hosting, and ongoing support included.`,
  alternates: { canonical: "/packages" },
};

const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Website design and development",
  provider: {
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
  },
  areaServed: "United Kingdom",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Website Packages",
    itemListElement: packages.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      description: pkg.tagline,
      price: Number(pkg.priceRange.match(/£(\d+)/)?.[1]),
      priceCurrency: "GBP",
    })),
  },
};

const breadcrumbsJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Packages", path: "/packages" },
]);

export default function PackagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <PackagesSection headingLevel="h1" />
    </>
  );
}
