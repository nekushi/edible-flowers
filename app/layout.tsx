import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Nunito } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  // headings
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  // body
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const nunito = Nunito({
  // body
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Edible Blossoms by Sheena",
  description:
    "Handcrafted edible flower cupcakes made with love in Louisville, KY.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${lato.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
