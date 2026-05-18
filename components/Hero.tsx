"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const headline = ["Quiet", "luxury,", "loud", "results."];

export default function Hero() {
  const reduce = useReducedMotion();

  const wordVariants = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: "0%",
      transition: {
        delay: 0.6 + i * 0.08,
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bone">
      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="font-serif text-xl tracking-tight"
        >
          Maison<span className="text-gold">.</span>Noir
        </motion.div>
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="hidden items-center gap-10 text-[11px] uppercase tracking-[0.25em] md:flex"
        >
          <a href="#about" className="hover:text-gold transition-colors">Practice</a>
          <a href="#listings" className="hover:text-gold transition-colors">Portfolio</a>
          <a href="#join" className="hover:text-gold transition-colors">Apply</a>
        </motion.nav>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="hidden text-[11px] uppercase tracking-[0.25em] md:block"
        >
          Est. MMVII
        </motion.span>
      </header>

      <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="relative z-10 flex flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-20 lg:pt-0 lg:justify-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6 flex items-center gap-3 text-kicker uppercase text-ink/70"
          >
            <span className="h-px w-10 bg-gold" />
            Private listings &mdash; by invitation
          </motion.p>

          <h1 className="font-serif text-display text-ink">
            {headline.map((word, i) => (
              <span key={i} className="mask-reveal mr-[0.18em] last:mr-0">
                <motion.span
                  custom={i}
                  initial={reduce ? "visible" : "hidden"}
                  animate="visible"
                  variants={wordVariants}
                  className={i === 1 ? "italic text-gold" : ""}
                  style={{ display: "inline-block" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="mt-10 max-w-md text-base leading-relaxed text-ink/70 md:text-lg"
          >
            A vetted collective representing buyers and sellers of the world&rsquo;s
            most discreet estates &mdash; the homes that never reach the open market.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9 }}
            className="mt-10"
          >
            <a
              href="#join"
              className="group inline-flex items-center gap-4 rounded-full border border-ink bg-ink px-8 py-4 text-sm uppercase tracking-[0.2em] text-bone transition-colors duration-500 hover:bg-gold hover:border-gold"
            >
              <span>Get Exclusive Listings</span>
              <span className="relative h-4 w-4 overflow-hidden">
                <ArrowUpRight
                  className="absolute inset-0 h-4 w-4 transition-transform duration-500 group-hover:-translate-y-4 group-hover:translate-x-4"
                  strokeWidth={1.5}
                />
                <ArrowUpRight
                  className="absolute inset-0 h-4 w-4 translate-y-4 -translate-x-4 transition-transform duration-500 group-hover:translate-y-0 group-hover:translate-x-0"
                  strokeWidth={1.5}
                />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right: image */}
        <div className="relative h-full min-h-[50vh] overflow-hidden">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ delay: 0.2, duration: 1.6, ease: [0.7, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full animate-ken-burns">
              <Image
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2400&auto=format&fit=crop"
                alt="A modernist hillside residence framed by cypress trees"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* image meta */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.8 }}
            className="absolute bottom-8 right-6 z-10 text-right text-[11px] uppercase tracking-[0.25em] text-bone md:bottom-12 md:right-10"
          >
            <div>Estate N&deg; 014</div>
            <div className="mt-1 text-bone/60">Côte d&rsquo;Azur &mdash; 12,400 sq ft</div>
          </motion.div>
        </div>
      </div>

      {/* Animated divider */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.4, duration: 1.6, ease: [0.7, 0, 0.2, 1] }}
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px origin-top bg-ink/20 lg:block"
      />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.8 }}
        className="absolute bottom-6 left-6 z-20 hidden items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-ink/60 md:left-10 md:flex"
      >
        <span>Scroll</span>
        <span className="relative block h-px w-12 overflow-hidden bg-ink/20">
          <motion.span
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            className="absolute inset-y-0 block w-1/2 bg-gold"
          />
        </span>
      </motion.div>
    </section>
  );
}
