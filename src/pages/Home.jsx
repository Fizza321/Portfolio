import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useInView, animate } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { site } from "@/data/site";

/* ---------- JS helpers ---------- */

// Typing effect
function useTypewriter(words, speed = 90, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const done = !deleting && text === word;
    const delay = done ? pause : deleting ? speed / 2 : speed;

    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setI((prev) => prev + 1);
      } else {
        setText(
          deleting
            ? word.slice(0, text.length - 1)
            : word.slice(0, text.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}

// Number counter
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.8,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

// Scroll reveal wrapper
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ small, title }) => (
  <Reveal className="mb-12 text-center">
    <p className="text-sm font-semibold uppercase tracking-widest text-primary">
      {small}
    </p>
    <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">{title}</h2>
    <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
  </Reveal>
);

/* ---------- Global Fixed Canvas Background for Entire Website ---------- */
function GlobalEngineeredBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const particleCount = Math.floor((width * height) / 14000);
    const particles = [];

    for (let i = 0; i < (particleCount < 40 ? 40 : particleCount); i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        radius: Math.random() * 2.2 + 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 197, 94, 0.4)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          let mdx = p.x - mouse.x;
          let mdy = p.y - mouse.y;
          let mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.35 * (1 - mDist / mouse.radius)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (mouse.x !== null && mouse.y !== null) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 45, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(34, 197, 94, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#070b14]">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}

/* ---------- Page ---------- */

export default function Home() {
  const typed = useTypewriter(site.roles);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  const scrollToAbout = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Global Fixed Background across all sections */}
      <GlobalEngineeredBackground />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-primary to-accent"
      />

      <PageTransition>
        <div className="relative z-10">
          {/* ============ HERO ============ */}
          <section className="relative flex min-h-[92vh] items-center justify-center px-6">
            <div className="text-center">
              {/* Profile photo */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.img
                  src="/fiza.jpg"
                  alt="Faiza"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="mx-auto mb-6 h-36 w-36 rounded-full border-4 border-primary/40 object-cover shadow-2xl shadow-primary/30 md:h-44 md:w-44 cursor-pointer"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-medium text-primary"
              >
                Hello, I'm
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl"
              >
                {site.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 min-h-10 text-2xl text-slate-300 md:text-3xl"
              >
                {typed}
                <span aria-hidden="true" className="ml-1 animate-pulse text-primary">
                  |
                </span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mx-auto mt-4 max-w-xl text-slate-400"
              >
                {site.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-8 flex flex-wrap justify-center gap-4"
              >
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/projects"
                    className="inline-block rounded-full bg-primary px-7 py-3 font-bold text-slate-950 shadow-lg shadow-primary/30 transition hover:shadow-primary/60"
                  >
                    View Projects
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="inline-block rounded-full border border-primary/40 px-7 py-3 font-semibold text-slate-200 transition hover:border-primary hover:bg-primary/10 hover:text-primary"
                  >
                    Contact Me
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll hint */}
            <motion.button
              type="button"
              onClick={scrollToAbout}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="absolute bottom-6 z-10 text-2xl text-primary cursor-pointer"
              aria-label="Scroll down to About section"
            >
              ↓
            </motion.button>
          </section>

          {/* ============ ABOUT ============ */}
          <section id="about" className="mx-auto max-w-6xl px-6 py-28">
            <SectionTitle small="Get to know me" title="About Me" />
            
            <div className="grid gap-10 lg:grid-cols-12 items-center">
              <Reveal className="lg:col-span-7 space-y-6">
                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl border border-primary/20 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl shadow-primary/5 hover:border-primary/40"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Turning Ideas into Digital Reality ✨
                  </h3>
                  <p className="leading-relaxed text-slate-300 text-base md:text-lg">
                    Hello! I'm <span className="text-primary font-semibold">Faiza Manzoor</span>, a Master's graduate in Political Science with a passion for the digital world. I combine analytical thinking from my academic background with practical skills in social media marketing, SEO, website development, and MS Office.
                  </p>
                  <p className="mt-4 leading-relaxed text-slate-400">
                    I enjoy helping brands and people grow online by building clean websites, creating engaging content, and improving search visibility.
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-5 rounded-2xl border border-primary/20 bg-slate-900/40 p-6 backdrop-blur-md shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-3xl text-primary" aria-hidden="true">
                    🎓
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Masters in Political Science</h4>
                    <p className="mt-1 text-sm text-slate-400">
                      Strong research, analysis and communication skills, applied to digital marketing and web development.
                    </p>
                  </div>
                </motion.div>
              </Reveal>

              <Reveal delay={0.2} className="lg:col-span-5 grid grid-cols-1 gap-4">
                {site.stats.map((s) => (
                  <motion.div
                    key={s.label}
                    whileHover={{ y: -8, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden rounded-2xl border border-primary/20 bg-slate-900/60 p-6 text-center backdrop-blur-xl transition-all shadow-lg hover:shadow-primary/20 hover:border-primary/50 group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative z-10 flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-400">{s.label}</p>
                      <div className="text-3xl md:text-4xl font-extrabold text-primary">
                        <Counter to={s.value} suffix={s.suffix} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* ============ SKILLS ============ */}
          <section id="skills" className="bg-slate-900/40 border-y border-white/5 py-20">
            <div className="mx-auto max-w-4xl px-6">
              <SectionTitle small="What I know" title="My Skills" />
              <div className="grid gap-6 md:grid-cols-2">
                {site.skills.map((s, i) => (
                  <Reveal key={s.name} delay={i * 0.1}>
                    <motion.div 
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="rounded-2xl border border-primary/15 bg-slate-900/60 p-5 transition shadow-md hover:shadow-lg hover:shadow-primary/15"
                    >
                      <div className="mb-2 flex justify-between text-sm font-semibold text-slate-200">
                        <span>{s.name}</span>
                        <span className="text-primary">{s.level}%</span>
                      </div>
                      <div
                        role="progressbar"
                        aria-label={s.name}
                        aria-valuenow={s.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className="h-2.5 overflow-hidden rounded-full bg-primary/15"
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        />
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ============ SERVICES ============ */}
          <section id="services" className="mx-auto max-w-6xl px-6 py-20">
            <SectionTitle small="What I offer" title="My Services" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {site.services.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group h-full rounded-2xl border border-primary/15 bg-slate-900/60 p-6 text-center transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer backdrop-blur-xl"
                  >
                    <div
                      aria-hidden="true"
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl transition duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-primary/20"
                    >
                      {s.icon}
                    </div>
                    <h3 className="font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{s.text}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ============ CTA ============ */}
          <section className="px-6 pb-24">
            <Reveal className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-r from-primary to-accent p-10 text-center text-slate-950 shadow-2xl shadow-primary/20">
              <h2 className="text-2xl font-bold md:text-3xl text-slate-950">Let's work together</h2>
              <p className="mt-2 text-slate-900/80 font-medium">
                Have a project or idea? I'd love to hear about it.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block mt-6">
                <Link
                  to="/contact"
                  className="rounded-full bg-slate-950 text-white px-7 py-3 font-semibold shadow-lg transition hover:bg-slate-900"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </Reveal>
          </section>
        </div>
      </PageTransition>
    </>
  );
}