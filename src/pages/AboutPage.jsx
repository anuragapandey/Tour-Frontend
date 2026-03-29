import SectionHeading from "../components/common/SectionHeading.jsx";
import { aboutParagraphs, whyChooseMe } from "../data/siteContent";

const AboutPage = () => {
  return (
    <section className="section-shell py-4 md:py-5">
      <div className="soft-card space-y-5 p-5 sm:p-6">
        <SectionHeading
          eyebrow="About Us"
          title="A Trusted Travel Partner for Clear Planning"
          description="This platform is designed for travelers who want better planning and a smooth, stress-free trip."
        />

        <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-4 soft-card p-5 sm:p-6">
        <SectionHeading
          eyebrow="Why Us"
          title="Why Choose This Platform"
          description="Reliable process, personal support, and practical travel-first approach."
        />

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {whyChooseMe.map((reason) => (
            <div key={reason} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
              {reason}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;


