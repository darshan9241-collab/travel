"use client";

import { useId, useState, type FormEvent } from "react";
import Container from "./Container";
import RevealOnScroll from "./RevealOnScroll";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const inputId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    // Frontend-only for now — wire up to an email provider when ready.
    setStatus("submitted");
    setEmail("");
  }

  return (
    <section className="bg-forest-dark py-24 sm:py-28">
      <Container className="max-w-2xl text-center">
        <RevealOnScroll>
          <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            The Journal
          </span>
          <h2 className="font-serif text-3xl text-white-warm sm:text-4xl">
            Stay Along For The Journey
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-cream/80">
            New stories, photographs and travel notes, delivered to your
            inbox as they&apos;re published.
          </p>

          {status === "submitted" ? (
            <p className="mt-8 font-serif text-lg italic text-gold" role="status">
              Thank you, you&apos;re on the list.
            </p>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                noValidate
              >
                <label htmlFor={inputId} className="sr-only">
                  Email address
                </label>
                <input
                  id={inputId}
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  className="w-full border border-white-warm/25 bg-transparent px-5 py-3.5 text-sm text-white-warm placeholder:text-cream/50 focus-visible:border-gold"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap bg-terracotta px-7 py-3.5 text-sm font-medium tracking-wide text-white-warm transition-colors duration-300 hover:bg-terracotta-dark"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-xs uppercase tracking-[0.15em] text-cream/45">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
