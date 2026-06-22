import Image from "next/image";
import Link from "next/link";
import { LandingNav } from "./components/landing-nav";
import { ScrollReveal } from "./components/scroll-reveal";

const products = [
  {
    name: "Rose Garden Cupcakes",
    description:
      "Delicate buttercream roses atop vanilla cupcakes — perfect for celebrations.",
    image: "/edible-flowers/sample-product-1.jpg",
  },
  {
    name: "Spring Blossom Set",
    description:
      "A mix of pastel floral designs with edible petals and soft, fluffy frosting.",
    image: "/edible-flowers/sample-product-2.jpg",
  },
  {
    name: "Custom Floral Bouquet",
    description:
      "Handcrafted to match your theme — ideal for weddings, showers, and parties.",
    image: "/edible-flowers/sample-product-3.jpg",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61586604118651",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/edibleblossoms.byshe",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:shepabayo@gmail.com",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function EfLandingPage() {
  return (
    <>
      <LandingNav />

      <main>
        {/* Hero */}
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
                I make Edible Flower Cupcakes. Handcrafted sweets made with
                love.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center rounded-full bg-blossom-500 px-6 py-3 font-accent text-sm font-semibold text-white shadow-md transition-all hover:bg-blossom-600 hover:shadow-lg"
                >
                  View Our Cupcakes
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

        {/* Products */}
        <section id="products" className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center">
              <h2 className="font-heading text-3xl font-bold text-cocoa-800 sm:text-4xl">
                Our Creations
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-cocoa-600">
                Each cupcake is decorated by hand with edible flowers and
                buttercream blooms — beautiful enough to admire, delicious
                enough to devour.
              </p>
            </ScrollReveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <ScrollReveal key={product.name} delay={index * 100}>
                  <article className="group overflow-hidden rounded-2xl border border-blossom-100 bg-blossom-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="font-heading text-xl font-semibold text-cocoa-800">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-cocoa-600">
                        {product.description}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal className="mt-12 text-center">
              <Link
                href="/v1/products"
                className="inline-flex items-center gap-2 rounded-full bg-cocoa-700 px-8 py-3 font-accent text-sm font-semibold text-white transition-all hover:bg-cocoa-800"
              >
                See More
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="bg-linear-to-b from-blossom-50 to-blossom-100/60 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <ScrollReveal>
                <div className="relative mx-auto max-w-md lg:mx-0">
                  <Image
                    src="/edible-flowers/sample-product-2.jpg"
                    alt="Handcrafted floral cupcakes by Sheena"
                    width={560}
                    height={420}
                    className="rounded-2xl object-cover shadow-lg ring-4 ring-white"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <h2 className="font-heading text-3xl font-bold text-cocoa-800 sm:text-4xl">
                  About Sheena
                </h2>
                <p className="mt-4 leading-relaxed text-cocoa-700">
                  Welcome to Edible Blossoms — where every cupcake tells a
                  story. Based in Louisville, KY, Sheena pours her heart into
                  every batch, crafting edible flower cupcakes that are as
                  stunning as they are delicious.
                </p>
                <p className="mt-4 leading-relaxed text-cocoa-700">
                  Whether it&apos;s a graduation party, wedding shower, or a
                  special celebration, each order is made fresh and customized
                  with care. Because the best sweets are the ones made with
                  love.
                </p>
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-blossom-200 bg-white/70 p-4">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-blossom-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-sm text-cocoa-600">
                    Pindell Ave, Louisville, KY 40217
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="rounded-2xl border border-blossom-100 bg-blossom-50 p-8 shadow-sm sm:p-10">
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
                  <Image
                    src="/edible-flowers/feedback-pfp-1.jpg"
                    alt="Lissy Wines"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-blossom-200"
                  />
                  <div className="mt-4 sm:mt-0 sm:ml-6">
                    <svg
                      className="mx-auto h-8 w-8 text-blossom-300 sm:mx-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="mt-3 text-base leading-relaxed text-cocoa-700 sm:text-lg">
                      Sheena made 24 cupcakes for my son&apos;s graduation party
                      and not only were they stunning, they were delicious! 10
                      out of 10 delicious and easy to work with! Thanks again!
                    </blockquote>
                    <p className="mt-4 font-accent text-sm font-semibold text-blossom-600">
                      — Lissy Wines
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-blossom-100/50 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center">
              <h2 className="font-heading text-3xl font-bold text-cocoa-800 sm:text-4xl">
                Get in Touch
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-cocoa-600">
                Ready to order or have a custom request? Send a message and
                Sheena will get back to you.
              </p>
            </ScrollReveal>

            <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <ScrollReveal delay={100}>
                <form
                  action={`mailto:shepabayo@gmail.com`}
                  method="post"
                  encType="text/plain"
                  className="rounded-2xl border border-blossom-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-accent text-sm font-medium text-cocoa-700"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-1.5 w-full rounded-lg border border-blossom-200 bg-blossom-50/50 px-4 py-2.5 text-sm text-cocoa-800 outline-none transition-colors focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-accent text-sm font-medium text-cocoa-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1.5 w-full rounded-lg border border-blossom-200 bg-blossom-50/50 px-4 py-2.5 text-sm text-cocoa-800 outline-none transition-colors focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block font-accent text-sm font-medium text-cocoa-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="mt-1.5 w-full resize-y rounded-lg border border-blossom-200 bg-blossom-50/50 px-4 py-2.5 text-sm text-cocoa-800 outline-none transition-colors focus:border-blossom-400 focus:ring-2 focus:ring-blossom-200"
                        placeholder="Tell us about your event, how many cupcakes you need, and any design ideas..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-full bg-blossom-500 py-3 font-accent text-sm font-semibold text-white transition-all hover:bg-blossom-600 sm:w-auto sm:px-8"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="flex flex-col justify-center space-y-6">
                  <div className="rounded-2xl border border-blossom-200 bg-white p-6">
                    <h3 className="font-heading text-lg font-semibold text-cocoa-800">
                      Contact Details
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-cocoa-600">
                      <li className="flex items-center gap-3">
                        <svg
                          className="h-5 w-5 shrink-0 text-blossom-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <a
                          href="tel:+17816584116"
                          className="transition-colors hover:text-blossom-600"
                        >
                          +1 781-658-4116
                        </a>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg
                          className="h-5 w-5 shrink-0 text-blossom-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <a
                          href="mailto:shepabayo@gmail.com"
                          className="transition-colors hover:text-blossom-600"
                        >
                          shepabayo@gmail.com
                        </a>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-blossom-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>
                          Pindell Ave, Louisville, KY 40217
                          <br />
                          <span className="text-xs text-cocoa-500">
                            38.2107° N, 85.7310° W
                          </span>
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-blossom-200 bg-white text-cocoa-600 transition-all hover:border-blossom-400 hover:bg-blossom-50 hover:text-blossom-600"
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-blossom-200 bg-cocoa-800 py-8 text-blossom-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="font-heading text-lg font-semibold">
            Edible Blossoms by Sheena
          </p>
          <p className="text-center text-sm text-blossom-200/80">
            &copy; {new Date().getFullYear()} Edible Blossoms. Cupcakes made
            with love.
          </p>
        </div>
      </footer>
    </>
  );
}
