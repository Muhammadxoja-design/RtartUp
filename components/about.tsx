"use client";

import { useEffect, useRef, useState } from "react";

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "70+", label: "Projects Completed" },
    { number: "1+", label: "Years Experience" },
    { number: "20", label: "Team Members" },
    { number: "95%", label: "Client Satisfaction" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-serif font-bold mb-6">
            About <span className="text-primary">my 7 days at camp</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            We're a startup formed through an intensive camp, where strategists
            and technologists came together to build impactful digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <img
              src="/placeholder.jpg"
              alt="Our team"
              className="w-full rounded-2xl h-auto object-cover shadow-lg"
            />
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-4xl font-serif font-bold mb-6">
              Driven by Passion
            </h3>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              Born out of an intensive camp experience, we are a startup focused
              on building scalable digital products through technology,
              strategy, and execution. We turn ideas into real-world solutions
              that create measurable impact.
            </p>

            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              We value long-term collaboration, clear communication, and
              continuous growth. Every project is a step toward solving real
              problems and building products that matter.
            </p>

            <ul className="space-y-3">
              {[
                "Product Strategy",
                "Software Development",
                "Startup Engineering",
                "Scalable Digital Solutions",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-foreground/80"
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-background/50 rounded-xl hover:bg-background transition-colors"
            >
              <div
                className={`text-4xl sm:text-5xl font-serif font-bold text-primary mb-2 transition-all duration-1000 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {stat.number}
              </div>
              <p className="text-sm sm:text-base text-foreground/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
