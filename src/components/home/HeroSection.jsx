import { FiMapPin, FiPhone } from "react-icons/fi";
import logoMark from "../../assets/seven-hills-logo.svg";
import { brand, contactDetails } from "../../data/siteContent";

const HeroSection = () => {
  return (
    <section className="section-shell py-2 md:py-3">
      <div className="grid items-center gap-4 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-700 p-4 text-white shadow-xl sm:p-5 md:grid-cols-[1.1fr_1fr] md:p-6">
        <div className="space-y-3">
          <div className="inline-flex w-max items-center gap-2 rounded-full bg-white/15 px-2.5 py-1">
            <img src={logoMark} alt={`${brand.name} logo`} className="h-6 w-6 rounded-full border border-white/30" />
            <p className="text-[11px] font-semibold uppercase tracking-widest text-cyan-50">Tourism Platform</p>
          </div>

          <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            {brand.name}
            <span className="block text-cyan-200">Discover India with Clarity</span>
          </h1>

          <p className="max-w-lg text-sm text-cyan-50 sm:text-base">
            Curated destinations, verified stays, a live traveler gallery, and a simple submission flow for effortless
            planning.
          </p>

          {/* <div className="flex flex-wrap gap-2.5">
            <Link
              to="/gallery"
              className="focus-ring rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Start Uploading
            </Link>
            <Link
              to="/contact"
              className="focus-ring rounded-xl border border-white/40 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Talk to an Expert
            </Link>
          </div> */}
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-cyan-300/20 blur-2xl" />
          <article className="relative h-56 overflow-hidden rounded-2xl border border-white/20 bg-white text-slate-900 shadow-2xl sm:h-64 md:h-[310px]">
            <div
              className="absolute inset-y-0 right-0 w-[44%] bg-sky-400"
              style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)" }}
            />

            <div className="relative flex h-full flex-col p-3 sm:p-4">
              <div className="grid grid-cols-[1fr_auto] gap-3">
                <div>
                  <p className="text-base font-extrabold leading-tight sm:text-2xl">Saurabh Tiwari</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold sm:text-base">
                    <FiPhone className="text-slate-700" />
                    {contactDetails.phoneDisplay}
                  </p>
                </div>

                <div className="relative z-10 text-center">
                  <img
                    src={logoMark}
                    alt={`${brand.name} mark`}
                    className="mx-auto h-10 w-10 rounded-full border border-white/60 bg-white sm:h-12 sm:w-12"
                  />
                  <p className="mt-1 text-[9px] font-bold tracking-[0.18em] sm:text-[10px]">HOLIDAYS</p>
                </div>
              </div>

              <p className="mt-2 max-w-[70%] text-sm font-black uppercase leading-tight sm:text-xl">
                Seven Hills Holidays
              </p>

              <p className="mt-1 max-w-[66%] text-xs font-semibold italic sm:text-sm">
                "Be Beautiful All The Time"
              </p>

              <p className="relative z-10 mt-1 self-end w-[44%] text-center text-[10px] font-semibold leading-tight text-slate-900 sm:text-xs">
                Students | Industrial | Family 
              </p>

              <div className="mt-auto border-t border-slate-300 pt-2">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold leading-snug sm:text-sm">
                  <FiMapPin className="text-rose-600" />
                  {contactDetails.officeLocation}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
