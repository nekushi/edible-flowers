import { ScrollReveal } from "@/app/components/scroll-reveal";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-linear-to-b from-blossom-100 via-blossom-50 to-blossom-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blossom-200/40 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blossom-300/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-32">
        <ScrollReveal>
          <p className="font-accent text-sm font-semibold uppercase tracking-widest text-blossom-600">
            Louisville, Kentucky
          </p>
          <h1 className="font-heading mt-3 text-4xl font-bold leading-tight text-cocoa-800 sm:text-5xl lg:text-6xl">
            Edible Blossoms{" "}
            <span className="block text-blossom-600">by Sheena</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-cocoa-700 sm:text-lg">
            I make Edible Flower Cupcakes. Handcrafted sweets made with love.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#products"
              className="inline-flex items-center justify-center rounded-full bg-blossom-500 px-6 py-3 font-accent text-sm font-semibold text-white shadow-md transition-all hover:bg-blossom-600 hover:shadow-lg"
            >
              View Our Products
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-blossom-300 bg-white/60 px-6 py-3 font-accent text-sm font-semibold text-cocoa-700 transition-all hover:border-blossom-400 hover:bg-white"
            >
              Order Now
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal
          delay={150}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-blossom-200/50 blur-sm" />
            <Image
              src="/edible-flowers/logo.jpg"
              alt="Edible Blossoms by Sheena — cupcakes made with love"
              width={420}
              height={420}
              className="relative w-64 rounded-full object-cover shadow-xl ring-4 ring-white sm:w-80 lg:w-[22rem]"
              priority
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
