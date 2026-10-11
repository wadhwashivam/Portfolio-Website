import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-14 border-b border-line pb-16 pt-12">
      <h2 id="projects-title" className="sr-only">
        Featured projects
      </h2>
      <div className="mx-auto max-w-page">
        <ul className="flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 py-2 md:scroll-px-8 md:px-8">
          {projects.map((project) => (
            <li key={project.id} className="w-[min(78vw,400px)] shrink-0 snap-start">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}