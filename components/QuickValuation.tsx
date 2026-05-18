"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please share your name."),
  email: z.string().email("That email looks off."),
  housePrice: z
    .number({ invalid_type_error: "Enter a number." })
    .positive("Must be greater than zero."),
});

type FormValues = z.infer<typeof schema>;

const formatUSD = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export default function QuickValuation() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [priceDisplay, setPriceDisplay] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  // Register housePrice manually so we can control the raw value vs. display.
  register("housePrice", { valueAsNumber: true });

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = raw === "" ? NaN : Number(raw);
    setValue("housePrice", num, { shouldValidate: false });
    setPriceDisplay(raw === "" ? "" : formatUSD(num));
  };

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/valuation", {
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
      id="valuation"
      aria-labelledby="valuation-heading"
      className="relative bg-bone py-16 md:py-36"
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="mb-4 flex items-center gap-3 text-kicker uppercase text-ink/70 md:mb-6">
            <span className="h-px w-10 bg-gold" />
            Private Valuation
          </p>
          <h2
            id="valuation-heading"
            className="font-serif text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-display-sm"
          >
            What&rsquo;s your home <span className="italic text-gold">worth?</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70 md:mt-8 md:text-lg">
            Two fields, one number. Receive a discreet, market-grade
            estimate from a senior advisor &mdash; no automated valuations,
            no syndicated data.
          </p>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="qv-form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="qv space-y-6 rounded-2xl border border-ink/15 bg-bone p-6 md:space-y-7 md:p-10"
              >
                <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                  <div className="qv-field">
                    <input
                      id="qv-name"
                      type="text"
                      placeholder=" "
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                    <label htmlFor="qv-name">Full Name</label>
                    {errors.name && (
                      <p className="mt-2 text-xs text-gold-dim">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="qv-field">
                    <input
                      id="qv-email"
                      type="email"
                      placeholder=" "
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                    <label htmlFor="qv-email">Email</label>
                    {errors.email && (
                      <p className="mt-2 text-xs text-gold-dim">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="qv-field">
                  <input
                    id="qv-price"
                    type="text"
                    inputMode="numeric"
                    placeholder=" "
                    aria-invalid={!!errors.housePrice}
                    value={priceDisplay}
                    onChange={onPriceChange}
                  />
                  <label htmlFor="qv-price">House Price (USD)</label>
                  {errors.housePrice && (
                    <p className="mt-2 text-xs text-gold-dim">
                      {errors.housePrice.message}
                    </p>
                  )}
                </div>

                {serverError && (
                  <p className="text-sm text-gold-dim" role="alert">
                    {serverError}
                  </p>
                )}

                <div className="flex flex-col items-start gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-ink bg-ink px-8 py-4 text-sm uppercase tracking-[0.2em] text-bone transition-colors duration-500 hover:border-gold disabled:opacity-50"
                  >
                    <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                      {isSubmitting ? "Submitting" : "Request Valuation"}
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
                  <p className="max-w-[22ch] text-xs leading-relaxed text-ink/50">
                    Replies within two business days. Always confidential.
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="qv-success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                role="status"
                aria-live="polite"
                className="flex flex-col items-start rounded-2xl border border-ink/15 bg-bone p-10 md:p-12"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-gold"
                >
                  <Check className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </motion.div>
                <h3 className="font-serif text-3xl leading-tight md:text-4xl">
                  Valuation requested.
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">
                  A senior advisor will reach out via a private channel
                  within two business days with a market-grade estimate
                  and next steps.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
