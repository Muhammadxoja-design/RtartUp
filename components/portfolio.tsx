"use client";

import { useRef, useState, useEffect } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

export function Portfolio() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: "TechFlow Platform",
      category: "SaaS Platform",
      image: "/dashboard-interface.jpg",
      tags: ["SaaS", "Engineering"],
      description:
        "A scalable analytics platform providing real-time insights for enterprise teams.",
    },
    {
      id: 2,
      title: "LumaAI Core System",
      category: "AI Infrastructure",
      image: "/ai-platform.jpg",
      tags: ["AI", "Backend"],
      description:
        "Core system architecture for an AI startup, focused on performance and scalability.",
    },
    {
      id: 3,
      title: "Nexus Product",
      category: "Startup Product",
      image: "/product-platform.jpg",
      tags: ["Product", "Growth"],
      description:
        "A digital product connecting users and businesses through automated workflows.",
    },
    {
      id: 4,
      title: "Aurora Commerce Engine",
      category: "E-Commerce System",
      image: "/ecommerce-store.jpg",
      tags: ["Commerce", "Scalability"],
      description:
        "A robust commerce engine built to handle growth, payments, and user management.",
    },
    {
      id: 5,
      title: "Zenith Internal Tools",
      category: "Internal Systems",
      image: "/corporate-website.jpg",
      tags: ["Automation", "Systems"],
      description:
        "Internal tools designed to streamline operations and improve decision-making.",
    },
    {
      id: 6,
      title: "PulseHealth SaaS",
      category: "HealthTech SaaS",
      image: "/healthcare-saas-app.jpg",
      tags: ["HealthTech", "SaaS"],
      description:
        "A health monitoring SaaS platform built with reliability and data security in mind.",
    },
  ];

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-4">
          <div>
            <h2 className="text-5xl sm:text-6xl font-serif font-bold mb-4">
              Our Work
            </h2>
            <p className="text-xl text-foreground/70">
              Real products built for real-world scale
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 text-primary hover:text-primary/80 transition-colors font-medium">
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
              }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-muted aspect-video mb-4">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <button className="flex items-center gap-2 text-primary font-medium">
                    View Case
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground/60">{project.category}</p>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
