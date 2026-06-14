import { FiArrowUpRight, FiCalendar, FiClock } from "react-icons/fi";
import SectionHeading from "../common/SectionHeading.jsx";
import { destinations } from "../../data/destinations";
import { getDestinationWhyVisit } from "../../utils/destinationContent";

const DestinationCardsSection = ({ onSelectDestination }) => {
  return (
    <section id="destinations" className="section-shell py-8 md:py-10">
      <SectionHeading
        eyebrow="Explore India"
        title="28 Handpicked Destinations"
        description="Choose a destination by mood, history, scenery, and experience. Tap Read More for the full itinerary and quick enquiry options."
      />

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {destinations.map((destination, index) => (
          <article
            key={destination.id}
            className="group destination-card-rise overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-xl"
            style={{ animationDelay: `${Math.min(index, 10) * 60}ms` }}
          >
            <button
              type="button"
              onClick={() => onSelectDestination?.(destination)}
              className="block w-full text-left"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={destination.images[0]}
                  alt={destination.label}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-sm font-extrabold text-slate-950 shadow">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-white/20 bg-slate-950/45 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                    {destination.label}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
                    {destination.tagline}
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-white">
                    {destination.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 p-4 sm:p-5">
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-teal-700">
                    <FiClock />
                    {destination.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-orange-700">
                    <FiCalendar />
                    {destination.bestTime}
                  </span>
                </div>

                <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">
                  {getDestinationWhyVisit(destination)}
                </p>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Read more
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white transition group-hover:bg-teal-600 group-hover:rotate-12">
                    <FiArrowUpRight />
                  </span>
                </div>
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DestinationCardsSection;
