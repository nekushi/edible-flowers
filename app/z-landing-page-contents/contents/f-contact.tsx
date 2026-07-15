"use client";

import { ScrollReveal } from "@/app/components/scroll-reveal";
import { socialLinks } from "../social-links";
import { ApiResponse, TypeClientFormRequest } from "../types";
import { toast } from "react-toastify";
import { useRef, useState } from "react";

export default function ContactSection() {
  const [clientForm, setClientForm] = useState<TypeClientFormRequest>({
    name: "",
    email: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleClientFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setClientForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(clientForm);
  };

  const handleClientFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      const response = await toast.promise(
        (async () => {
          const res = await fetch(`/api/v1/client-email-request`, {
            method: "POST",
            body: JSON.stringify(clientForm),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            throw new Error("Failed to submit inquiry");
          }

          const data: ApiResponse = await res.json();

          if (data.type === "error") {
            throw new Error(data.message);
          }

          return data;
        })(),
        {
          pending: "Sending...",
          success: {
            render({ data }: { data: { message: string } }) {
              return data.message;
            },
          },
          error: {
            render({ data }: { data: Error }) {
              return data.message;
            },
          },
        },
      );
    } catch (error) {
      console.log(`$ERROR: ${error}`);
      // toast.error(`An error occurred. Please try again. ${error}`);
      // toast.error(`${error}`);
    } finally {
      setClientForm((prev) => ({
        ...prev,
        ...clientForm,
        name: "",
        email: "",
        message: "",
      }));

      formRef.current?.reset();
    }
  };
  return (
    <section id="contact" className="bg-blossom-100/50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center">
          <h2 className="font-heading text-3xl font-bold text-cocoa-800 sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cocoa-600">
            Ready to order or have a custom request? Send a message and Sheena
            will get back to you.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal delay={100}>
            <form
              encType="text/plain"
              ref={formRef}
              onSubmit={handleClientFormSubmit}
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
                    defaultValue={clientForm.name}
                    onChange={handleClientFormChange}
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
                    defaultValue={clientForm.email}
                    onChange={handleClientFormChange}
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
                    defaultValue={clientForm.message}
                    onChange={handleClientFormChange}
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
  );
}
