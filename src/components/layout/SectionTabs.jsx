import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { destinations } from "../../data/destinations";

const SectionTabs = ({ onSelectDestination }) => {
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
          {destinations.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectDestination(tab)}
              className="focus-ring rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 hover:bg-slate-50 cursor-pointer shrink-0"
            >
              {tab.label}
            </button>
          ))}
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
