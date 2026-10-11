import Link from "next/link";
import { cta } from "../data/site";

export default function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto flex min-h-[300px] max-w-[1080px] items-center justify-center bg-accent text-center text-white">
        <div className="max-w-xl px-6 py-12">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/90">({cta.eyebrow})</p>
          <h2
            id="cta-title"
            className="mt-3.5 text-[clamp(26px,4vw,38px)] font-medium leading-[1.1] tracking-[-0.03em]"
          >
            {cta.heading}
          </h2>
          <p className="mt-3.5 text-xs text-dim">{cta.body}</p>
          <Link
            href="/#contact"
            className="mt-5 inline-block border-b border-white pb-0.5 text-xs transition-colors hover:border-white/60 focus-visible:outline-white"
          >
            Get in touch ↗
          </Link>
        </div>
      </div>
    </section>
  );
}