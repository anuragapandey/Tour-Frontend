import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { createContactInquiry } from "../api/contactApi";
import ErrorNotice from "../components/common/ErrorNotice.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import LocationMap from "../components/map/LocationMap.jsx";
import { contactDetails } from "../data/siteContent";
import { getErrorMessage } from "../utils/getErrorMessage";

const contactCards = [
  {
    icon: FiPhone,
    title: "Phone",
    value: contactDetails.phoneDisplay,
    href: contactDetails.phoneLink,
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
    value: contactDetails.whatsappDisplay,
    href: contactDetails.whatsappLink,
  },
];

const socialCards = [
  { icon: FaInstagram, label: "Instagram", href: contactDetails.instagramLink },
  { icon: FaFacebookF, label: "Facebook", href: contactDetails.facebookLink },
  { icon: FaSnapchatGhost, label: "Snapchat", href: contactDetails.snapchatLink },
  { icon: FaXTwitter, label: "X", href: contactDetails.xLink },
];

const initialContactForm = {
  name: "",
  phone: "",
  email: "",
  description: "",
};

const inputClassName =
  "focus-ring w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400";

const ContactPage = () => {
  const [formData, setFormData] = useState(initialContactForm);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
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
                  href={card.href}
                  target={card.title === "WhatsApp" ? "_blank" : undefined}
                  rel={card.title === "WhatsApp" ? "noreferrer" : undefined}
                  className="focus-ring rounded-2xl border border-slate-200 bg-slate-50 p-3.5 transition hover:border-teal-300 hover:bg-white"
                >
                  <Icon className="text-lg text-teal-600" />
                  <p className="mt-2 text-sm font-semibold text-slate-900">{card.title}</p>
                  <p className="mt-1 text-xs text-slate-600 sm:text-sm">{card.value}</p>
                </a>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <LocationMap location={contactDetails.officeLocation} />

          <div className="soft-card p-5">
            <h3 className="text-lg font-bold text-slate-900">Social Connect</h3>
            <p className="mt-2 text-sm text-slate-600">
              Follow our social channels for updates, travel ideas, and the latest holiday offers.
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
                    className="focus-ring inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 sm:text-sm"
                  >
                    <Icon />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="soft-card p-4 text-sm text-slate-600">
            <p className="mb-1.5 flex items-center gap-2 font-semibold text-slate-800">
              <FiMapPin className="text-teal-600" />
              Office Location
            </p>
            <p>{contactDetails.officeLocation}</p>
            <p className="mt-2">Support hours: Monday to Saturday, 9:00 AM to 8:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
