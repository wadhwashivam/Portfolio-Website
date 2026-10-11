import { site, proof, cta } from "../data/site";

type Props = { media?: React.ReactNode };

export default function Hero({ media }: Props) {
  const stats = proof.slice(0, 2);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line bg-soft">
      <div className="mx-auto grid min-h-[min(720px,88vh)] max-w-page px-5 md:grid-cols-[28px_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="hidden flex-col justify-between border-r border-line py-10 md:flex">
          <span className="rotate-180 text-[10px] uppercase tracking-label text-mute [writing-mode:vertical-rl]">
            {site.role}
          </span>
          <span className="rotate-180 text-[10px] tracking-label text-mute [writing-mode:vertical-rl]">
            ©{site.year}
          </span>
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-12 py-12 md:pl-8 md:pr-6">
          <div className="space-y-6">
            <p className="text-[11px] uppercase tracking-label text-mute md:hidden">{site.role}</p>
              <p className="flex items-center gap-2 text-[11px] text-mute">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                {cta.eyebrow}
            </p>
            <dl className="flex gap-10">
              {stats.map((item) => (
                <div key={item.label} className="flex flex-col-reverse">
                  <dt className="mt-1.5 text-[10px] text-mute">{item.label}</dt>
                  <dd className="text-3xl font-light leading-none tracking-[-0.04em]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h1 id="hero-title" className="text-hello font-extralight tracking-[-0.07em]">
              Hello
            </h1>
            <p className="mt-5 flex items-center gap-2.5 text-[13px]">
              <span aria-hidden="true" className="h-px w-6 bg-ink" />
              I&apos;m {site.name}, and {site.tagline}
            </p>
            <p className="ml-[34px] mt-1.5 max-w-[22rem] text-xs text-mute">{site.positioning}</p>
          </div>

          <a
            href="#projects"
            className="inline-flex w-fit items-center gap-1.5 text-[11px] text-mute transition-colors hover:text-ink"
          >
            Scroll down <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="relative -mx-5 aspect-[2732/1800] grayscale md:mx-0 md:aspect-auto md:min-h-[680px]">{media}</div>      </div>
    </section>
  );
}