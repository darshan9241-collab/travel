"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Frontend-only for now — connect to an email/form service when ready.
    setSubmitted(true);
    event.currentTarget.reset();
  }

  if (submitted) {
    return (
      <div className="border border-forest/15 bg-cream/60 p-8 sm:p-10" role="status">
        <p className="font-serif text-2xl text-forest">Thank you for reaching out.</p>
        <p className="mt-3 leading-relaxed text-forest/70">
          Your message has been noted. I&apos;ll get back to you at{" "}
          <a href="mailto:darshan9241@gmail.com" className="text-terracotta underline underline-offset-4">
            darshan9241@gmail.com
          </a>{" "}
          soon.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-terracotta transition-colors hover:text-terracotta-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-forest/70">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full border border-forest/20 bg-transparent px-4 py-3.5 text-forest placeholder:text-forest/40 focus-visible:border-terracotta"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-forest/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full border border-forest/20 bg-transparent px-4 py-3.5 text-forest placeholder:text-forest/40 focus-visible:border-terracotta"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-forest/70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none border border-forest/20 bg-transparent px-4 py-3.5 text-forest placeholder:text-forest/40 focus-visible:border-terracotta"
          placeholder="Tell me about your trip, story, or question..."
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-fit bg-terracotta px-8 py-3.5 text-sm font-medium tracking-wide text-white-warm transition-colors duration-300 hover:bg-terracotta-dark"
      >
        Send Message
      </button>
    </form>
  );
}
