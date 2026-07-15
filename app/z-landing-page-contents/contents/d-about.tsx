import { ScrollReveal } from "@/app/components/scroll-reveal";
import Image from "next/image";

export default function AboutSection() {
  return (
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
              Welcome to Edible Blossoms — where every cupcake tells a story.
              Based in Louisville, KY, Sheena pours her heart into every batch,
              crafting edible flower cupcakes that are as stunning as they are
              delicious.
            </p>
            <p className="mt-4 leading-relaxed text-cocoa-700">
              Whether it&apos;s a graduation party, wedding shower, or a special
              celebration, each order is made fresh and customized with care.
              Because the best sweets are the ones made with love.
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
  );
}
