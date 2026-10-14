import type { Metadata } from "next";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import AboutSection from "@/components/about-section";
import PackagesSection from "@/components/packages-section";
import OurWorkSection from "@/components/our-work-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "WebBizo | Web Design & Development Studio in Manchester",
  },
  description:
    "WebBizo designs and builds fast, mobile-first websites for small businesses - from a single page at £90+vat to a fully custom build.",
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      {/* <Marquee text="Design · Develop · Launch · £99" /> */}
      <AboutSection />
      <PackagesSection />
      {/* <OurWorkSection /> */}
      {/* <Marquee text="Build busniess @99" /> */}
      {/* <ServicesSection /> */}
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
