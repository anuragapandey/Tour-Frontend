import { useState, useEffect } from "react";
import { FiCalendar, FiClock, FiCheck, FiX, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const DestinationModal = ({ destination, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!destination || !destination.images || destination.images.length === 0) return;
    
    // Reset active image index when destination changes
    setActiveImg(0);

    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % destination.images.length);
    }, 1000); // Slide every 1 second

    return () => clearInterval(interval);
  }, [destination]);

  if (!destination) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80";
  };

  // Construct WhatsApp enquiry link
  const whatsappNumber = "919953166718";
  const whatsappMessage = encodeURIComponent(
    `Hi Seven Hills Holidays, I am interested in booking/enquiring about the ${destination.title} package.`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-[95%] lg:max-w-[90%] xl:max-w-[1360px] transform overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl backdrop-blur transition-all duration-300 scale-100 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Floating Close Button (always visible at top right) */}
        <button
          type="button"
          onClick={onClose}
          className="focus-ring absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md transition hover:bg-slate-100 hover:text-slate-950 hover:scale-105 cursor-pointer"
          aria-label="Close dialog"
        >
          <FiX className="text-xl" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto flex-1 flex flex-col">
          
          {/* Slideshow Banner (Inside Scroll Area) */}
          {destination.images && destination.images.length > 0 && (
            <div className="relative h-64 sm:h-96 md:h-[480px] lg:h-[540px] w-full overflow-hidden bg-slate-100 shrink-0">
              {destination.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${destination.label} slide ${idx + 1}`}
                  onError={handleImageError}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-in-out ${
                    idx === activeImg ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                  }`}
                />
              ))}
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

              {/* Slider Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 z-10">
                {destination.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeImg ? "w-5 bg-teal-400" : "w-1.5 bg-white/60 hover:bg-white/90"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Modal Text Content Area */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                {destination.label} Package
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl leading-tight">
                {destination.title}
              </h2>
              <p className="text-sm font-medium text-teal-600/90 tracking-wide uppercase">
                {destination.tagline}
              </p>
            </div>

            {/* Desktop Dual Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
              
              {/* Left Column (3/5 space) */}
              <div className="lg:col-span-3 space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">About Destination</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {destination.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">Key Tour Highlights</h3>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {destination.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 mt-0.5">
                          <FiCheck className="text-xs font-bold" />
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Day-by-Day Itinerary Planning */}
                {destination.itinerary && destination.itinerary.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <FiMapPin className="text-teal-600 text-sm" />
                      Day-by-Day Itinerary Planning
                    </h3>
                    
                    <div className="relative border-l-2 border-slate-100 pl-5 ml-2.5 space-y-5">
                      {destination.itinerary.map((step) => (
                        <div key={step.day} className="relative group">
                          {/* Circle Bullet Icon */}
                          <span className="absolute -left-[27px] top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-teal-500 bg-white text-[8px] font-extrabold text-teal-600 transition-colors duration-200 group-hover:bg-teal-500 group-hover:text-white">
                            {step.day}
                          </span>
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-extrabold text-slate-900 sm:text-sm transition duration-150 group-hover:text-teal-600">
                              Day {step.day}: {step.title}
                            </h4>
                            <p className="text-xs leading-relaxed text-slate-500">
                              {step.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column (2/5 space - sticky on desktop) */}
              <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-4 lg:self-start">
                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 gap-3.5 rounded-2xl border border-slate-150 bg-slate-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                      <FiClock className="text-lg" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Duration</p>
                      <p className="text-xs font-semibold text-slate-700 sm:text-sm">{destination.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-t border-slate-200/40 pt-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      <FiCalendar className="text-lg" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Best Season</p>
                      <p className="text-xs font-semibold text-slate-700 sm:text-sm">{destination.bestTime}</p>
                    </div>
                  </div>
                </div>

                {/* Enquiry Card */}
                <div className="rounded-2xl border border-slate-150 bg-slate-50/30 p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">Custom Package Enquiry</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Planning a trip? Share your dates and customization preferences directly with our experts via WhatsApp.
                    </p>
                  </div>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md transition duration-150 hover:bg-emerald-700 hover:shadow-lg cursor-pointer"
                  >
                    <FaWhatsapp className="text-lg" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Actions (visible only on mobile/tablet) */}
          <div className="border-t border-slate-100 bg-slate-50/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 lg:hidden shrink-0">
            <div className="text-center sm:text-left">
              <p className="text-xs text-slate-500">Need customization?</p>
              <p className="text-xs font-bold text-slate-700">We create custom itineraries for this trip</p>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md transition duration-150 hover:bg-emerald-700 hover:shadow-lg cursor-pointer"
            >
              <FaWhatsapp className="text-lg" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;
