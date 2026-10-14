import type { Metadata } from "next";
import ContactSection from "@/components/contact-section";
import { site } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Get in touch with ${site.name} to discuss your website project. Tell us about your business and we'll follow up to talk through the next steps.`,
  alternates: { canonical: "/contact" },
};

const breadcrumbsJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Contact us", path: "/contact" },
]);

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <ContactSection headingLevel="h1" />
    </>
  );
}
