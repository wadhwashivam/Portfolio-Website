import { stack } from '../data/site';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

export default function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="scroll-mt-14 border-b border-line">
      <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
        <SectionHeader index="02" id="stack-title" title="Stack" note="What I use most, and can talk about in depth." />
        <div className="mt-12 grid grid-cols-2 border-l border-t border-line md:grid-cols-5">
          {stack.map((g, i) => (
            <Reveal key={g.group} delay={i * 60} className="border-b border-r border-line p-5 last:col-span-2 md:p-6 md:last:col-span-1">
              <h3 className="text-[11px] uppercase tracking-label text-mute">{g.group}</h3>
              <ul className="mt-4 space-y-1.5">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
