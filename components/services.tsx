"use client";

import { useLanguage } from "@/lib/i18n";
import { useInView } from "@/hooks/use-in-view";
import {
  Globe,
  Building2,
  Bot,
  Smartphone,
  LayoutDashboard,
  Sparkles,
  Plug,
  Wrench,
} from "lucide-react";

const icons = [
  Globe,
  Building2,
  Bot,
  Smartphone,
  LayoutDashboard,
  Sparkles,
  Plug,
  Wrench,
];

export function Services() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden section-gradient-2">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      
      <div className="container mx-auto px-4 md:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t.services.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {t.services.items.map((service, index) => {
            const Icon = icons[index] || Globe;
            return (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                Icon={Icon}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  description,
  Icon,
  index,
}: {
  title: string;
  description: string;
  Icon: typeof Globe;
  index: number;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group relative p-6 rounded-2xl glass-card cursor-pointer transition-all duration-500 hover:border-accent/30 hover-scale ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
