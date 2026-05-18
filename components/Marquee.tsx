"use client";

const items = [
  "Luxury",
  "Exclusive",
  "Off-Market",
  "Private Listings",
  "Discretion",
  "By Invitation",
];

export default function Marquee() {
  const loop = [...items, ...items, ...items];
  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-ink/10 bg-bone py-10 md:py-14"
    >
      <div className="flex animate-marquee whitespace-nowrap will-change-transform [motion-reduce:animate-none]">
        {loop.map((word, i) => (
          <span
            key={i}
            className="flex items-center font-serif text-[14vw] leading-[0.9] text-ink md:text-[8vw]"
          >
            <span className="px-8 italic">{word}</span>
            <span className="text-gold">&#10022;</span>
          </span>
        ))}
      </div>
    </section>
  );
}
