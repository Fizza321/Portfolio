import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-7xl font-extrabold text-primary">404</h1>
        <p className="mt-4 text-slate-400">Yeh page maujood nahi hai.</p>
        <Link to="/" className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-white">
          Home par wapas jao
        </Link>
      </section>
    </PageTransition>
  );
}