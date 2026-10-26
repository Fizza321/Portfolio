import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import FadeIn from "@/components/FadeIn";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    setStatus("sending");

    const formData = new FormData(form);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

  return (
    <PageTransition>
      <section className="mx-auto max-w-2xl px-6 py-20">
        <FadeIn>
          <h1 className="text-4xl font-bold">
            Contact <span className="text-primary">Me</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <input name="name" required placeholder="Your name" className={inputClass} />
            <input name="email" type="email" required placeholder="Your email" className={inputClass} />
            <textarea name="message" required rows="5" placeholder="Your message" className={inputClass} />

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-primary px-8 py-3 font-semibold text-white transition hover:scale-105 disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-400">Message bhej diya gaya, shukriya!</p>
            )}
            {status === "error" && (
              <p className="text-red-400">Kuch masla hua, dobara try karo.</p>
            )}
          </form>
        </FadeIn>
      </section>
    </PageTransition>
  );
}