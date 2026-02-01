"use client";

import { useLanguage } from "@/lib/i18n";
import { useInView } from "@/hooks/use-in-view";

export function Tech() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t.tech.title}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {t.tech.tags.map((tag, index) => (
              <TechTag key={tag} tag={tag} index={index} />
            ))}
          </div>

          <p
            className={`text-center text-muted-foreground transition-all duration-700 delay-500 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            + {t.tech.extra}
          </p>
        </div>
      </div>
    </section>
  );
}

function TechTag({ tag, index }: { tag: string; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <span
      ref={ref}
      className={`px-4 py-2 rounded-full bg-secondary text-foreground font-medium transition-all duration-500 hover:bg-accent hover:text-accent-foreground cursor-default ${
        isInView ? "opacity-100 scale-100" : "opacity-0 scale-75"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {tag}
    </span>
  );
}
