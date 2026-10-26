import PageTransition from "@/components/PageTransition";
import FadeIn from "@/components/FadeIn";
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <FadeIn>
          <h1 className="text-4xl font-bold">
            My <span className="text-primary">Skills</span>
          </h1>
        </FadeIn>

        <div className="mt-10 flex flex-wrap gap-4">
          {skills.map((skill, i) => (
            <FadeIn key={skill} delay={i * 0.08}>
              <span className="inline-block rounded-xl border border-white/10 bg-slate-900 px-5 py-3 transition hover:-translate-y-1 hover:border-primary hover:text-primary">
                {skill}
              </span>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}