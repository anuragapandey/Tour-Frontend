import {
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { brand, contactDetails } from "../../data/siteContent";

const socialLinks = [
  { icon: FaWhatsapp, href: contactDetails.whatsappLink, label: "WhatsApp" },
  { icon: FaInstagram, href: contactDetails.instagramLink, label: "Instagram" },
  { icon: FaFacebookF, href: contactDetails.facebookLink, label: "Facebook" },
  { icon: FaSnapchatGhost, href: contactDetails.snapchatLink, label: "Snapchat" },
  { icon: FaXTwitter, href: contactDetails.xLink, label: "X" },
];

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const Footer = () => {
  return (
    <footer className="mt-6 border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="section-shell grid gap-6 py-8 lg:grid-cols-3">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">{brand.name}</h3>
          <p className="text-sm text-slate-300">{brand.headline}</p>
          <div className="space-y-1.5 text-sm text-slate-300">
            <a href={contactDetails.phoneLink} className="focus-ring flex items-center gap-2 hover:text-white">
              <FiPhone className="text-teal-300" />
              {contactDetails.phoneDisplay}
            </a>
            <a href={contactDetails.emailLink} className="focus-ring flex items-center gap-2 hover:text-white">
              <FiMail className="text-teal-300" />
              {contactDetails.emailDisplay}
            </a>
            <p className="flex items-center gap-2 text-slate-300">
              <FiMapPin className="text-teal-300" />
              {contactDetails.officeLocation}
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Quick Links</h4>
          <div className="grid gap-1.5">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="focus-ring w-max rounded-lg px-2 py-1 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Connect With Us</h4>
          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((social) => {
              const SocialIcon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:border-teal-400 hover:text-teal-300"
                  aria-label={social.label}
                >
                  <SocialIcon className="text-base" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-3">
        <p className="text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {brand.name}. Built for modern local tourism experiences.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
