import { useState, useEffect } from "react";
import { FiClock, FiCheck, FiX, FiMapPin, FiPhoneCall, FiCreditCard } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { contactDetails } from "../../data/siteContent";
import { getDestinationWhyVisit } from "../../utils/destinationContent";
import { createPaymentOrder, verifyPayment } from "../../api/paymentApi";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { loadRazorpayCheckout } from "../../utils/loadRazorpayCheckout";
import logoMark from "../../assets/logo.jpeg";
import {
  buildPaymentDescription,
  formatCurrency,
  getAvailableTransports,
  getDurationDays,
  getPackageQuote,
  groupSizeOptions,
  mealOptions,
} from "../../utils/packagePricing";

const DestinationModal = ({ destination, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: "",
    travellers: 2,
    transport: "flight",
    mealPlan: "breakfastDinner",
    days: 3,
    payMode: "advance",
  });
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    if (!destination || !destination.images || destination.images.length === 0) return;
    
    const resetTimer = setTimeout(() => {
      setSlideDirection("next");
      setActiveImg(0);
    }, 0);

    const interval = setInterval(() => {
      setSlideDirection("next");
      setActiveImg((prev) => (prev + 1) % destination.images.length);
    }, 3000);

    return () => {
      clearTimeout(resetTimer);
      clearInterval(interval);
    };
  }, [destination]);

  useEffect(() => {
    if (!destination) return;

    const availableTransports = getAvailableTransports(destination);
    setBooking((prev) => ({
      ...prev,
      days: getDurationDays(destination.duration),
      transport: availableTransports.includes(prev.transport) ? prev.transport : availableTransports[0] || "car",
    }));
    setPaymentError("");
    setPaymentMessage("");
  }, [destination]);

  if (!destination) return null;

  const availableTransports = getAvailableTransports(destination);
  const quote = getPackageQuote(destination, booking);
  const paymentAmount = booking.payMode === "full" ? quote.total : quote.advance;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageError = (e) => {
    e.currentTarget.style.display = "none";
  };

  const moveSlide = (direction) => {
    if (!destination?.images?.length) return;

    setSlideDirection(direction);
    setActiveImg((prev) => {
      if (direction === "prev") {
        return prev === 0 ? destination.images.length - 1 : prev - 1;
      }

      return (prev + 1) % destination.images.length;
    });
  };

  const handleSlideClick = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const isLeftSide = e.clientX - bounds.left < bounds.width / 2;
    moveSlide(isLeftSide ? "prev" : "next");
  };

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBooking((prev) => ({
      ...prev,
      [name]: ["travellers", "days"].includes(name) ? Number(value) : value,
    }));
  };

  const handlePayNow = async (event) => {
    event.preventDefault();
    setPaymentError("");
    setPaymentMessage("");
    setPaymentLoading(true);

    try {
      await loadRazorpayCheckout();

      const response = await createPaymentOrder({
        name: booking.name,
        phone: booking.phone,
        email: booking.email,
        amount: paymentAmount,
        description: buildPaymentDescription(destination, quote),
      });
      const { keyId, order } = response.data;

      const checkout = new window.Razorpay({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Seven Hills Holidays",
        image: new URL(logoMark, window.location.origin).toString(),
        description: `${destination.label} ${booking.payMode === "full" ? "full payment" : "booking advance"}`,
        order_id: order.razorpay_order_id,
        prefill: {
          name: booking.name,
          email: booking.email,
          contact: booking.phone,
        },
        notes: {
          destination: destination.label,
          travellers: String(quote.travellers),
          package_total: String(quote.total),
          payment_type: booking.payMode,
        },
        theme: {
          color: "#0f766e",
        },
        handler: async (paymentResponse) => {
          try {
            await verifyPayment(paymentResponse);
            setPaymentMessage("Payment successful. Our team will confirm the customized booking shortly.");
          } catch (error) {
            setPaymentError(getErrorMessage(error));
          } finally {
            setPaymentLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
          },
        },
      });

      checkout.open();
    } catch (error) {
      setPaymentError(getErrorMessage(error));
      setPaymentLoading(false);
    }
  };

  // Construct WhatsApp enquiry link
  const whatsappMessage = encodeURIComponent(
    `Hi Seven Hills Holidays, I am interested in booking/enquiring about the ${destination.title} package.`
  );
  const whatsappLinks = contactDetails.phoneNumbers.map((phone) => ({
    display: phone.display,
    href: `${phone.whatsapp}?text=${whatsappMessage}`,
  }));

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
            <div
              className="group relative h-64 sm:h-96 md:h-[480px] lg:h-[540px] w-full overflow-hidden bg-slate-100 shrink-0 cursor-pointer [perspective:1200px]"
              onClick={handleSlideClick}
              title="Click left or right side to change image"
            >
              {destination.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${destination.label} slide ${idx + 1}`}
                  onError={handleImageError}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out will-change-transform ${
                    idx === activeImg
                      ? "opacity-100 scale-100 translate-x-0 rotate-y-0 blur-0"
                      : slideDirection === "next"
                        ? "opacity-0 scale-105 -translate-x-8 rotate-y-6 blur-[2px] pointer-events-none"
                        : "opacity-0 scale-105 translate-x-8 -rotate-y-6 blur-[2px] pointer-events-none"
                  }`}
                />
              ))}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  moveSlide("prev");
                }}
                className="focus-ring absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/35 text-xl font-bold text-white opacity-0 shadow-lg backdrop-blur-md transition duration-200 hover:bg-slate-950/55 group-hover:opacity-100"
                aria-label="Previous image"
              >
                &#8249;
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  moveSlide("next");
                }}
                className="focus-ring absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/35 text-xl font-bold text-white opacity-0 shadow-lg backdrop-blur-md transition duration-200 hover:bg-slate-950/55 group-hover:opacity-100"
                aria-label="Next image"
              >
                &#8250;
              </button>

              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r from-slate-950/25 to-transparent opacity-60 transition duration-300" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/4 bg-gradient-to-l from-slate-950/25 to-transparent opacity-60 transition duration-300" />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

              {/* Slider Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 z-10">
                {destination.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlideDirection(idx < activeImg ? "prev" : "next");
                      setActiveImg(idx);
                    }}
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

                <div className="rounded-2xl border border-teal-100 bg-teal-50/55 p-4">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">Why Visit {destination.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {getDestinationWhyVisit(destination)}
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

                </div>

                {/* Booking Card */}
                <form onSubmit={handlePayNow} className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Customize & Book</h4>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">Origin fixed from Delhi. Change group, travel mode, meals, and days before payment.</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-extrabold text-orange-700">10% Off</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500">Name</span>
                      <input name="name" value={booking.name} onChange={handleBookingChange} required className="focus-ring w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Full name" />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500">Phone</span>
                      <input name="phone" value={booking.phone} onChange={handleBookingChange} required className="focus-ring w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Phone number" />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500">Email</span>
                      <input name="email" type="email" value={booking.email} onChange={handleBookingChange} className="focus-ring w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Email address" />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500">Travellers</span>
                      <select name="travellers" value={booking.travellers} onChange={handleBookingChange} className="focus-ring w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">
                        {groupSizeOptions.map((size) => (
                          <option key={size} value={size}>{size === 50 ? "50+" : size}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500">Days</span>
                      <input name="days" type="number" min="1" max="30" value={booking.days} onChange={handleBookingChange} className="focus-ring w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500">Travel</span>
                      <select name="transport" value={booking.transport} onChange={handleBookingChange} className="focus-ring w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">
                        {availableTransports.map((option) => (
                          <option key={option} value={option}>{option === "flight" ? "Airline" : option === "car" ? "Private Car" : option[0].toUpperCase() + option.slice(1)}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500">Meals</span>
                      <select name="mealPlan" value={booking.mealPlan} onChange={handleBookingChange} className="focus-ring w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">
                        {mealOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                    <div className="flex justify-between gap-3 text-slate-600">
                      <span>Package total</span>
                      <span className="line-through">{formatCurrency(quote.totalBeforeDiscount)}</span>
                    </div>
                    <div className="mt-1 flex justify-between gap-3 text-emerald-700">
                      <span>Offer discount</span>
                      <span>-{formatCurrency(quote.discount)}</span>
                    </div>
                    <div className="mt-2 flex items-end justify-between gap-3 border-t border-slate-200 pt-2">
                      <span className="font-bold text-slate-900">Final estimate</span>
                      <span className="text-xl font-extrabold text-slate-950">{formatCurrency(quote.total)}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{formatCurrency(quote.perPerson)} per person, approx. {quote.distanceKm} km from Delhi.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 p-3 text-xs font-bold text-slate-700">
                      <input type="radio" name="payMode" value="advance" checked={booking.payMode === "advance"} onChange={handleBookingChange} />
                      Advance {formatCurrency(quote.advance)}
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 p-3 text-xs font-bold text-slate-700">
                      <input type="radio" name="payMode" value="full" checked={booking.payMode === "full"} onChange={handleBookingChange} />
                      Full payment
                    </label>
                  </div>

                  {paymentError ? <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{paymentError}</div> : null}
                  {paymentMessage ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{paymentMessage}</div> : null}

                  <button type="submit" disabled={paymentLoading} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70">
                    <FiCreditCard />
                    {paymentLoading ? "Opening payment..." : `Pay ${formatCurrency(paymentAmount)}`}
                  </button>
                </form>

                {/* Enquiry Card */}
                <div className="rounded-2xl border border-slate-150 bg-slate-50/30 p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">Custom Package Enquiry</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Planning a trip? Share your dates on WhatsApp or call our experts directly.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {whatsappLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#12A86B] py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/10 transition duration-150 hover:bg-[#0D8F5A] hover:shadow-lg cursor-pointer"
                      >
                        <FaWhatsapp className="text-lg" />
                        <span>WhatsApp {link.display}</span>
                      </a>
                    ))}
                    {contactDetails.phoneNumbers.map((phone) => (
                      <a
                        key={phone.link}
                        href={phone.link}
                        className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] py-3 text-sm font-bold text-white shadow-md shadow-orange-900/10 transition duration-150 hover:bg-[#EA580C] hover:shadow-lg cursor-pointer"
                      >
                        <FiPhoneCall className="text-lg" />
                        <span>Call {phone.display}</span>
                      </a>
                    ))}
                  </div>
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
            <div className="grid w-full grid-cols-1 gap-3 sm:w-auto sm:grid-cols-2">
              {whatsappLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-[#12A86B] px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/10 transition duration-150 hover:bg-[#0D8F5A] hover:shadow-lg cursor-pointer"
                >
                  <FaWhatsapp className="text-lg" />
                  <span>WhatsApp</span>
                </a>
              ))}
              {contactDetails.phoneNumbers.map((phone) => (
                <a
                  key={phone.link}
                  href={phone.link}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-900/10 transition duration-150 hover:bg-[#EA580C] hover:shadow-lg cursor-pointer"
                >
                  <FiPhoneCall className="text-lg" />
                  <span>Call</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;
