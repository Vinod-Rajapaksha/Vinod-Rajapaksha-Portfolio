import { projects } from "../../data/projects";

const Projects = () => {
  return (
    <section id="projects" className="bg-slate-950 text-slate-100 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded-full bg-slate-950 border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="underline underline-offset-4 text-cyan-400"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                )}
                <a
                  href={project.codeUrl}
                  className="underline underline-offset-4 text-slate-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  Code
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
