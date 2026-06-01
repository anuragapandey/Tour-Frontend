import SectionHeading from "../common/SectionHeading.jsx";
import { hotelHighlights } from "../../data/siteContent";

const HotelsInfoSection = () => {
  return (
    <section className="section-shell py-4 md:py-5">
      <div className="soft-card p-5 sm:p-6">
        <SectionHeading
          eyebrow="Hotels Info"
          title="Stay Options For Every Travel Mood"
          description="From comfort to premium, each stay type is curated for quality and convenience."
        />

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {hotelHighlights.map((hotel) => (
            <article key={hotel.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-bold text-slate-900">{hotel.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{hotel.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelsInfoSection;


