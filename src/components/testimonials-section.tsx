"use client";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  company: string;
  rating: number;
  content: string;
  platform: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Scott Wade",
    company: "ACD of Lancashire Ltd",
    rating: 5,
    content:
      "Really happy with our service so far from Carlos and the staff. Very professional from start to finish with our new website, now looking forward to them helping us promoting our website , would definitely recommend these guys , Acd of Lancashire ltd",
    platform: "Google Review",
  },
  {
    name: "Beenoir",
    company: "The Bee Noir Manchester Team",
    rating: 5,
    content:
      "Dear Hivebyte Manchester Team,\n\nOn behalf of Bee Noir Manchester, I want to express our sincere thanks for the excellent website you created for us. We are absolutely thrilled with the final result! The design is stunning, and the site is incredibly user-friendly. It perfectly captures the spirit of our project.\nThank you for your professionalism, creativity, and support.",
    platform: "Google Review",
  },
  {
    name: "Martin Unsworth",
    company: "OCVS Limited",
    rating: 5,
    content:
      "To Carlos and the team at Hivebyte , thank you for supporting our journey to completion of OCVS Limited's new website. You have really gone the extra mile with our tricky requirements - Martin",
    platform: "Google Review",
  },
];

export default function TestimonialsSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#ade8f4] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0077b6] sm:text-sm">
            Testimonials
          </span>

          <Heading className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#1a2332] sm:text-4xl md:text-5xl">
            What Our{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#0077b6]">Clients Say</span>
              {/* Highlight underline using #ade8f4 */}
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-0 z-0 h-3 w-full -rotate-1 rounded bg-[#ade8f4]"
              />
            </span>
          </Heading>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((item, index) => (
            <figure
              key={index}
              className="flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-8"
            >
              <div>
                {/* Header row: 5 Stars + Google Verified Badge */}
                <div className="flex items-center justify-between">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-[#f59e0b]">
                    {[...Array(item.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Google Tag */}
                  <div className="flex items-center gap-1.5 rounded-full border border-neutral-200/60 bg-neutral-50 px-2.5 py-1 text-[11px] font-medium text-neutral-600">
                    <svg className="h-3 w-3" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Google</span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <blockquote className="mt-5 whitespace-pre-line text-[14.5px] leading-relaxed text-[#4b5563]">
                  &ldquo;{item.content}&rdquo;
                </blockquote>
              </div>

              {/* Author & Google Review Tag */}
              <figcaption className="mt-8 border-t border-neutral-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[15px] font-bold text-[#1a2332]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#6b7280]">{item.company}</p>
                  </div>
                  <span className="text-xs font-medium text-[#0077b6]">
                    {item.platform}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="mt-10 text-center"
        >
          <a
            href="/testimonials"
            className="inline-flex items-center justify-center rounded-lg bg-[#ade8f4] px-6 py-3 text-sm font-semibold text-[#0077b6] shadow-sm transition-colors hover:bg-[#0077b6] hover:text-white"
          >
            Read more reviews →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
