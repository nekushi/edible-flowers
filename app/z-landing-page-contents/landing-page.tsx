import { TypeLatest3Products } from "./types";
import { LandingNav } from "../components/landing-nav";
import HeroSection from "./contents/a-hero";
import WhatsNewSection from "./contents/b-whats-new";
import ProductsSection from "./contents/c-products";
import AboutSection from "./contents/d-about";
import TestimonialSection from "./contents/e-testimonial";
import ContactSection from "./contents/f-contact";
import FooterSection from "./contents/g-footer";

export default function EfLandingPage({
  latest3Products,
}: {
  latest3Products: TypeLatest3Products[];
}) {
  return (
    <>
      <LandingNav />

      <main>
        {/* Hero */}
        <HeroSection />

        {/* What's New */}
        <WhatsNewSection latestProduct={latest3Products[0]} />

        {/* Products */}
        <ProductsSection latest3Products={latest3Products} />

        {/* About */}
        <AboutSection />

        {/* Testimonial */}
        <TestimonialSection />

        {/* Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </>
  );
}
