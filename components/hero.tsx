"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
              Collective{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                excellence
              </span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              We craft digital experiences that inspire, engage, and transform
              brands into industry leaders. Combining strategic thinking with
              exceptional design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all hover:gap-3 font-medium">
                Explore Our Work
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 border border-primary/30 text-primary rounded-full hover:bg-primary/5 transition-colors font-medium">
                <Play className="w-5 h-5" />
                Watch Reel
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div
            className={`relative h-100 lg:h-full min-h-96 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl"></div>
            <img
              src="/creative-studio-workspace.png"
              alt="Creative workspace"
              className="w-full h-full object-cover rounded-3xl
             filter brightness-110 contrast-110 saturate-110
             drop-shadow-xl"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent rounded-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
