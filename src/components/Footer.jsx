import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400 py-12 px-6">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand / Name */}
        <div className="text-center md:text-left">
          <Link to="/" className="text-xl font-bold text-white">
            {site.name}
          </Link>
          <p className="mt-1 text-sm text-slate-500">
            {site.tagline}
          </p>
        </div>

        {/* Social Links (GitHub, LinkedIn, etc.) */}
        <div className="flex items-center gap-5 text-xl">
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-primary text-slate-300"
          >
            <FaGithub />
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-primary text-slate-300"
          >
            <FaLinkedin />
          </a>
          <a
            href={site.email ? `mailto:${site.email}` : "/contact"}
            aria-label="Email"
            className="transition-colors hover:text-primary text-slate-300"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-slate-500 text-center md:text-right">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}