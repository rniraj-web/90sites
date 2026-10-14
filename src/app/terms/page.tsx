import type { Metadata } from "next";
import {
  LegalPageLayout,
  type SectionItem,
} from "@/components/LegalPageLayout";
import { site } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `The terms and conditions that apply when you work with ${site.name}, covering accounts, payments, acceptable use, liability, and more.`,
  alternates: { canonical: "/terms" },
};

const breadcrumbsJsonLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Terms and Conditions", path: "/terms" },
]);

const sections: SectionItem[] = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "license", title: "2. License & Intellectual Property" },
  { id: "user-accounts", title: "3. Accounts & Security" },
  { id: "payments", title: "4. Payments & Packages" },
  { id: "enquiry-guarantee", title: "5. Enquiry Guarantee" },
  { id: "acceptable-use", title: "6. Acceptable Use Policy" },
  { id: "disclaimers", title: "7. Disclaimers & Warranties" },
  { id: "limitation", title: "8. Limitation of Liability" },
  { id: "contact", title: "9. Contact Us" },
];

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <LegalPageLayout
        title="Terms and Conditions"
        description="Please read these terms and conditions carefully before working with us on your website project."
        lastUpdated="October 2026"
        activeTab="terms"
        sections={sections}
      >
      <section id="acceptance" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          1. Acceptance of Terms
        </h2>
        <p>
          By engaging {site.name} to design, build, or support a website, or
          by using this website, you agree to be bound by these Terms and
          Conditions and all applicable laws and regulations. If you do not
          agree with any of these terms, please do not use this site or
          instruct us to proceed with a project.
        </p>
      </section>

      <section id="license" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          2. License & Intellectual Property
        </h2>
        <p>
          Ownership of your website works as follows, unless otherwise agreed
          in writing:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Your content:</strong> You
            retain ownership of your brand assets, copy, images, and other
            material you supply to us for the project.
          </li>
          <li>
            <strong className="text-foreground">Your finished website:</strong>{" "}
            Once your project is paid in full, ownership of the final website
            design and build transfers to you.
          </li>
          <li>
            <strong className="text-foreground">
              Our tools and frameworks:
            </strong>{" "}
            We may reuse proprietary code, templates, and frameworks we have
            developed across projects; these remain our intellectual property
            and are licensed to you for use as part of your website only, not
            for resale or redistribution as standalone assets.
          </li>
          <li>
            <strong className="text-foreground">Portfolio use:</strong> We may
            showcase completed work, including screenshots and a link to your
            live site, in our own portfolio and marketing materials unless you
            ask us not to.
          </li>
        </ul>
      </section>

      <section id="user-accounts" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          3. Accounts & Security
        </h2>
        <p>
          Where your package includes hosting, a content management system, or
          other admin access, you are responsible for keeping your login
          credentials confidential. You agree to notify us immediately of any
          unauthorized use of your account.
        </p>
      </section>

      <section id="payments" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          4. Payments & Packages
        </h2>
        <p>
          Package fees are as set out on our{" "}
          <a
            href="/packages"
            className="text-primary underline underline-offset-4 hover:text-foreground"
          >
            Packages
          </a>{" "}
          page at the time you order, plus VAT where applicable. Monthly and
          12-month packages are billed as described on that page. All
          payments are processed securely through our payment provider.
          Refunds are handled in accordance with the Enquiry Guarantee below
          and any other refund terms agreed with you in writing.
        </p>
      </section>

      <section id="enquiry-guarantee" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          5. Enquiry Guarantee
        </h2>
        <p>
          The Enquiry Guarantee applies to the Business Small, Business Pro
          and Business Bespoke packages only. If your website does not
          generate at least one genuine customer enquiry within 3 months of
          going live, you may
          request a full refund of the package fee, subject to: the site
          remaining live and unmodified during that period, reasonable use of
          any included SEO/marketing deliverables, and a refund request being
          made within 14 days of the 3-month deadline. &quot;Enquiry&quot;
          means a contact form submission, phone call, or email generated via
          the website. One refund per customer per project.
        </p>
      </section>

      <section id="acceptable-use" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          6. Acceptable Use Policy
        </h2>
        <p>
          You agree not to use our services or this website for unlawful
          purposes, to upload or distribute malicious code, to attempt to
          gain unauthorized access to our systems or infrastructure, or to
          use content from your website build to create a directly
          competing agency offering.
        </p>
      </section>

      <section id="disclaimers" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          7. Disclaimers & Warranties
        </h2>
        <p className="text-muted-foreground">
          We build every website with care, but we cannot guarantee specific
          business outcomes beyond what is set out in the Enquiry Guarantee
          above. Your website and any third-party services it relies on
          (hosting, domains, payment providers) are provided on an &quot;as
          is&quot; basis, and we do not warrant that they will be
          uninterrupted or error-free at all times.
        </p>
      </section>

      <section id="limitation" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          8. Limitation of Liability
        </h2>
        <p>
          In no event shall {site.name} or Hivebyte Technology Ltd be liable
          for any indirect, incidental, or consequential damages arising from
          the use or inability to use your website or our services, except
          where such liability cannot be excluded under applicable law.
        </p>
      </section>

      <section id="contact" className="scroll-mt-24 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-foreground tracking-tight">
          9. Contact Us
        </h2>
        <p>
          If you have questions regarding these terms, please contact us at{" "}
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
