"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "Please share your full name."),
  email: z.string().email("That email looks off."),
  phone: z
    .string()
    .min(7, "A reachable number, please.")
    .regex(/^[+0-9()\-\s]+$/, "Digits, spaces, and + only."),
  budget: z.enum(["under-500k", "500k-1m", "1m-3m", "3m-plus"], {
    errorMap: () => ({ message: "Choose a range." }),
  }),
  interest: z.enum(["buying", "selling", "investing"], {
    errorMap: () => ({ message: "Choose one." }),
  }),
});

type FormValues = z.infer<typeof schema>;

const budgetOptions = [
  { value: "", label: "Select a range" },
  { value: "under-500k", label: "Under $500K" },
  { value: "500k-1m", label: "$500K — $1M" },
  { value: "1m-3m", label: "$1M — $3M" },
  { value: "3m-plus", label: "$3M and above" },
];

const interestOptions = [
  { value: "", label: "Select one" },
  { value: "buying", label: "Buying" },
  { value: "selling", label: "Selling" },
  { value: "investing", label: "Investing" },
];

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const budgetValue = watch("budget");
  const interestValue = watch("interest");

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Network");
      setSubmitted(true);
    } catch {
      setServerError("Something went sideways. Try again in a moment.");
    }
  };

  return (
    <section
      id="join"
      className="relative bg-ink text-bone"
      aria-labelledby="join-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left copy */}
        <div className="relative flex flex-col justify-center border-b border-bone/10 px-6 pb-10 pt-20 md:px-12 md:pb-16 md:pt-32 lg:border-b-0 lg:border-r lg:py-44">
          <p className="mb-4 flex items-center gap-3 text-kicker uppercase text-bone/60 md:mb-6">
            <span className="h-px w-10 bg-gold" />
            The Application
          </p>
          <h2
            id="join-heading"
            className="max-w-xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-display-sm"
          >
            Join <span className="italic text-gold">the list.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/70 md:mt-10 md:text-lg">
            Members receive first access to off-market residences, private
            previews before listing, and a dedicated advisor for buying,
            selling, or investing. We review every application personally
            &mdash; expect a reply within two business days.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm text-bone/60 md:mt-12 md:space-y-3">
            {[
              "Off-market &amp; pre-listing access",
              "Private previews, no public showings",
              "Dedicated advisor &mdash; one point of contact",
              "Discretion by default",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-px w-6 bg-gold" />
                <span dangerouslySetInnerHTML={{ __html: t }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Right form */}
        <div className="relative flex flex-col justify-center px-6 pb-20 pt-10 md:px-12 md:pb-32 md:pt-16 lg:py-44">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-7"
              >
                <div className="field">
                  <input
                    id="fullName"
                    type="text"
                    placeholder=" "
                    autoComplete="name"
                    aria-invalid={!!errors.fullName}
                    {...register("fullName")}
                  />
                  <label htmlFor="fullName">Full Name</label>
                  {errors.fullName && (
                    <p className="mt-2 text-xs text-gold">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="field">
                  <input
                    id="email"
                    type="email"
                    placeholder=" "
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  <label htmlFor="email">Email</label>
                  {errors.email && (
                    <p className="mt-2 text-xs text-gold">{errors.email.message}</p>
                  )}
                </div>

                <div className="field">
                  <input
                    id="phone"
                    type="tel"
                    placeholder=" "
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                  />
                  <label htmlFor="phone">Phone</label>
                  {errors.phone && (
                    <p className="mt-2 text-xs text-gold">{errors.phone.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                  <div className="field">
                    <select
                      id="budget"
                      defaultValue=""
                      data-empty={!budgetValue}
                      aria-invalid={!!errors.budget}
                      {...register("budget")}
                    >
                      {budgetOptions.map((o) => (
                        <option key={o.value} value={o.value} disabled={o.value === ""}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="budget">Budget Range</label>
                    {errors.budget && (
                      <p className="mt-2 text-xs text-gold">{errors.budget.message}</p>
                    )}
                  </div>

                  <div className="field">
                    <select
                      id="interest"
                      defaultValue=""
                      data-empty={!interestValue}
                      aria-invalid={!!errors.interest}
                      {...register("interest")}
                    >
                      {interestOptions.map((o) => (
                        <option key={o.value} value={o.value} disabled={o.value === ""}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="interest">Property Interest</label>
                    {errors.interest && (
                      <p className="mt-2 text-xs text-gold">{errors.interest.message}</p>
                    )}
                  </div>
                </div>

                {serverError && (
                  <p className="text-sm text-gold" role="alert">
                    {serverError}
                  </p>
                )}

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-bone/30 px-8 py-4 text-sm uppercase tracking-[0.2em] text-bone transition-colors duration-500 hover:border-gold disabled:opacity-50"
                  >
                    <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                      {isSubmitting ? "Submitting" : "Request Access"}
                    </span>
                    <span className="relative z-10 block h-4 w-4 overflow-hidden">
                      <ArrowRight
                        className="absolute inset-0 h-4 w-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:text-ink"
                        strokeWidth={1.5}
                      />
                      <ArrowRight
                        className="absolute inset-0 h-4 w-4 -translate-x-6 transition-transform duration-500 group-hover:translate-x-0 group-hover:text-ink"
                        strokeWidth={1.5}
                      />
                    </span>
                  </button>
                  <p className="mt-6 text-xs leading-relaxed text-bone/40">
                    By submitting, you agree to be contacted by a Maison Noir
                    advisor. We never share, sell, or syndicate your
                    information.
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start"
                role="status"
                aria-live="polite"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mb-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold"
                >
                  <Check className="h-6 w-6 text-gold" strokeWidth={1.5} />
                </motion.div>
                <h3 className="font-serif text-4xl leading-tight md:text-5xl">
                  Application received.
                </h3>
                <p className="mt-6 max-w-md text-base leading-relaxed text-bone/70 md:text-lg">
                  A senior advisor will be in touch within two business days
                  via a private channel. In the meantime, expect nothing
                  &mdash; we don&rsquo;t do automated drip emails.
                </p>
                <span className="mt-12 text-[11px] uppercase tracking-[0.25em] text-bone/40">
                  &mdash; Maison Noir
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
