export default function Marquee({ text }: { text: string }) {
  const items = Array.from({ length: 8 }, () => text);

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-border/60 py-4"
    >
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="font-serif text-sm font-medium uppercase tracking-[0.3em] text-[#585e67]"
          >
            {item} <span className="text-primary/60">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
