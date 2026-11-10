import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import PageTransition from "@/components/PageTransition";
import { projects } from "@/data/site";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const rise = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const Block = ({ label, text }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-widest text-primary">{label}</p>
    <p className="mt-1 text-sm leading-relaxed text-slate-300">{text}</p>
  </div>
);

export default function Projects() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Case studies</p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">Problem → Solution → Result</h1>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <motion.article key={p.title} variants={rise} className="glass-card flex flex-col gap-5 rounded-3xl p-8">
              <header>
                <p className="text-xs text-slate-500">{p.category}</p>
                <h2 className="mt-1 text-2xl font-bold">{p.icon} {p.title}</h2>
              </header>
              <Block label="Problem" text={p.problem} />
              <Block label="Solution" text={p.solution} />
              {p.result && <Block label="Result" text={p.result} />}
              <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary">{t}</span>
                ))}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-2 text-sm text-slate-300 hover:text-primary">
                    Live <FaExternalLinkAlt className="text-xs" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  );
}
