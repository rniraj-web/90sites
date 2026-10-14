import type { Metadata } from "next";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import { testimonials } from "@/lib/testimonials";
import { site } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews",
  description: `Read what ${site.name} clients say about their website projects - real feedback from UK businesses on design, communication, and results.`,
  alternates: { canonical: "/testimonials" },
};

const averageRating =
  testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: averageRating,
    reviewCount: testimonials.length,
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating,
      bestRating: 5,
    },
    reviewBody: t.content,
  })),
};

const breadcrumbsJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Testimonials", path: "/testimonials" },
]);

export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <TestimonialsCarousel headingLevel="h1" />
    </>
  );
}
