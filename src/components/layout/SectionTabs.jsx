import { useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { destinations } from "../../data/destinations";

const SectionTabs = ({ onSelectDestination, activeDestinationId }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current && activeDestinationId) {
      const container = scrollContainerRef.current;
      const activeEl = container.querySelector(`[data-id="${activeDestinationId}"]`);
      if (activeEl) {
        const containerWidth = container.clientWidth;
        const activeElWidth = activeEl.clientWidth;
        const activeElLeft = activeEl.offsetLeft;
        
        const targetScrollLeft = activeElLeft - (containerWidth / 2) + (activeElWidth / 2);
        
        container.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth"
        });
      }
    }
  }, [activeDestinationId]);

  return (
    <div className="hidden lg:block border-b border-slate-200 bg-white/90 backdrop-blur sticky top-14 z-40 shadow-sm">
      <div className="section-shell relative flex items-center py-2 px-10">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 hover:scale-105 cursor-pointer"
          aria-label="Scroll left"
        >
          <FiChevronLeft className="text-lg" />
        </button>

        {/* Scrollable Row */}
        <div
          ref={scrollContainerRef}
          className="flex flex-row items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth w-full py-1.5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {destinations.map((tab) => {
            const isActive = tab.id === activeDestinationId;
            return (
              <button
                key={tab.id}
                data-id={tab.id}
                onClick={() => onSelectDestination(tab)}
                className={`focus-ring rounded-full border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer shrink-0 ${
                  isActive
                    ? "border-teal-600 bg-teal-600 text-white shadow-md shadow-teal-600/10"
                    : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:text-teal-700 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 hover:scale-105 cursor-pointer"
          aria-label="Scroll right"
        >
          <FiChevronRight className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default SectionTabs;
