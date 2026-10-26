import PageTransition from "@/components/PageTransition";
import FadeIn from "@/components/FadeIn";
import { projects } from "@/data/site";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <FadeIn className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            My Work
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl text-white">
            My Projects
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-primary/20 bg-slate-900/80 p-8 backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20">
                
                {/* Top Icon & Title */}
                <div>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-3xl text-primary shadow-inner">
                    {p.icon || "💻"}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {p.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                {/* Tags & Links */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-primary transition"
                    >
                      <FaGithub className="text-lg" /> Code
                    </a>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-primary transition"
                    >
                      <FaExternalLinkAlt className="text-sm" /> Live Demo
                    </a>
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}