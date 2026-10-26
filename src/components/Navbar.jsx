import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const hoverStyle = "transition-colors hover:text-primary text-slate-300";

  const linkClass = ({ isActive }) =>
    `transition-colors hover:text-primary ${
      isActive ? "text-primary font-semibold" : "text-slate-300"
    }`;

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <NavLink to="/" className="text-xl font-bold text-white">
          {site.name}
        </NavLink>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              {link.path.includes("#") ? (
                <a href={link.path} className={hoverStyle}>
                  {link.label}
                </a>
              ) : (
                <NavLink to={link.path} className={linkClass}>
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile button */}
        <button
          className="text-3xl text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="flex flex-col gap-4 border-t border-white/10 bg-slate-950 px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <li key={link.path}>
              {link.path.includes("#") ? (
                <a
                  href={link.path}
                  className={hoverStyle}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  to={link.path}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}