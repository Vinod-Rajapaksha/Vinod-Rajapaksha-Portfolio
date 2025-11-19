import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import Tilt from "react-parallax-tilt";
import { projects } from "../../data/projects";
import { textVariant, fadeIn } from "../../utils/motion";
import github from "../../assets/github.png"; 

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="w-full h-full"
    >
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareColor="#22d3ee"
        glareMaxOpacity={0.4}
        className="w-full h-full"
      >
        <motion.article 
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 flex flex-col h-full min-h-[400px] shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/10 transition-all duration-300"
          whileHover={{ 
            y: -10,
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          {/* Project Image with GitHub Overlay */}
          <div className="flex-shrink-0">
            {project.image && (
              <motion.div 
                className="relative h-48 w-full mb-4 rounded-xl overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <motion.div 
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    onClick={() => window.open(project.codeUrl, "_blank")}
                    className="cursor-pointer bg-slate-900/80 hover:bg-slate-800/90 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img
                      src={github}
                      alt="GitHub"
                      className="w-6 h-6 filter invert"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Content area */}
          <div className="flex flex-col flex-grow">
            
            {/* Title */}
            <motion.div 
              className="mb-4 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-800 to-indigo-500/20 p-[1px] flex-shrink-0"
              whileHover={{
                background: "linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)",
                transition: { duration: 0.5 }
              }}
            >
              <div className="rounded-[10px] bg-slate-950/90 px-4 py-3">
                <h3 className="font-semibold text-lg text-slate-50 line-clamp-1"> 
                  {project.title}
                </h3>
              </div>
            </motion.div>

            {/* Description */}
            <p className="text-sm text-slate-300 mb-4 leading-relaxed flex-grow line-clamp-3"> 
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-4 text-xs flex-shrink-0"> 
              {project.tech.map((t, techIndex) => (
                <motion.span
                  key={t}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                  className="px-2 py-1 rounded-full bg-slate-950 border border-slate-700 text-slate-200 text-[11px] hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 cursor-default"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>

            {/* Links with GitHub Icon */}
            <div className="flex gap-3 text-sm items-center mt-auto flex-shrink-0">
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-400 ring-1 ring-cyan-500/40 transition hover:bg-cyan-500/20 hover:text-cyan-300 flex-shrink-0"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </motion.svg>
                  Live Demo
                </motion.a>
              )}
              <motion.a
                href={project.codeUrl}
                className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 px-4 py-2 text-xs font-medium text-slate-200 ring-1 ring-slate-700/70 transition hover:bg-slate-700/80 flex-shrink-0"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img
                  src={github}
                  alt="GitHub"
                  className="w-4 h-4 filter invert"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                Code
              </motion.a>
            </div>
          </div>
        </motion.article>
      </Tilt>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="projects" className="bg-slate-950 text-slate-100 py-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={textVariant()}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.p 
            className="text-sm uppercase tracking-[0.25em] text-slate-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            My Work
          </motion.p>
          <h2 className="text-2xl font-semibold mt-2 sm:text-3xl">
            Projects
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 mb-10"
        >
          A selection of projects I've built using modern technologies. 
          Each project includes live demos and source code.
        </motion.p>

        {/* Projects Grid */}
        <motion.div 
          className="grid gap-6 md:grid-cols-2 auto-rows-fr"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;