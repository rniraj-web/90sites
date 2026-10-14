import type { Metadata } from "next";
import {
  LegalPageLayout,
  type SectionItem,
} from "@/components/LegalPageLayout";
import { site } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Read ${site.name}'s privacy policy to understand what personal data we collect, how it's used, and the rights you have over your information.`,
  alternates: { canonical: "/privacy" },
};

const breadcrumbsJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
]);

const sections: SectionItem[] = [
  { id: "collection", title: "1. Information We Collect" },
  { id: "usage", title: "2. How We Use Information" },
  { id: "storage", title: "3. Storage & Security" },
  { id: "sharing", title: "4. Third-Party Services" },
  { id: "cookies", title: "5. Cookies & Tracking" },
  { id: "rights", title: "6. Your Rights & Choices" },
  { id: "children", title: "7. Children's Privacy" },
  { id: "contact", title: "8. Contact Support" },
];

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <LegalPageLayout
        title="Privacy Policy"
        description="We respect your privacy and are committed to protecting any personal data you share with us."
        lastUpdated="October 2026"
        activeTab="privacy"
        sections={sections}
      >
      <section id="collection" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          1. Information We Collect
        </h2>
        <p>
          We only collect data that is necessary to respond to your enquiry,
          deliver your website project, and keep this site running smoothly:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Enquiry details:</strong>{" "}
            Name, email address, phone number, and the information you share
            about your business when you contact us or submit the enquiry
            form.
          </li>
          <li>
            <strong className="text-foreground">Project & billing details:</strong>{" "}
            If you become a client, details needed to deliver and invoice your
            package, such as business address and payment details - handled
            directly by our certified payment processor; we never store raw
            card numbers on our servers.
          </li>
          <li>
            <strong className="text-foreground">Usage analytics:</strong>{" "}
            Anonymized interaction data, such as pages visited and browser
            type, to help us understand how this site is used.
          </li>
        </ul>
      </section>

      <section id="usage" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          2. How We Use Information
        </h2>
        <p>Your information is used solely to:</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Respond to your enquiry and discuss your project.</li>
          <li>Design, build, and deliver your website.</li>
          <li>Process invoices and payments for your package.</li>
          <li>Provide ongoing support where included in your package.</li>
          <li>Prevent fraud and misuse of this site.</li>
        </ul>
      </section>

      <section id="storage" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          3. Storage & Security
        </h2>
        <p>
          We employ industry-standard encryption protocols (TLS/SSL in transit
          and AES-256 at rest) to safeguard your data. Access is strictly
          limited to authorized engineers with role-based permissions.
        </p>
      </section>

      <section id="sharing" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          4. Third-Party Services
        </h2>
        <p>
          We do not sell, rent, or trade your personal data. We only share
          information with trusted third-party providers (such as hosting
          platforms, payment processors, and analytics providers) who adhere to
          rigorous data privacy obligations.
        </p>
      </section>

      <section id="cookies" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          5. Cookies & Tracking
        </h2>
        <p>
          We use minimal, privacy-first cookies strictly necessary for
          authentication and session management. See our{" "}
          <a
            href="/cookies"
            className="text-primary underline underline-offset-4 hover:text-foreground"
          >
            Cookie Policy
          </a>{" "}
          for details. You may disable cookies in your browser settings, though
          some interactive features may not function properly.
        </p>
      </section>

      <section id="rights" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          6. Your Rights & Choices
        </h2>
        <p>
          Under UK GDPR and the Data Protection Act 2018, you retain the
          right to access, correct, export, or request the deletion of your
          personal data at any time.
        </p>
      </section>

      <section id="children" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          7. Children&apos;s Privacy
        </h2>
        <p className="text-muted-foreground">
          Our services are not intended for individuals under 13 years of age.
          We do not knowingly collect personal data from children.
        </p>
      </section>

      <section id="contact" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          8. Contact Support
        </h2>
        <p>
          To exercise your privacy rights or ask privacy-related questions,
          contact us at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-primary underline underline-offset-4 hover:text-foreground"
          >
            {site.email}
          </a>
          .
        </p>
      </section>
      </LegalPageLayout>
    </>
  );
}
