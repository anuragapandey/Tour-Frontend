import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSnapchatGhost,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { FiCreditCard, FiMail, FiPhone } from "react-icons/fi";
import { createContactInquiry } from "../api/contactApi";
import { createPaymentOrder, verifyPayment } from "../api/paymentApi";
import ErrorNotice from "../components/common/ErrorNotice.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import LocationMap from "../components/map/LocationMap.jsx";
import { contactDetails } from "../data/siteContent";
import { getErrorMessage } from "../utils/getErrorMessage";
import { loadRazorpayCheckout } from "../utils/loadRazorpayCheckout";

const contactCards = [
  {
    icon: FiPhone,
    title: "Phone",
    values: contactDetails.phoneNumbers.map((phone) => ({ value: phone.display, href: phone.link })),
  },
  {
    icon: FiMail,
    title: "Email",
    value: contactDetails.emailDisplay,
    href: contactDetails.emailLink,
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    values: contactDetails.phoneNumbers.map((phone) => ({ value: phone.display, href: phone.whatsapp })),
  },
];

const socialCards = [
  { icon: FaInstagram, label: "Instagram", href: contactDetails.instagramLink },
  { icon: FaFacebookF, label: "Facebook", href: contactDetails.facebookLink },
  { icon: FaSnapchatGhost, label: "Snapchat", href: contactDetails.snapchatLink },
  { icon: FaXTwitter, label: "X", href: contactDetails.xLink },
  { icon: FaYoutube, label: "YouTube", href: contactDetails.youtubeLink },
  { icon: FaLinkedinIn, label: "LinkedIn", href: contactDetails.linkedinLink },
  { icon: FaThreads, label: "Threads", href: contactDetails.threadsLink },
];

const initialContactForm = {
  name: "",
  phone: "",
  email: "",
  description: "",
};

const initialPaymentForm = {
  name: "",
  phone: "",
  email: "",
  amount: "500",
  description: "Tour booking advance",
};

const inputClassName =
  "focus-ring w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400";

const ContactPage = () => {
  const [formData, setFormData] = useState(initialContactForm);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [paymentData, setPaymentData] = useState(initialPaymentForm);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitMessage("");
    setSubmitLoading(true);

    try {
      const response = await createContactInquiry(formData);
      setSubmitMessage(response.message || "Successfully connected. We will contact you shortly.");
      setFormData(initialContactForm);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setSubmitLoading(false);
    }
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setPaymentError("");
    setPaymentMessage("");
    setPaymentLoading(true);

    try {
      await loadRazorpayCheckout();
      const response = await createPaymentOrder(paymentData);
      const { keyId, order } = response.data;

      const checkout = new window.Razorpay({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Seven Hills Holidays",
        description: paymentData.description,
        order_id: order.razorpay_order_id,
        prefill: {
          name: paymentData.name,
          email: paymentData.email,
          contact: paymentData.phone,
        },
        theme: {
          color: "#0f766e",
        },
        handler: async (paymentResponse) => {
          try {
            await verifyPayment(paymentResponse);
            setPaymentMessage("Payment successful. Your booking advance has been received.");
            setPaymentData(initialPaymentForm);
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

  return (
    <section className="section-shell py-4 md:py-5">
      <SectionHeading
        eyebrow="Contact"
        title="Let Us Connect"
        description="Share your details and our team will contact you shortly with the right holiday plan."
      />

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[1.15fr_1fr]">
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="soft-card space-y-4 p-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Let&apos;s Connect</h3>
              <p className="mt-1 text-sm text-slate-600">Fields marked with * are required.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Phone *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClassName}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-description" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Description
              </label>
              <textarea
                id="contact-description"
                name="description"
                placeholder="Tell us what kind of holiday you are planning"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
                className={inputClassName}
              />
            </div>

            {submitError ? <ErrorNotice message={submitError} /> : null}
            {submitMessage ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {submitMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitLoading}
              className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitLoading ? "Submitting..." : "Connect Now"}
            </button>
          </form>

          <div className="soft-card grid gap-3 p-4 sm:grid-cols-2">
            {contactCards.map((card) => {
              const Icon = card.icon;

              return (
                <a
                  key={card.title}
                  href={card.href || card.values?.[0]?.href}
                  target={card.title === "WhatsApp" ? "_blank" : undefined}
                  rel={card.title === "WhatsApp" ? "noreferrer" : undefined}
                  className="focus-ring rounded-2xl border border-slate-200 bg-slate-50 p-3.5 transition hover:border-teal-300 hover:bg-white"
                >
                  <Icon className="text-lg text-teal-600" />
                  <p className="mt-2 text-sm font-semibold text-slate-900">{card.title}</p>
                  {card.values ? (
                    <div className="mt-1 grid gap-1">
                      {card.values.map((item) => (
                        <span key={item.href} className="text-xs text-slate-600 sm:text-sm">
                          {item.value}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1 text-xs text-slate-600 sm:text-sm">{card.value}</p>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <form onSubmit={handlePaymentSubmit} className="soft-card space-y-4 p-5">
            <div>
              <div className="flex items-center gap-2">
                <FiCreditCard className="text-xl text-teal-600" />
                <h3 className="text-lg font-bold text-slate-900">Pay Advance</h3>
              </div>
              <p className="mt-1 text-sm text-slate-600">Secure payment powered by Razorpay.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="payment-name" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Name *
                </label>
                <input
                  id="payment-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={paymentData.name}
                  onChange={handlePaymentInputChange}
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label htmlFor="payment-phone" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Phone *
                </label>
                <input
                  id="payment-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={paymentData.phone}
                  onChange={handlePaymentInputChange}
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label htmlFor="payment-email" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Email
                </label>
                <input
                  id="payment-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={paymentData.email}
                  onChange={handlePaymentInputChange}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="payment-amount" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Amount *
                </label>
                <input
                  id="payment-amount"
                  type="number"
                  name="amount"
                  min="1"
                  step="1"
                  value={paymentData.amount}
                  onChange={handlePaymentInputChange}
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label htmlFor="payment-description" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Purpose
                </label>
                <input
                  id="payment-description"
                  type="text"
                  name="description"
                  value={paymentData.description}
                  onChange={handlePaymentInputChange}
                  className={inputClassName}
                />
              </div>
            </div>

            {paymentError ? <ErrorNotice message={paymentError} /> : null}
            {paymentMessage ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {paymentMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={paymentLoading}
              className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {paymentLoading ? "Opening payment..." : "Pay Now"}
            </button>
          </form>

          <LocationMap location={contactDetails.officeLocation} />

          <div className="soft-card p-5">
            <h3 className="text-lg font-bold text-slate-900">Social Connect</h3>
            <p className="mt-2 text-sm text-slate-600">
              Follow our channels for updates, travel ideas, and holiday offers.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialCards.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 sm:text-sm"
                  >
                    <Icon />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
