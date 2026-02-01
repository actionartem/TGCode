"use client";

import { LanguageProvider } from "@/lib/i18n";
import { CustomCursor } from "@/components/custom-cursor";
import { Preloader } from "@/components/preloader";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { WhyUs } from "@/components/why-us";
import { Cases } from "@/components/cases";
import { Process } from "@/components/process";
import { FAQ } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Tech } from "@/components/tech"; // Import the Tech component

export default function Home() {
  return (
    <LanguageProvider>
      <Preloader />
      <CustomCursor />
      <div className="noise-overlay" />
      
      <Header />
      
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Cases />
<Process />
        <FAQ />
        <Contact />
      </main>
      
      <Footer />
    </LanguageProvider>
  );
}
