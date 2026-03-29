const sectionTabs = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const SectionTabs = () => {
  return (
    <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="section-shell flex flex-wrap items-center justify-center gap-1.5 py-2 sm:gap-2">
        {sectionTabs.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className="focus-ring rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 sm:text-sm"
          >
            {tab.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SectionTabs;
