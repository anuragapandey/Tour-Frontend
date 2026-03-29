const LocationMap = ({ location }) => {
  const safeLocation = location?.trim() || "India Gate, New Delhi";
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(safeLocation)}&output=embed`;

  return (
    <div className="soft-card self-start overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">Live Map View</p>
        <h3 className="mt-1 text-base font-bold text-slate-900">{safeLocation}</h3>
      </div>

      <iframe
        title={`Map of ${safeLocation}`}
        src={mapUrl}
        className="h-[320px] w-full border-0 sm:h-[360px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default LocationMap;


