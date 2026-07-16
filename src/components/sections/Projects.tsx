import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { projects } from "../../data/projects";
import { textVariant, fadeIn } from "../../utils/motion";
import { useMediaQuery } from "../../hooks/use-media-query";
import github from "../../assets/github.png"; 

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="w-full h-full"
    >
      <Tilt
        glareEnable={!isMobile}
        tiltEnable={!isMobile}
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        glareColor="#22d3ee"
        glareMaxOpacity={0.2}
        transitionSpeed={1500}
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
            <div 
              className="relative mb-4 flex-grow cursor-pointer group/desc"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div 
                className={`text-sm text-slate-300 leading-relaxed transition-all duration-300 ${
                  isExpanded ? "" : "line-clamp-3 md:group-hover/desc:line-clamp-none"
                }`}
              >
                {project.description}
              </div>
              <div 
                className={`text-xs font-medium text-cyan-500 mt-2 transition-opacity duration-300 ${
                  isExpanded ? "opacity-100 hidden md:block" : "opacity-70 md:opacity-0"
                } md:hidden`}
              >
                {isExpanded ? "Show less" : "Tap to read more"}
              </div>
            </div>

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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="projects" className="scroll-mt-20 bg-slate-950 text-slate-100 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.12),_transparent_60%)]" />
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header & Controls Container */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
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
              className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300"
            >
              A selection of projects I've built using modern technologies. 
              Swipe or use the arrows to explore live demos and source code.
            </motion.p>
          </div>

          {/* Side-by-Side Navigation Buttons */}
          <motion.div 
            variants={fadeIn("left", "spring", 0.3, 0.75)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex items-center gap-3 self-start sm:self-auto flex-shrink-0"
          >
            <motion.button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Previous projects"
              className={`p-3 rounded-xl border transition-all duration-300 backdrop-blur-sm flex items-center justify-center ${
                prevBtnDisabled
                  ? "bg-slate-900/40 border-slate-800/60 text-slate-600 cursor-not-allowed"
                  : "bg-slate-900/80 border-slate-700 hover:border-cyan-500/60 hover:bg-slate-800 hover:text-cyan-400 text-slate-200 shadow-lg shadow-cyan-500/5 cursor-pointer"
              }`}
              whileHover={!prevBtnDisabled ? { scale: 1.05, x: -2 } : {}}
              whileTap={!prevBtnDisabled ? { scale: 0.95 } : {}}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              aria-label="Next projects"
              className={`p-3 rounded-xl border transition-all duration-300 backdrop-blur-sm flex items-center justify-center ${
                nextBtnDisabled
                  ? "bg-slate-900/40 border-slate-800/60 text-slate-600 cursor-not-allowed"
                  : "bg-slate-900/80 border-slate-700 hover:border-cyan-500/60 hover:bg-slate-800 hover:text-cyan-400 text-slate-200 shadow-lg shadow-cyan-500/5 cursor-pointer"
              }`}
              whileHover={!nextBtnDisabled ? { scale: 1.05, x: 2 } : {}}
              whileTap={!nextBtnDisabled ? { scale: 0.95 } : {}}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden py-4 -my-4 cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-6 select-none">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 pl-6"
              >
                <ProjectCard
                  project={project}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;