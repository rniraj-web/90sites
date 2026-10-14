import type { Metadata } from "next";
import {
  LegalPageLayout,
  type SectionItem,
} from "@/components/LegalPageLayout";
import { site } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Learn how ${site.name} uses cookies and similar technologies on this website, and how you can manage or disable them in your browser.`,
  alternates: { canonical: "/cookies" },
};

const breadcrumbsJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Cookie Policy", path: "/cookies" },
]);

const sections: SectionItem[] = [
  { id: "what-are-cookies", title: "1. What Are Cookies" },
  { id: "types", title: "2. Types of Cookies We Use" },
  { id: "why", title: "3. Why We Use Them" },
  { id: "managing", title: "4. Managing Your Preferences" },
  { id: "changes", title: "5. Changes to This Policy" },
  { id: "contact", title: "6. Contact Us" },
];

export default function CookiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <LegalPageLayout
        title="Cookie Policy"
        description="How we use cookies and similar technologies on this website, and how you can control them."
        lastUpdated="October 2026"
        activeTab="cookies"
        sections={sections}
    >
      <section id="what-are-cookies" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          1. What Are Cookies
        </h2>
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They let a site remember your preferences and recognize your
          browser between visits.
        </p>
      </section>

      <section id="types" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          2. Types of Cookies We Use
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Essential cookies:</strong>{" "}
            required for the site to function, such as remembering that
            you&apos;ve dismissed the cookie notice.
          </li>
          <li>
            <strong className="text-foreground">Preference cookies:</strong>{" "}
            remember choices you make, such as your theme setting.
          </li>
        </ul>
      </section>

      <section id="why" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          3. Why We Use Them
        </h2>
        <p>
          We use cookies strictly to support core site functionality and
          remember your preferences. We do not use cookies for third-party
          advertising.
        </p>
      </section>

      <section id="managing" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          4. Managing Your Preferences
        </h2>
        <p>
          Most browsers let you block or delete cookies through their settings.
          Blocking essential cookies may affect how parts of this site work.
        </p>
      </section>

      <section id="changes" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          5. Changes to This Policy
        </h2>
        <p>
          We may update this policy from time to time. The &quot;Last
          updated&quot; date at the top of this page reflects the most recent
          revision.
        </p>
      </section>

      <section id="contact" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          6. Contact Us
        </h2>
        <p>
          Questions about this policy? Email us at{" "}
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
