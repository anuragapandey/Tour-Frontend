import { useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";
import logoMark from "../../assets/logo.jpeg";
import { brand, contactDetails } from "../../data/siteContent";
import { destinations } from "../../data/destinations";

const TopBar = ({ onSelectDestination, activeDestinationId }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-slate-700 shadow-sm backdrop-blur">
      <div className="section-shell flex items-center justify-between gap-2 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <img
            src={logoMark}
            alt={`${brand.name} logo`}
            className="h-10 w-10 flex-none object-contain"
          />
          <div className="min-w-0">
            <p className="truncate text-xs font-extrabold tracking-wide text-slate-900 sm:text-sm">
              {brand.name}
            </p>
            <p className="hidden truncate text-[11px] text-slate-500 sm:block">{contactDetails.officeLocation}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden flex-wrap items-center justify-end gap-x-3 gap-y-1 text-[11px] sm:flex sm:text-xs">
            {contactDetails.phoneNumbers.map((phone) => (
              <a key={phone.link} href={phone.link} className="focus-ring flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
                <FiPhone className="text-[13px] text-teal-600" />
                <span>{phone.display}</span>
              </a>
            ))}
            <a href={contactDetails.emailLink} className="focus-ring flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
              <FiMail className="text-[13px] text-teal-600" />
              <span>{contactDetails.emailDisplay}</span>
            </a>
            {contactDetails.phoneNumbers.map((phone) => (
              <a key={phone.whatsapp} href={phone.whatsapp} className="focus-ring flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
                <FaWhatsapp className="text-[13px] text-teal-600" />
                <span>{phone.display}</span>
              </a>
            ))}
          </div>

          {/* Hamburger Menu Button */}
          <button
            type="button"
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden hover:bg-slate-50 hover:border-teal-200 hover:text-teal-600 transition-all duration-200 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <HiXMark className="text-2xl" /> : <HiBars3BottomRight className="text-2xl" />}
          </button>
        </div>
      </div>

      <div className="section-shell grid gap-1.5 pb-2 sm:hidden">
        <p className="truncate text-[11px] text-slate-500">{contactDetails.officeLocation}</p>

        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
          {contactDetails.phoneNumbers.map((phone) => (
            <a
              key={phone.link}
              href={phone.link}
              className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-slate-700"
            >
              <FiPhone className="text-[13px] text-teal-600" />
              <span>{phone.display}</span>
            </a>
          ))}

          {contactDetails.phoneNumbers.map((phone) => (
            <a
              key={phone.whatsapp}
              href={phone.whatsapp}
              className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-slate-700"
            >
              <FaWhatsapp className="text-[13px] text-teal-600" />
              <span>{phone.display}</span>
            </a>
          ))}

          <a
            href={contactDetails.emailLink}
            className="focus-ring col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-slate-700"
          >
            <FiMail className="text-[13px] text-teal-600" />
            <span className="truncate">{contactDetails.emailDisplay}</span>
          </a>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Navigation (Screens < 1024px) */}
      <div
        className={`border-t border-slate-100 bg-white/98 backdrop-blur transition-all duration-300 ease-in-out lg:hidden overflow-y-auto ${
          menuOpen ? "max-h-[75vh] opacity-100 py-3 shadow-md" : "max-h-0 opacity-0 py-0 pointer-events-none"
        }`}
      >
        <div className="section-shell flex flex-col gap-1.5">
          {destinations.map((tab) => {
            const isActive = tab.id === activeDestinationId;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectDestination(tab);
                  setMenuOpen(false);
                }}
                className={`group focus-ring flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-150 cursor-pointer text-left w-full ${
                  isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`h-1.5 w-1.5 rounded-full bg-teal-500 transition-all duration-150 ${
                  isActive ? "opacity-100 scale-110" : "opacity-0 group-hover:opacity-100 group-hover:scale-110"
                }`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
