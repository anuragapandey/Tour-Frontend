import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";
import { brand, navLinks } from "../../data/siteContent";

const linkClassName = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
    isActive ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="section-shell flex h-14 items-center justify-between">
        <NavLink to="/" className="focus-ring flex items-center gap-2 rounded-lg">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-sky-500 text-xs font-bold text-white">
            SS
          </span>
          <div>
            <p className="text-xs font-extrabold text-slate-900 sm:text-sm">{brand.name}</p>
            <p className="text-[10px] text-slate-500 sm:text-[11px]">Tourist Explorer Platform</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <HiXMark className="text-2xl" /> : <HiBars3BottomRight className="text-2xl" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="section-shell grid gap-2 py-2.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClassName}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;


