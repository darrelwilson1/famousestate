"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const MAX = 1000;

const schema = z.object({
  name: z.string().min(2, "Please share your name."),
  email: z.string().email("That email looks off."),
  message: z
    .string()
    .min(10, "A few more words, please.")
    .max(MAX, `Keep it under ${MAX} characters.`),
});

type FormValues = z.infer<typeof schema>;

export default function MessageForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const messageValue = watch("message") ?? "";

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/message", {
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
      id="message"
      aria-labelledby="message-heading"
      className="relative bg-bone py-16 md:py-36"
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="mb-4 flex items-center gap-3 text-kicker uppercase text-ink/70 md:mb-6">
            <span className="h-px w-10 bg-gold" />
            Begin a Conversation
          </p>
          <h2
            id="message-heading"
            className="font-serif text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-display-sm"
          >
            Send <span className="italic text-gold">a note.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70 md:mt-8 md:text-lg">
            Tell us what you&rsquo;re looking for, or what you&rsquo;d
            like to know. Every message reaches a senior advisor &mdash;
            never a bot, never a queue.
          </p>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="msg-form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="msg space-y-6 rounded-2xl border border-ink/15 bg-bone p-6 md:space-y-7 md:p-10"
              >
                <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                  <div className="qv-field">
                    <input
                      id="msg-name"
                      type="text"
                      placeholder=" "
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                    <label htmlFor="msg-name">Full Name</label>
                    {errors.name && (
                      <p className="mt-2 text-xs text-gold-dim">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="qv-field">
                    <input
                      id="msg-email"
                      type="email"
                      placeholder=" "
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                    <label htmlFor="msg-email">Email</label>
                    {errors.email && (
                      <p className="mt-2 text-xs text-gold-dim">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="qv-field qv-field--textarea">
                  <textarea
                    id="msg-body"
                    placeholder=" "
                    rows={5}
                    maxLength={MAX}
                    aria-invalid={!!errors.message}
                    {...register("message")}
                  />
                  <label htmlFor="msg-body">Your Message</label>
                  <div className="mt-2 flex items-center justify-between gap-4 text-xs">
                    <span className={errors.message ? "text-gold-dim" : "invisible"}>
                      {errors.message?.message ?? "placeholder"}
                    </span>
                    <span
                      className={`tabular-nums ${
                        messageValue.length > MAX - 100
                          ? "text-gold-dim"
                          : "text-ink/40"
                      }`}
                      aria-live="polite"
                    >
                      {messageValue.length} / {MAX}
                    </span>
                  </div>
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
                      {isSubmitting ? "Sending" : "Send Message"}
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
                    A senior advisor will reply within two business days.
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="msg-success"
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
                  Message sent.
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">
                  Thank you for reaching out. A senior advisor will be in
                  touch within two business days &mdash; expect a thoughtful,
                  human reply.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
