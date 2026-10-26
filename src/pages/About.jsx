import PageTransition from "@/components/PageTransition";
import FadeIn from "@/components/FadeIn";

export default function About() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <FadeIn>
          <h1 className="text-4xl font-bold">
            About <span className="text-primary">Me</span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <div className="mt-6 space-y-4 leading-relaxed text-slate-400">
            <p>
              Hello! My name is <strong className="text-slate-200">Faiza Manzoor</strong>. I hold a Master's degree in Political Science, which has equipped me with strong analytical, research, and communication skills. 
            </p>
            <p>
              Alongside my academic background, I have transitioned into the tech and digital world. I am passionate about <strong className="text-slate-200">Web Development</strong> and <strong className="text-slate-200">Social Media Marketing</strong>, blending creative problem-solving with technical expertise to build engaging web experiences and effective digital strategies.
            </p>
            <p>
              I love learning new technologies, exploring digital trends, and turning innovative ideas into reality through clean code and creative marketing.
            </p>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}