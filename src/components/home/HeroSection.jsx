import { useState, useEffect } from "react";
import { FiMapPin, FiPhone } from "react-icons/fi";
import logoMark from "../../assets/logo.jpeg";
import { brand, contactDetails } from "../../data/siteContent";
import { destinations } from "../../data/destinations";

const HeroSection = ({ onSelectDestination, activeDestinationId, setActiveDestinationId, isModalOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const currentDestination =
    destinations.find((d) => d.id === activeDestinationId) || destinations[0];

  useEffect(() => {
    if (isHovered || isModalOpen) return;
    const interval = setInterval(() => {
      const currentIndex = destinations.findIndex((d) => d.id === activeDestinationId);
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % destinations.length;
      if (setActiveDestinationId) {
        setActiveDestinationId(destinations[nextIndex].id);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeDestinationId, setActiveDestinationId, isHovered, isModalOpen]);

  return (
    <section className="section-shell py-2 md:py-3">
      <div className="relative">
        {/* Subtle background glow */}
        <div className="absolute -inset-4 rounded-3xl bg-teal-500/10 blur-3xl" />

        {/* Interactive Full-Width Hero Container */}
        <article
          className="relative w-full h-[280px] sm:h-[350px] md:h-[420px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-white shadow-xl cursor-pointer group transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onSelectDestination && onSelectDestination(currentDestination)}
        >
          {/* Slide Image */}
          <div className="absolute inset-0 h-full w-full bg-slate-950">
            <img
              key={currentDestination.id}
              src={currentDestination.images[0]}
              alt={currentDestination.label}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-103 animate-fade-in"
            />
          </div>

          {/* Dark Vignette Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-transparent" />

          {/* Brand Logo Overlay (Top-Left) */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-slate-900/60 border border-white/20 px-3 py-1.5 backdrop-blur-md">
            <img src={logoMark} alt={`${brand.name} logo`} className="h-5 w-5 rounded-full border border-white/30" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-100">{brand.name}</p>
          </div>

          {/* Featured Badge (Top-Right) */}
          <div className="absolute top-4 right-4 rounded-full bg-white/20 border border-white/10 px-3 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-md uppercase">
            Featured Tour
          </div>

          {/* Destination Details (Bottom Overlay) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-8">
            <div className="max-w-2xl space-y-1.5 sm:space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-300 sm:text-sm">
                {currentDestination.tagline}
              </p>
              <h1 className="text-2xl font-extrabold leading-none sm:text-4xl md:text-5xl tracking-tight">
                {currentDestination.label}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 sm:pt-3 text-xs sm:text-sm text-slate-200 border-t border-white/10 mt-3 sm:mt-4">
                <span className="font-semibold">{currentDestination.duration}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                <span>Best Time: {currentDestination.bestTime}</span>
                <span className="ml-auto inline-flex items-center gap-1.5 font-bold text-teal-300 group-hover:text-teal-200 transition-colors">
                  Explore Details <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </div>
          </div>

          {/* Auto-Resetting Progress Bar */}
          <div
            key={`progress-${currentDestination.id}`}
            className="absolute bottom-0 left-0 h-1.5 bg-teal-400 z-20 animate-progress"
            style={{ animationPlayState: (isHovered || isModalOpen) ? "paused" : "running" }}
          />
        </article>
      </div>
    </section>
  );
};

export default HeroSection;
