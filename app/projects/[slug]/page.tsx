import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  const title = `${project.title} — case study`;
  return {
    title,
    description: project.summary,
    openGraph: { title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();
  const index = projects.indexOf(project);

  return (
    <main id="main">
      <article
        aria-labelledby="project-title"
        className="mx-auto max-w-page px-5 pb-20 pt-12 md:px-8 md:pb-28 md:pt-16"
      >
        <Link href="/#projects" className="text-[11px] text-mute transition-colors hover:text-ink">
          ← All projects
        </Link>

        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <p className="text-xs tabular-nums text-mute">{String(index + 1).padStart(2, "0")}</p>
            <h1 id="project-title" className="mt-3 text-5xl font-light italic tracking-tightest md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-md text-base text-mute">{project.summary}</p>
          </div>

          <div className="md:col-span-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-ink/[0.03]">
              {project.cover.src ? (
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div
                  role="img"
                  aria-label={project.cover.alt}
                  className="flex h-full items-center justify-center"
                >
                  <span className="text-[11px] uppercase tracking-label text-mute">Placeholder cover</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <CaseStudy project={project} />
        {project.screenshots && project.screenshots.length > 0 && (
          <section aria-labelledby="screens-title" className="mt-16 border-t border-line pt-10">
            <h2 id="screens-title" className="text-[11px] uppercase tracking-label text-mute">
              Screens
            </h2>
            <ul className="mt-6 grid gap-8 sm:grid-cols-2">
              {project.screenshots.map((shot) => (
                <li key={shot.src} className={shot.wide ? "sm:col-span-2" : undefined}>
                  <figure>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.wide ? 1800 : 1100}
                      height={shot.wide ? 939 : 800}
                      sizes={
                        shot.wide ? "(min-width: 1024px) 960px, 100vw" : "(min-width: 640px) 50vw, 100vw"
                      }
                      className="h-auto w-full border border-line"
                    />
                    <figcaption className="mt-2 text-xs text-mute">{shot.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}