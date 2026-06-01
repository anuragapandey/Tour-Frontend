const SectionHeading = ({ eyebrow, title, description, align = "left" }) => {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignment} space-y-2`}>
      {eyebrow ? (
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-600">{eyebrow}</p>
      ) : null}
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
      {description ? <p className="max-w-3xl text-sm text-slate-600 sm:text-base">{description}</p> : null}
    </div>
  );
};

export default SectionHeading;


