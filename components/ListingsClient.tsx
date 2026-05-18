"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import type { Listing } from "@/lib/supabase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ListingsClient({ properties }: { properties: Listing[] }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".listing-card").forEach((el, i) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 1,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      gsap.from(".listings-heading > *", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".listings-heading", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  if (properties.length === 0) {
    return (
      <section
        ref={root}
        id="listings"
        className="relative bg-ink py-32 text-bone md:py-44"
      >
        <div className="mx-auto max-w-[1500px] px-6 text-center md:px-10">
          <p className="text-kicker uppercase text-bone/60">The Portfolio</p>
          <h2 className="mt-6 font-serif text-display-sm">
            <span className="italic text-gold">Curating</span> the next collection.
          </h2>
          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-bone/60">
            Our portfolio is between seasons. Apply to the list to be the
            first to see what comes next.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={root}
      id="listings"
      className="relative bg-ink py-32 text-bone md:py-44"
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="listings-heading mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-6 flex items-center gap-3 text-kicker uppercase text-bone/60">
              <span className="h-px w-10 bg-gold" />
              The Portfolio
            </p>
            <h2 className="max-w-3xl font-serif text-display-sm">
              Currently <span className="italic text-gold">whispered.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-bone/60">
            A small selection of estates we are placing this season. The
            full collection is reserved for members.
          </p>
        </div>
      </div>

      <div
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:gap-10 md:px-10"
        role="list"
      >
        {properties.map((p, i) => (
          <article
            key={p.id}
            role="listitem"
            className="listing-card group relative w-[78vw] flex-none snap-start sm:w-[60vw] md:w-[44vw] lg:w-[34vw] xl:w-[28vw]"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-soft">
              <Image
                src={p.image_url}
                alt={p.alt}
                fill
                sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 34vw, (min-width: 768px) 44vw, 78vw"
                className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
              <span className="absolute left-5 top-5 rounded-full border border-bone/30 bg-ink/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-bone backdrop-blur">
                {p.tag}
              </span>
              <span className="absolute right-5 top-5 font-serif text-sm">
                {String(i + 1).padStart(2, "0")}{" "}
                <span className="text-bone/40">
                  / {String(properties.length).padStart(2, "0")}
                </span>
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl tracking-tight md:text-3xl">
                  {p.name}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-bone/60">
                  <MapPin className="h-3 w-3" strokeWidth={1.5} />
                  {p.location}
                </p>
              </div>
              <span className="rounded-full border border-gold/60 px-4 py-1.5 font-serif text-sm text-gold">
                {p.price}
              </span>
            </div>
          </article>
        ))}

        <div aria-hidden className="w-6 flex-none md:w-10" />
      </div>

      <div className="mx-auto mt-16 flex max-w-[1500px] items-center justify-between px-6 text-[11px] uppercase tracking-[0.25em] text-bone/40 md:mt-20 md:px-10">
        <span>Drag &rarr; to explore</span>
        <span>{properties.length} of 38 visible</span>
      </div>
    </section>
  );
}
