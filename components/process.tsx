"use client";

import { useLanguage } from "@/lib/i18n";
import { useInView } from "@/hooks/use-in-view";

export function Process() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden section-gradient-5">
      <div className="absolute inset-0 grid-background opacity-20" />
      <div className="absolute inset-0 tech-lines opacity-10" />
      
      {/* Floating decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/5 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t.process.title}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {t.process.steps.map((step, index) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  isEven,
}: {
  step: { title: string; description: string };
  index: number;
  isEven: boolean;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative flex items-center mb-12 last:mb-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Circle */}
      <div
        className={`absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-background border-2 border-accent flex items-center justify-center z-10 transform -translate-x-1/2 transition-all duration-500 glow-pulse ${
          isInView ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <span className="text-accent font-bold">{step.title}</span>
      </div>

      {/* Content */}
      <div
        className={`ml-20 md:ml-0 md:w-1/2 ${
          isEven ? "md:pr-16 md:text-right" : "md:pl-16"
        } transition-all duration-500 ${
          isInView
            ? "opacity-100 translate-x-0"
            : isEven
              ? "opacity-0 translate-x-10"
              : "opacity-0 -translate-x-10"
        }`}
        style={{ transitionDelay: `${index * 150 + 100}ms` }}
      >
        <div
          className={`glass-card p-6 rounded-xl inline-block gradient-border hover-scale transition-all duration-300 ${
            isEven ? "md:ml-auto" : ""
          }`}
        >
          <p className="text-foreground/90">{step.description}</p>
        </div>
      </div>
    </div>
  );
}
