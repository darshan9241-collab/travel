import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import { resolvePhoto } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Darshan R. Share a travel story, collaborate, or simply say hello.",
};

const headerPhoto = resolvePhoto({
  src: "/images/pages/contact-header.png",
  alt: "A window view of mountains and a lake, with coffee and a travel journal",
  tone: "gold",
  variant: "backwater",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Get In Touch"
        heading="Let's Connect"
        description="Have a travel story to share, want to collaborate, or simply want to say hello? I'd love to hear from you."
        photo={headerPhoto}
      />

      <section className="bg-white-warm py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <RevealOnScroll className="lg:col-span-5">
            <span className="block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Reach Me Directly
            </span>
            <p className="mt-4 font-serif text-2xl text-forest">Darshan R.</p>
            <p className="mt-1 text-forest/70">Bangalore, India</p>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href="mailto:wanderlouge@gmail.com"
                className="group inline-flex w-fit items-center gap-2 whitespace-nowrap font-sans text-lg font-medium text-forest transition-colors hover:text-terracotta"
              >
                wanderlouge@gmail.com
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="tel:+918310859564"
                className="group inline-flex w-fit items-center gap-2 whitespace-nowrap font-sans text-lg font-medium tracking-wide text-forest transition-colors hover:text-terracotta"
              >
                +91 83108 59564
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:wanderlouge@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-medium tracking-wide text-white-warm transition-colors duration-300 hover:bg-terracotta-dark"
              >
                Email Me →
              </a>
              <a
                href="tel:+918310859564"
                className="inline-flex items-center justify-center gap-2 border border-forest/30 px-7 py-3.5 text-sm font-medium tracking-wide text-forest transition-colors duration-300 hover:bg-forest hover:text-white-warm"
              >
                Call Me →
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100} className="lg:col-span-7">
            <div className="border border-forest/10 bg-cream/40 p-8 sm:p-10">
              <ContactForm />
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
