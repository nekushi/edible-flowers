import { ScrollReveal } from "@/app/components/scroll-reveal";
import { TypeLatest3Products } from "../types";
import Image from "next/image";
import Link from "next/link";

export default function WhatsNewSection({
  latestProduct,
}: {
  latestProduct: TypeLatest3Products;
}) {
  return (
    <section
      id="whats-new"
      className="border-y border-blossom-200/60 bg-blossom-100/40 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center">
          <span className="inline-block rounded-full bg-blossom-500 px-4 py-1 font-accent text-xs font-semibold uppercase tracking-wider text-white">
            New
          </span>
          <h2 className="font-heading mt-4 text-3xl font-bold text-cocoa-800 sm:text-4xl">
            What&apos;s New
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cocoa-600">
            Fresh from the kitchen — our latest floral cupcake creation.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100} className="mt-10">
          <article className="overflow-hidden rounded-2xl border border-blossom-200 bg-white shadow-md">
            <div className="grid items-center gap-0 lg:grid-cols-2">
              <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-[22rem]">
                <Image
                  src={latestProduct.img_url}
                  alt={latestProduct.product_title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-blossom-500 px-3 py-1 font-accent text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                  Recently Added
                </span>
              </div>
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="font-accent text-sm font-semibold uppercase tracking-widest text-blossom-600">
                  Newest
                </p>
                <h3 className="font-heading mt-2 text-2xl font-bold text-cocoa-800 sm:text-3xl">
                  {latestProduct.product_title}
                </h3>
                <p className="mt-4 leading-relaxed text-cocoa-600">
                  {latestProduct.caption}
                </p>
                <Link
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-blossom-500 px-6 py-3 font-accent text-sm font-semibold text-white transition-all hover:bg-blossom-600"
                >
                  Order This Product
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
              </div>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
