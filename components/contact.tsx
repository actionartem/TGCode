"use client";

import React from "react"

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useInView } from "@/hooks/use-in-view";
import { Send, Check } from "lucide-react";

export function Contact() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative section-gradient-1">
      <div className="absolute inset-0 grid-background opacity-20" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-balance">
            {t.contact.title}
          </h2>
          <p className="text-muted-foreground text-center mb-12 text-pretty">
            {t.contact.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t.contact.form.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t.contact.form.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label
                  htmlFor="telegram"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t.contact.form.telegram}
                </label>
                <input
                  type="text"
                  id="telegram"
                  name="telegram"
                  placeholder={t.contact.form.telegramPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t.contact.form.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t.contact.form.phonePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t.contact.form.messagePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all ${
                  isSubmitted
                    ? "bg-green-500 text-white"
                    : "bg-foreground text-background hover:bg-accent hover:text-accent-foreground glow-accent"
                } disabled:opacity-70`}
              >
                {isSubmitted ? (
                  <>
                    <Check size={18} />
                    {t.contact.form.success}
                  </>
                ) : isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {t.contact.form.submit}
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
