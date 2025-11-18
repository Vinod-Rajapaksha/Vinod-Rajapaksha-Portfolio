import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { projects } from "../../data/projects";
import { textVariant, fadeIn } from "../../utils/motion";
import github from "../../assets/github.png"; 

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="w-full"
    >
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareColor="#22d3ee"
        glareMaxOpacity={0.4}
        className="w-full"
      >
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 flex flex-col justify-between shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/10 transition-all duration-300 h-full">
          {/* Project Image with GitHub Overlay */}
          {project.image && (
            <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden group">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div
                  onClick={() => window.open(project.codeUrl, "_blank")}
                  className="cursor-pointer bg-slate-900/80 hover:bg-slate-800/90 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <img
                    src={github}
                    alt="GitHub"
                    className="w-6 h-6 filter invert"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Title with Gradient Border */}
          <div className="mb-4 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-800 to-indigo-500/20 p-[1px]">
            <div className="rounded-[10px] bg-slate-950/90 px-4 py-3">
              <h3 className="font-semibold text-lg text-slate-50">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-300 mb-4 leading-relaxed flex-grow">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-4 text-xs">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded-full bg-slate-950 border border-slate-700 text-slate-200 text-[11px]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Enhanced Links with GitHub Icon */}
          <div className="flex gap-3 text-sm items-center">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-400 ring-1 ring-cyan-500/40 transition hover:bg-cyan-500/20 hover:text-cyan-300 hover:scale-105"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            <a
              href={project.codeUrl}
              className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 px-4 py-2 text-xs font-medium text-slate-200 ring-1 ring-slate-700/70 transition hover:bg-slate-700/80 hover:scale-105"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={github}
                alt="GitHub"
                className="w-4 h-4 filter invert"
              />
              Code
            </a>
          </div>
        </article>
      </Tilt>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="bg-slate-950 text-slate-100 py-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Enhanced Header with Animation */}
        <motion.div variants={textVariant()}>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            My Work
          </p>
          <h2 className="text-2xl font-semibold mt-2 sm:text-3xl">
            Projects
          </h2>
        </motion.div>

        {/* Optional Description */}
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 mb-10"
        >
          A selection of projects I've built using modern technologies. 
          Each project includes live demos and source code.
        </motion.p>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;