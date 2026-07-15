import { ScrollReveal } from "@/app/components/scroll-reveal";
import Image from "next/image";

export default function TestimonialSection() {
  return (
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
                  Sheena made 24 cupcakes for my son&apos;s graduation party and
                  not only were they stunning, they were delicious! 10 out of 10
                  delicious and easy to work with! Thanks again!
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
  );
}
