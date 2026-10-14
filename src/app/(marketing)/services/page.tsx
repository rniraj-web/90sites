import type { Metadata } from "next";
import ServicesSection from "@/components/services-section";
import { site } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Services - Brand, Web Design & Launch Support",
  description: `From brand and UI design to development, e-commerce integrations, and post-launch support - see how ${site.name} takes your website from idea to live.`,
  alternates: { canonical: "/services" },
};

const breadcrumbsJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Our Services", path: "/services" },
]);

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <ServicesSection headingLevel="h1" />
    </>
  );
}
