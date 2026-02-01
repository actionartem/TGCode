"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useInView } from "@/hooks/use-in-view";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden section-gradient-6">
      <div className="absolute inset-0 grid-background opacity-20" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t.faq.title}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {t.faq.items.map((item, index) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`glass-card rounded-xl overflow-hidden transition-all duration-500 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/30 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-48" : "max-h-0"
        }`}
      >
        <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
