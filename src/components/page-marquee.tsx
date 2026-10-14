import { site } from "@/lib/content";

const PHONE = site.phones[0];
const TEXT = `Free consultation - call us on ${PHONE}`;

export default function PageMarquee({
  bgColor,
  textColor,
}: {
  bgColor: string;
  textColor: string;
}) {
  const items = Array.from({ length: 6 }, () => TEXT);

  return (
    <div className="mt-6 flex justify-center px-4">
      {/* Scrolling strip is decorative/duplicated, so it's hidden from
          assistive tech; this single real link carries the same content. */}
      <a href={`tel:${PHONE.replace(/\s+/g, "")}`} className="sr-only">
        {TEXT}
      </a>
      <div
        aria-hidden="true"
        className="w-full max-w-md overflow-hidden rounded-full py-2.5 sm:max-w-xl"
        style={{ backgroundColor: bgColor }}
      >
        <div
          className="marquee-track flex w-max items-center gap-8 whitespace-nowrap"
          style={{ animationDuration: "48s" }}
        >
          {[...items, ...items].map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] sm:text-sm"
              style={{ color: textColor }}
            >
              {item}
              <span style={{ color: textColor, opacity: 0.5 }}>•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
