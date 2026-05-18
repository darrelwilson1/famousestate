"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Block = {
  kicker: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  stat: { value: number; suffix?: string; prefix?: string; label: string };
};

const blocks: Block[] = [
  {
    kicker: "01 — The Practice",
    title: "Representation, not transaction.",
    body: "We work with a deliberately small roster of clients. Every relationship begins with a private consultation and ends with a key &mdash; never a queue, never a pipeline.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400&auto=format&fit=crop",
    alt: "Sun-drenched living room with vaulted ceilings",
    stat: { value: 200, suffix: "+", label: "Residences placed since 2007" },
  },
  {
    kicker: "02 — The Network",
    title: "A door before the door opens.",
    body: "Two-thirds of the homes we transact never appear on a public listing. Our advantage is not search &mdash; it is invitation, built over a decade of trust.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2400&auto=format&fit=crop",
    alt: "Architectural villa at dusk with reflecting pool",
    stat: { value: 1.2, prefix: "$", suffix: "B", label: "In closed transactions" },
  },
  {
    kicker: "03 — The Standard",
    title: "Slow, considered, exact.",
    body: "From the first walk-through to the final wire, our process is engineered for clients who measure success in details &mdash; not in days on market.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2400&auto=format&fit=crop",
    alt: "Sculptural staircase in a contemporary estate",
    stat: { value: 38, label: "Days &mdash; average to close, off-market" },
  },
];

function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
      return;
    }
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: to,
      duration: 2.2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${obj.v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, prefix, suffix, decimals]);
  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
}

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.utils.toArray<HTMLElement>(".reveal-line").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      if (!reduce) {
        gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((el) => {
          gsap.to(el, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about"
      className="relative bg-bone py-32 md:py-44"
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mb-24 flex flex-col gap-6 md:mb-32 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="reveal-line mb-6 flex items-center gap-3 text-kicker uppercase text-ink/70">
              <span className="h-px w-10 bg-gold" />
              The Practice
            </p>
            <h2 className="reveal-line max-w-3xl font-serif text-display-sm">
              A quieter way <span className="italic text-gold">to move</span> real estate.
            </h2>
          </div>
          <p className="reveal-line max-w-sm text-base leading-relaxed text-ink/70">
            Three numbers that explain how we operate &mdash; and why most of our
            clients come to us by introduction.
          </p>
        </div>

        <div className="space-y-32 md:space-y-48">
          {blocks.map((b, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={b.kicker}
                className={`grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-12 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-6">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5">
                    <div className="parallax-img absolute -inset-y-[10%] inset-x-0">
                      <Image
                        src={b.image}
                        alt={b.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 lg:col-start-auto">
                  <p className="reveal-line mb-6 text-kicker uppercase text-gold">
                    {b.kicker}
                  </p>
                  <h3 className="reveal-line mb-8 font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                    {b.title}
                  </h3>
                  <p
                    className="reveal-line max-w-md text-base leading-relaxed text-ink/70 md:text-lg"
                    dangerouslySetInnerHTML={{ __html: b.body }}
                  />

                  <div className="reveal-line mt-12 flex items-baseline gap-6 border-t border-ink/15 pt-8">
                    <span className="font-serif text-6xl tracking-tight md:text-7xl">
                      <CountUp
                        to={b.stat.value}
                        prefix={b.stat.prefix}
                        suffix={b.stat.suffix}
                        decimals={b.stat.value % 1 !== 0 ? 1 : 0}
                      />
                    </span>
                    <span
                      className="max-w-[16ch] text-[11px] uppercase leading-snug tracking-[0.2em] text-ink/60"
                      dangerouslySetInnerHTML={{ __html: b.stat.label }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
