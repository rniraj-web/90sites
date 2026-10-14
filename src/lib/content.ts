export const site = {
  name: "WebBizo",
  legalName: "Hivebyte Technology Ltd t/a WebBizo",
  tagline: "We plan, design, build and grow with you.",
  description:
    "WebBizo designs and builds websites for businesses - from first idea to a site you can launch with confidence.",
  // TODO(launch): replace with the real production domain before going
  // live - this placeholder feeds metadataBase, canonical URLs, the
  // sitemap, robots.txt, and JSON-LD, so swapping it is a single-line fix.
  url: "https://webbizo.example.com",
  address: {
    street: "BASE, Manchester Science Park, Greenheys Lane",
    city: "Manchester",
    region: "",
    postalCode: "M15 6LR",
    country: "GB",
  },
  phones: ["0161 383 1960"],
  email: "hello@hivebyte.co.uk",
  hours: [
    { day: "Monday", time: "9am–5:30pm" },
    { day: "Tuesday", time: "9am–5:30pm" },
    { day: "Wednesday", time: "9am–5:30pm" },
    { day: "Thursday", time: "9am–5:30pm" },
    { day: "Friday", time: "9am–5:30pm" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" },
  ],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Packages", href: "/packages" },
  { label: "Our Work", href: "/our-work" },
  { label: "Our Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  // { label: "FAQ", href: "/#faq" },
  { label: "Contact us", href: "/contact" },
] as const;

export const about = {
  eyebrow: "The studio",
  headline: "We build sites that carry your business, not just a brand.",
  paragraphs: [
    "WebBizo is a small web design and development studio. We take a business from a first conversation to a live site - design, build and the unglamorous SEO and accessibility work that makes a site actually useful.",
    "Most sites add noise. We'd rather ship a few pages that load fast, read clearly and turn visitors into customers. That's true whether you need a quick one-pager or a custom build with its own moving parts.",
  ],
  // TODO: replace with real figures once available.
  stats: [
    { value: "6-8 weeks", label: "typical turnaround" },
    { value: "100%", label: "mobile-first builds" },
    { value: "Remote", label: "worldwide" },
  ],
};

export type Service = {
  title: string;
  description: string;
  tags: string[];
};

// TODO: replace with real service descriptions once finalized.
export const services: Service[] = [
  {
    title: "Discover & plan",
    description:
      "We start by listening. We learn about your business, your customers and your goals, then map out a clear plan, timeline and budget before any work begins.",
    tags: ["Free consultation", "Clear roadmap"],
  },
  {
    title: "Brand & design",
    description:
      "We shape how you look and feel, from your logo and brand identity to the screens your customers will use. You review and approve every design before we build.",
    tags: ["Logo design", "Brand identity", "UI design"],
  },
  {
    title: "Build & connect",
    description:
      "We bring the designs to life as fast, secure, SEO-ready websites and mobile apps and connect the tools that run your business, such as CRM systems, payments and bookings.",
    tags: ["Websites & apps", "CRM & integrations", "SEO-ready"],
  },
  {
    title: "Launch & grow",
    description:
      "We handle the launch, then stay by your side. From SEO and social media to updates and performance tracking, we help more of the right people find you.",
    tags: ["SEO", "Social media", "Ongoing support"],
  },
];

export type Faq = { question: string; answer: string };

// TODO: replace with real FAQ content once finalized.
export const faqs: Faq[] = [
  {
    question: "How long does a project take?",
    answer:
      "Every project is different. A straightforward website will usually take around 6-8 weeks, while larger, bespoke or technically advanced projects may take longer. We agree the timeline with you before development begins.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer:
      "Yes. Every website we build is responsive and designed to work properly across mobiles, tablets, laptops and desktop screens.",
  },
  {
    question: "Do you handle SEO and accessibility?",
    answer:
      "Yes. We provide SEO and accessibility services designed to improve your website’s search visibility, attract more relevant visitors and create more opportunities for enquiries and sales. Every site is built to WCAG standards, so it’s easy to use for everyone, including people using screen readers or keyboard navigation.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes. We can continue to support, maintain, update and protect your website after launch so your digital presence stays secure and performing properly.",
  },
  {
    question: "Can you work with my existing website or brand?",
    answer:
      "Absolutely. Whether you need a full rebuild, a refresh or a few targeted improvements, we start by reviewing your current site and brand. From there, we recommend the approach that makes the most sense for your goals and budget.",
  },
  {
    question: "How do I get started?",
    answer:
      "Tell us about your business, your goals and what you want to achieve. We will talk through the project with you and recommend the best way forward.",
  },
];

export type Package = {
  name: string;
  tagline: string;
  includes: string[];
  priceRange: string;
};

export const packages: Package[] = [
  {
    name: "Starter",
    tagline: "A simple website, live fast, with hosting sorted for the year.",
    includes: [
      "Up to 5 pages",
      "Website only",
      "Hosting & domain (12 months)",
      "SSL certificate",
      "12-month term",
      "No SEO included",
      "No ongoing support included",
    ],
    priceRange: "£90+VAT per month",
  },
  {
    name: "Business Small",
    tagline:
      "Ideal for small businesses looking for a new website with a modern design.",
    includes: [
      "Template-based design",
      "12 months premium hosting",
      "Premium stock images",
      "12 months free domain",
      "Daily cloud backup",
      "SSL certificate",
      "Business email setup",
      "Support & maintenance (6 months)",
      "SEO (12 months)",
    ],
    priceRange: "£240+VAT × 12 months",
  },
  {
    name: "Business Pro",
    tagline:
      "For professionals who want to take their web presence to the next level.",
    includes: [
      "Custom design",
      "12 months premium hosting",
      "Premium stock images",
      "12 months free domain",
      "Daily cloud backup",
      "SSL certificate",
      "Business email setup",
      "Support & maintenance (12 months)",
      "SEO (12 months)",
      "Advanced graphic design",
      "Web animations",
      "Booking systems",
      "Complex functionality",
    ],
    priceRange: "£420+VAT × 12 months",
  },
  {
    name: "Business Bespoke",
    tagline:
      "Next-level design and motion graphics to blow your customers away.",
    includes: [
      "Custom design",
      "12 months premium hosting",
      "Premium stock images",
      "12 months free domain",
      "Daily cloud backup",
      "SSL certificate",
      "Business email setup",
      "Support & maintenance (12 months)",
      "SEO (12 months)",
      "Advanced graphic design",
      "Web animations",
      "Booking systems",
      "Complex functionality",
      "Motion graphics",
    ],
    priceRange: "£740+VAT × 12 months",
  },
];

export type WorkItem = {
  kind: string;
  title: string;
  summary: string;
  detail: string;
};

// TODO: replace with real case studies / project images when available.
export const workItems: WorkItem[] = [
  {
    kind: "Rebrand",
    title: "Brand site relaunch",
    summary: "A full rebrand and site rebuild for a growing local business.",
    detail:
      "We rebuilt the site from the ground up: new design system, faster load times and a CMS the team could actually use.",
  },
  {
    kind: "E-commerce",
    title: "Online storefront",
    summary:
      "An e-commerce build for a product-based business going direct-to-consumer.",
    detail:
      "Custom storefront with inventory sync, checkout and a design that matched the physical product packaging.",
  },
  {
    kind: "Local service",
    title: "Service business site",
    summary: "A lead-generation site for a local service provider.",
    detail:
      "Focused on fast load, clear calls to action and local SEO so the right customers could find and book them.",
  },
];

export const legalNav = [
  { id: "privacy", label: "Privacy Policy", href: "/privacy" },
  { id: "terms", label: "Terms and Conditions", href: "/terms" },
] as const;
