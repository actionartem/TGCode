"use client";

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/i18n";
import { useInView } from "@/hooks/use-in-view";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface CaseItem {
  title: string;
  description: string;
  category: string;
  stack: string[];
  results: string[];
}

export function Cases() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const itemsCount = t.cases.items.length;
  const visibleItems = 3;

  const goToSlide = useCallback((index: number) => {
    const maxIndex = itemsCount - 1;
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);
  }, [itemsCount]);

  const scrollPrev = () => goToSlide(currentIndex - 1);
  const scrollNext = () => goToSlide(currentIndex + 1);
  
  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < itemsCount - 1;

  // Auto-scroll animation
  useEffect(() => {
    if (carouselRef.current && !isDragging) {
      const cardWidth = carouselRef.current.offsetWidth / visibleItems;
      const gap = 24;
      carouselRef.current.scrollTo({
        left: currentIndex * (cardWidth + gap),
        behavior: "smooth",
      });
    }
  }, [currentIndex, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = "grabbing";
    carouselRef.current.style.scrollBehavior = "auto";
  };

  const handleMouseUp = () => {
    if (!carouselRef.current) return;
    setIsDragging(false);
    carouselRef.current.style.cursor = "grab";
    carouselRef.current.style.scrollBehavior = "smooth";
    
    // Snap to nearest slide
    const cardWidth = carouselRef.current.offsetWidth / visibleItems;
    const gap = 24;
    const newIndex = Math.round(carouselRef.current.scrollLeft / (cardWidth + gap));
    goToSlide(newIndex);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.scrollBehavior = "auto";
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Cleanup animation frame
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section id="cases" className="py-24 md:py-32 relative overflow-hidden section-gradient-4">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      
      <div className="container mx-auto px-4 md:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t.cases.title}
            </h2>
            
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={`p-3 rounded-full border border-border transition-all hover-scale ${
                  canScrollPrev 
                    ? "hover:border-accent hover:text-accent" 
                    : "opacity-40 cursor-not-allowed"
                }`}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={`p-3 rounded-full border border-border transition-all hover-scale ${
                  canScrollNext 
                    ? "hover:border-accent hover:text-accent" 
                    : "opacity-40 cursor-not-allowed"
                }`}
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Cases Carousel */}
        <div className="relative overflow-visible">
          {/* Gradient Fades */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            className="flex gap-6 overflow-x-auto overflow-y-visible scrollbar-hide py-4 cursor-grab select-none"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {t.cases.items.map((caseItem, index) => (
              <CaseCard
                key={caseItem.title}
                caseItem={caseItem}
                index={index}
                onClick={() => !isDragging && setSelectedCase(caseItem)}
                isActive={index === currentIndex}
              />
            ))}
          </div>
          
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {t.cases.items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-accent" 
                    : "w-2 bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCase && (
        <CaseModal
          caseItem={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
    </section>
  );
}

function CaseCard({
  caseItem,
  index,
  onClick,
  isActive,
}: {
  caseItem: CaseItem;
  index: number;
  onClick: () => void;
  isActive: boolean;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`group relative flex-shrink-0 w-[85vw] md:w-[calc(33.333%-16px)] min-w-[280px] p-6 rounded-2xl glass-card cursor-pointer transition-all duration-500 hover:border-accent/30 overflow-hidden ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${isActive ? "border-accent/30" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent">
            {caseItem.category}
          </span>
          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
          {caseItem.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{caseItem.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {caseItem.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {caseItem.stack.length > 3 && (
            <span className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">
              +{caseItem.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function CaseModal({
  caseItem,
  onClose,
}: {
  caseItem: CaseItem;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <div
        className="relative w-full max-w-lg glass-card rounded-2xl p-8 animate-in fade-in zoom-in-95 duration-300 border border-accent/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors hover-scale"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/20 text-accent">
          {caseItem.category}
        </span>

        <h3 className="text-2xl font-bold mt-4 mb-2">{caseItem.title}</h3>
        <p className="text-muted-foreground mb-6">{caseItem.description}</p>

        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 text-foreground/80">
            Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {caseItem.stack.map((tech, i) => (
              <span
                key={tech}
                className="text-sm px-3 py-1 rounded-full bg-secondary text-foreground hover-scale"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground/80">
            {language === "ru" ? "Результаты" : "Results"}
          </h4>
          <ul className="space-y-2 stagger-children">
            {caseItem.results.map((result) => (
              <li
                key={result}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0 glow-pulse" />
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
