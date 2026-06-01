import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import logoMark from "../../assets/seven-hills-logo.svg";
import { brand, contactDetails } from "../../data/siteContent";

const TopBar = () => {
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

        <div className="hidden flex-wrap items-center justify-end gap-x-3 gap-y-1 text-[11px] sm:flex sm:text-xs">
          <a href={contactDetails.phoneLink} className="focus-ring flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
            <FiPhone className="text-[13px] text-teal-600" />
            <span>{contactDetails.phoneDisplay}</span>
          </a>
          <a href={contactDetails.emailLink} className="focus-ring flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
            <FiMail className="text-[13px] text-teal-600" />
            <span>{contactDetails.emailDisplay}</span>
          </a>
          <a href={contactDetails.whatsappLink} className="focus-ring flex items-center gap-1.5 text-slate-600 hover:text-slate-900">
            <FaWhatsapp className="text-[13px] text-teal-600" />
            <span>{contactDetails.whatsappDisplay}</span>
          </a>
        </div>
      </div>

      <div className="section-shell grid gap-1.5 pb-2 sm:hidden">
        <p className="truncate text-[11px] text-slate-500">{contactDetails.officeLocation}</p>

        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
          <a
            href={contactDetails.phoneLink}
            className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-slate-700"
          >
            <FiPhone className="text-[13px] text-teal-600" />
            <span>{contactDetails.phoneDisplay}</span>
          </a>

          <a
            href={contactDetails.whatsappLink}
            className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-slate-700"
          >
            <FaWhatsapp className="text-[13px] text-teal-600" />
            <span>{contactDetails.whatsappDisplay}</span>
          </a>

          <a
            href={contactDetails.emailLink}
            className="focus-ring col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-slate-700"
          >
            <FiMail className="text-[13px] text-teal-600" />
            <span className="truncate">{contactDetails.emailDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
