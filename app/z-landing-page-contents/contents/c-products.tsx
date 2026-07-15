import { ScrollReveal } from "@/app/components/scroll-reveal";
import Link from "next/link";
import Image from "next/image";
import { TypeLatest3Products } from "../types";

function formatProductPrice(price: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(price);
}

export default function ProductsSection({
  latest3Products,
}: {
  latest3Products: TypeLatest3Products[];
}) {
  return (
    <section id="products" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center">
          <h2 className="font-heading text-3xl font-bold text-cocoa-800 sm:text-4xl">
            Our Creations
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-cocoa-600">
            Each cupcake is decorated by hand with edible flowers and
            buttercream blooms — beautiful enough to admire, delicious enough to
            devour.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latest3Products.map((latest3Product, index) => (
            <ScrollReveal key={latest3Product.id} delay={index * 100}>
              <article className="group overflow-hidden rounded-2xl border border-blossom-100 bg-blossom-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={latest3Product.img_url}
                    alt={latest3Product.product_title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-xl font-semibold text-cocoa-800">
                      {latest3Product.product_title}
                    </h3>
                    <p className="shrink-0 rounded-full bg-blossom-100 px-3 py-1 font-accent text-sm font-semibold text-blossom-700">
                      {formatProductPrice(latest3Product.price)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-cocoa-600 truncate">
                    {latest3Product.caption}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <Link
            href="/products"
            target="/products"
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
  );
}
