import { lazy, Suspense, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight } from "react-icons/fa";
import PageTransition from "@/components/PageTransition";
import { site, projects } from "@/data/site";
import { skills as tools } from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);
const Hero3D = lazy(() => import("@/components/Hero3D"));

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const rise = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* Kinetic typography: letters spring in, and react on hover */
function Kinetic({ text, className }) {
  return (
    <h1 className={className} aria-label={text}>
      {text.split(" ").map((w, wi) => (
        <span key={wi} aria-hidden="true" className="mr-[0.25em] inline-block whitespace-nowrap">
          {w.split("").map((c, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: 40, opacity: 0, rotate: 8 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 + (wi * 4 + i) * 0.035, type: "spring", stiffness: 140, damping: 16 }}
              whileHover={{ y: -8, color: "#8be04e" }}
            >
              {c}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // GSAP ScrollTrigger: mesh blobs drift at a different speed than content (parallax)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".mesh-blob", {
        yPercent: -40,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Spotlight follows the cursor
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6"
      style={{ "--x": "50%", "--y": "30%" }}
    >
      {/* Animated gradient mesh */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="mesh-blob -left-20 top-10 h-96 w-96 bg-primary/40" />
        <div className="mesh-blob right-0 top-1/3 h-[28rem] w-[28rem] bg-accent/40 [animation-delay:-5s]" />
        <div className="mesh-blob bottom-0 left-1/3 h-80 w-80 bg-emerald-300/20 [animation-delay:-9s]" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(480px circle at var(--x) var(--y), rgba(139,224,78,0.14), transparent 60%)" }}
        />
      </div>

      {/* Interactive 3D */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </div>

      <motion.div style={{ y, opacity: fade }} className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Profile photo (inside the 3D orb on desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          whileHover={{ scale: 1.04, rotate: 2 }}
          className="order-first mx-auto lg:order-last"
        >
          <div className="rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-2xl shadow-primary/30">
            <img
              src="/fiza.jpg"
              alt={`${site.name}, ${site.roles[0]}`}
              className="h-44 w-44 rounded-full object-cover md:h-64 md:w-64 lg:h-72 lg:w-72"
            />
          </div>
        </motion.div>

        <div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-slate-300"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          {site.name} · {site.roles[0]} & {site.roles[2]}
        </motion.p>

        <Kinetic text="I turn ideas into online growth." className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-6 max-w-xl text-lg text-slate-400"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link to="/contact" className="btn-primary">Hire me <FaArrowRight /></Link>
          <Link to="/projects" className="btn-outline">View case studies</Link>
        </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

const Cell = ({ className = "", children }) => (
  <motion.div variants={rise} className={`glass-card rounded-3xl p-6 ${className}`}>
    {children}
  </motion.div>
);

const Title = ({ small, title }) => (
  <div className="mb-10 text-center">
    <p className="text-sm font-semibold uppercase tracking-widest text-primary">{small}</p>
    <h2 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h2>
    <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
  </div>
);

const Grid = ({ className = "", children }) => (
  <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className={className}>
    {children}
  </motion.div>
);

/* ---------- About (bento) ---------- */
function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <Title small="Get to know me" title="About Me" />
      <Grid className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[minmax(170px,auto)]">
        <Cell className="md:col-span-2 md:row-span-2">
          <h3 className="text-2xl font-bold">Analytical mind, digital craft.</h3>
          <p className="mt-4 leading-relaxed text-slate-400">{site.about}</p>
        </Cell>

        <Cell>
          <p className="text-3xl" aria-hidden="true">🎓</p>
          <h3 className="mt-2 font-semibold">{site.education.degree}</h3>
          <p className="mt-1 text-sm text-slate-400">Research, analysis, communication.</p>
        </Cell>

        <Cell className="flex flex-col justify-center">
          {site.stats.map((s) => (
            <div key={s.label} className="flex items-baseline justify-between border-b border-white/5 py-1 last:border-0">
              <span className="text-sm text-slate-400">{s.label}</span>
              <span className="text-2xl font-bold text-primary">{s.value}{s.suffix}</span>
            </div>
          ))}
        </Cell>

        <Cell className="md:col-span-2">
          <h3 className="mb-4 font-semibold">Selected work</h3>
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p.title} className="flex items-center justify-between text-sm">
                <span className="text-slate-200">{p.icon} {p.title}</span>
                <span className="text-xs text-slate-500">{p.category}</span>
              </li>
            ))}
          </ul>
          <Link to="/projects" className="mt-5 inline-flex items-center gap-2 text-sm text-primary hover:underline">Read case studies <FaArrowRight className="text-xs" /></Link>
        </Cell>
      </Grid>
    </section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-y border-white/5 bg-white/[0.02] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Title small="What I know" title="My Skills" />
        <Grid className="grid gap-4 md:grid-cols-2">
          {site.skills.map((s) => (
            <Cell key={s.name}>
              <div className="mb-3 flex justify-between text-sm font-semibold text-slate-200">
                <span>{s.name}</span>
                <span className="text-primary">{s.level}%</span>
              </div>
              <div role="progressbar" aria-label={s.name} aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100} className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }} className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
              </div>
            </Cell>
          ))}
        </Grid>
        <Grid className="mt-8 flex flex-wrap justify-center gap-3">
          {tools.map((t) => (
            <motion.span key={t} variants={rise} className="glass-card rounded-full px-4 py-1.5 text-sm text-slate-300">{t}</motion.span>
          ))}
        </Grid>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <Title small="What I offer" title="My Services" />
      <Grid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {site.services.map((s) => (
          <Cell key={s.title} className="text-center">
            <p className="text-4xl" aria-hidden="true">{s.icon}</p>
            <h3 className="mt-3 font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{s.text}</p>
          </Cell>
        ))}
      </Grid>
    </section>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <PageTransition>
      <motion.div style={{ scaleX: progress }} className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-primary to-accent" />
      <Hero />
      <About />
      <Skills />
      <Services />

      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card mx-auto max-w-4xl rounded-3xl p-10 text-center"
        >
          <h2 className="text-3xl font-bold">Have a project in mind?</h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-400">Let's talk about your website, SEO or social media growth. I reply within 24 hours.</p>
          <Link to="/contact" className="btn-primary mt-8">Start a conversation <FaArrowRight /></Link>
        </motion.div>
      </section>
    </PageTransition>
  );
}
