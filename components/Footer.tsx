"use client";

import { Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="border-t border-bone/10">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 md:gap-8 md:px-10 md:py-28">
          <div className="md:col-span-6">
            <p className="mb-6 flex items-center gap-3 text-kicker uppercase text-bone/50">
              <span className="h-px w-10 bg-gold" />
              Private Brokerage &mdash; Est. MMVII
            </p>
            <p className="max-w-md font-serif text-2xl leading-snug md:text-3xl">
              Discretion is the rarest amenity. We have built our practice
              around it.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-bone/40">
              Offices
            </p>
            <ul className="space-y-2 text-sm text-bone/70">
              <li>New York</li>
              <li>Los Angeles</li>
              <li>London</li>
              <li>Paris</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-bone/40">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-bone/70">
              <li>
                <a href="mailto:atelier@maisonnoir.co" className="hover:text-gold">
                  atelier@maisonnoir.co
                </a>
              </li>
              <li>+1 (212) 555 — 0144</li>
              <li className="pt-4">
                <div className="flex items-center gap-5 text-bone/60">
                  <a href="#" aria-label="Instagram" className="hover:text-gold">
                    <Instagram className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-gold">
                    <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                  <a href="#" aria-label="Twitter" className="hover:text-gold">
                    <Twitter className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="select-none whitespace-nowrap px-6 pb-2 md:px-10"
        >
          <h2 className="font-serif text-[22vw] leading-[0.85] tracking-[-0.04em] text-bone">
            Maison<span className="italic text-gold">.</span>Noir
          </h2>
        </div>
        <div className="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-4 border-t border-bone/10 px-6 py-8 text-[11px] uppercase tracking-[0.25em] text-bone/40 md:flex-row md:items-center md:px-10">
          <span>&copy; {year} Maison Noir. All rights reserved.</span>
          <span className="flex items-center gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Imprint</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
