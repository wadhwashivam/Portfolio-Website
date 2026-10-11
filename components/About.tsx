import { about } from '../data/site';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-14 border-b border-line">
      <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
        <SectionHeader index="01" id="about-title" title="About" />
        <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-6 md:col-start-2">
            <p className="text-xl font-light leading-snug tracking-tight md:text-2xl">{about.paragraph}</p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <dl className="border-t border-line">
              {about.facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-6 border-b border-line py-3">
                  <dt className="text-mute">{f.label}</dt>
                  <dd className="text-right">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
