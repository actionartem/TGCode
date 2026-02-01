"use client";

import React from "react"

import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { ArrowRight, ChevronDown } from "lucide-react";

function MagneticButton({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-btn inline-flex items-center gap-2 ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </a>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      setTilt({ x: y * 2, y: -x * 2 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-gradient-1">
      {/* Animated background */}
      <div className="absolute inset-0 grid-background opacity-30" />
      <div className="absolute inset-0 tech-lines opacity-20" />
      
      {/* Morphing blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 animate-morph blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 animate-morph blur-3xl" style={{ animationDelay: "4s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 animate-morph blur-3xl" style={{ animationDelay: "2s" }} />
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-4 h-4 border border-accent/30 rotate-45 animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-32 right-[15%] w-6 h-6 border border-accent/20 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-[20%] w-3 h-3 bg-accent/20 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-[10%] w-8 h-8 border border-accent/20 rotate-12 animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-40 right-[25%] w-2 h-2 bg-accent/30 rounded-full animate-float" style={{ animationDelay: "4s" }} />
        <div className="absolute top-40 left-[30%] w-5 h-5 border border-accent/10 rounded-full animate-float" style={{ animationDelay: "5s" }} />
      </div>
      
      {/* Rotating ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/5 rounded-full animate-spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/5 rounded-full animate-spin-slow pointer-events-none" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

      <div
        ref={containerRef}
        className="relative z-10 container mx-auto px-4 md:px-8 pt-24"
      >
        <div
          className="max-w-4xl mx-auto text-center"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-balance mb-10 animate-reveal">
            <span className="inline-block hover:text-gradient transition-all duration-300">
              {t.hero.title}
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 stagger-children">
            <MagneticButton
              href="#contact"
              className="px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-accent hover:text-accent-foreground transition-colors glow-pulse hover-scale"
            >
              {t.hero.cta}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              href="#cases"
              className="px-8 py-4 border border-border text-foreground font-medium rounded-full hover:border-accent hover:text-accent transition-colors gradient-border hover-scale"
            >
              {t.hero.ctaSecondary}
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-muted-foreground" size={24} />
      </div>
    </section>
  );
}
