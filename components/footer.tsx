"use client";

import { useLanguage } from "@/lib/i18n";
import { Mail, Phone, Send } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <a
              href="#"
              className="text-2xl font-bold tracking-tight text-foreground hover:text-accent transition-colors"
            >
              TG Code<span className="text-accent">.</span>
            </a>
            <p className="mt-2 text-sm text-muted-foreground max-w-md text-pretty">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="mailto:support@tg-code.ru"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail size={18} />
              <span className="text-sm">support@tg-code.ru</span>
            </a>
            <a
              href="https://t.me/TgCodeStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Send size={18} />
              <span className="text-sm">@TgCodeStudio</span>
            </a>
            <a
              href="tel:+79933598322"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Phone size={18} />
              <span className="text-sm">+7 (993) 359-83-22</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} TG Code Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
