"use client";

import { useRef, useState, useEffect } from "react";
import { Code, Brain, Zap, Layers } from "lucide-react";

export function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Layers,
      title: "Product Development",
      description:
        "We take products from concept to production, focusing on scalability, reliability, and real-world impact.",
    },
    {
      icon: Code,
      title: "Software Engineering",
      description:
        "We build maintainable, high-performance systems using modern technologies and proven architectures.",
    },
    {
      icon: Brain,
      title: "Startup Strategy",
      description:
        "We help shape technical and product strategy, validate ideas, and make smart early-stage decisions.",
    },
    {
      icon: Zap,
      title: "Automation & Scaling",
      description:
        "We automate processes and design systems that are ready to scale as your product grows.",
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            id="services-heading"
            className="text-5xl sm:text-6xl font-serif font-bold mb-6"
          >
            What We Do
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            We build scalable digital products through technology, execution,
            and clear strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group p-8 bg-card hover:bg-card/80 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:from-primary/40 group-hover:to-accent/40">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
