import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectCard({ project }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition duration-300 hover:-translate-y-2 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20">
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-slate-400">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag}
              className="rounded-full bg-primary/15 px-3 py-1 text-xs text-primary">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-4 text-lg">
          <a href={project.repoUrl} target="_blank" rel="noreferrer"
             className="hover:text-primary"><FaGithub /></a>
          <a href={project.liveUrl} target="_blank" rel="noreferrer"
             className="hover:text-primary"><FaExternalLinkAlt /></a>
        </div>
      </div>
    </div>
  );
}