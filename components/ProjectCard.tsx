import Image from "next/image";
import Link from "next/link";
import type { Project } from "../data/projects";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <div className="relative aspect-[4/4.4] overflow-hidden border border-line   bg-ink/[0.03] grayscale transition-[filter] duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0 motion-reduce:transition-none">
        {project.cover.src ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 640px) 400px, 78vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        ) : (
          <div role="img" aria-label={project.cover.alt} className="flex h-full items-center justify-center">
            <span className="text-[11px] uppercase tracking-label text-mute">Placeholder cover</span>
          </div>
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-ink text-lg text-white"
        >
          ↗
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <span className="text-base tracking-[-0.02em]">{project.title}</span>
        <span className="text-[11px] text-mute">{project.stack.slice(0, 2).join(" · ")}</span>
      </div>
    </Link>
  );
}