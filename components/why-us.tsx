"use client";

import { useLanguage } from "@/lib/i18n";
import { useInView } from "@/hooks/use-in-view";
import { Check } from "lucide-react";

export function WhyUs() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden section-gradient-3">
      <div className="absolute inset-0 grid-background opacity-20" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t.whyUs.title}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {t.whyUs.items.map((item, index) => (
            <WhyUsItem key={item} text={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsItem({ text, index }: { text: string; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group flex items-start gap-4 p-6 rounded-xl glass-card hover:border-accent/30 transition-all duration-500 ${
        isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
        <Check className="w-4 h-4 text-accent" />
      </div>
      <p className="text-foreground/90 leading-relaxed pt-1">{text}</p>
    </div>
  );
}
