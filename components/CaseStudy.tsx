import Reveal from './Reveal';
import TextLink from './TextLink';
import type { Project } from '../data/projects';
type Props = {project: Project};
function Label({ children }: {children: React.ReactNode}) {
  return <h4 className="text-[11px] uppercase tracking-label text-mute">{children}</h4>;
}

export default function CaseStudy({ project }: Props) {
  const cs = project.caseStudy;

  return (
    <Reveal className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-5 md:col-start-2">
        <Label>Problem</Label>
        <p className="mt-3 max-w-prose text-base text-ink/90">{cs.problem}</p>
      </div>

      <div className="md:col-span-3">
        <Label>Stack</Label>
        <ul className="mt-3 space-y-1">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      <dl className="grid grid-cols-2 gap-6 md:col-span-3 md:grid-cols-1 md:content-start">
        <div>
          <dt className="text-[11px] uppercase tracking-label text-mute">Role</dt>
          <dd className="mt-3">{cs.role}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-label text-mute">Year</dt>
          <dd className="mt-3 tabular-nums">{cs.year}</dd>
        </div>
      </dl>

      <div className="md:col-span-8 md:col-start-2">
        <Label>Key decisions</Label>
        <ol className="mt-3 border-t border-line">
          {cs.decisions.map((d, i) => (
            <li key={i} className="grid gap-1 border-b border-line py-4 sm:grid-cols-12 sm:gap-6">
              <span className="text-xs tabular-nums text-mute sm:col-span-1">{String(i + 1).padStart(2, '0')}</span>
              <p className="font-medium sm:col-span-4">{d.title}</p>
              <p className="text-mute sm:col-span-7">{d.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="md:col-span-3">
        <Label>Links</Label>
        <div className="mt-3 flex flex-col items-start gap-3">
          <TextLink href={project.repo} external icon="↗">Repository</TextLink>
                    {project.live && (
            <TextLink href={project.live} external icon="↗">Live site</TextLink>
          )}
        </div>
      </div>
    </Reveal>
  );
}
