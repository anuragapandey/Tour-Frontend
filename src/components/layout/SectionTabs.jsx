import { destinations } from "../../data/destinations";

const SectionTabs = ({ onSelectDestination }) => {
  return (
    <div className="hidden lg:block border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="section-shell flex flex-wrap items-center justify-center gap-1.5 py-2 sm:gap-2">
        {destinations.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectDestination(tab)}
            className="focus-ring rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 hover:bg-slate-50 cursor-pointer sm:text-sm"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionTabs;
