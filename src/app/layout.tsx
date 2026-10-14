import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site, packages } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

// Derived from the live package prices rather than hardcoded, so it can't
// drift out of sync if pricing changes.
const packagePrices = packages
  .map((pkg) => Number(pkg.priceRange.match(/£(\d+)/)?.[1]))
  .filter((n): n is number => !Number.isNaN(n));
const priceRange = `£${Math.min(...packagePrices)}-£${Math.max(...packagePrices)}`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phones[0],
  image: `${site.url}/logo.png`,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/logo.png`,
  },
  priceRange,
  areaServed: "United Kingdom",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  // BASE, Manchester Science Park, Greenheys Lane, M15 6LR.
  geo: {
    "@type": "GeoCoordinates",
    latitude: 53.462631,
    longitude: -2.238602,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    opens: "09:00",
    closes: "17:30",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
