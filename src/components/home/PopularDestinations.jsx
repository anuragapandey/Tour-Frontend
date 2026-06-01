import SectionHeading from "../common/SectionHeading.jsx";
import { popularDestinations } from "../../data/siteContent";

const PopularDestinations = () => {
  return (
    <section className="section-shell py-4 md:py-5">
      <SectionHeading
        eyebrow="Popular Destinations"
        title="Trending Getaways"
        description="Handpicked destinations with a balanced mix of comfort, experience, and value."
      />

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {popularDestinations.map((destination) => (
          <article key={destination.name} className="soft-card overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
            <div className={`h-1.5 bg-gradient-to-r ${destination.accent}`} />
            <div className="space-y-2 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-600">{destination.place}</p>
              <h3 className="text-base font-bold text-slate-900">{destination.name}</h3>
              <p className="text-sm text-slate-600">{destination.summary}</p>
              <p className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">{destination.bestTime}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;


