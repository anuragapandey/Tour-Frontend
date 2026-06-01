import SectionHeading from "../common/SectionHeading.jsx";
import { travelInfoCards } from "../../data/siteContent";

const TravelInfoSection = () => {
  return (
    <section className="section-shell py-4 md:py-5">
      <SectionHeading
        eyebrow="Travel Info"
        title="Travel Better With Practical Guidance"
        description="Before you leave, these quick essentials make your trip smoother and safer."
      />

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {travelInfoCards.map((card) => (
          <article key={card.title} className="soft-card p-4 sm:p-5">
            <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TravelInfoSection;


