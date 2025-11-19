import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const techStacks = {
    "Frontend": ["React", "TypeScript", "JavaScript", "Vite", "Tailwind CSS", "HTML/CSS"],
    "Backend": ["Node.js", "Express.js", "Java", "Spring Boot", "Python", "Jakarta EE", "REST APIs"],
    "Database": ["MongoDB", "Mongoose", "MSSQL", "MySQL", "PostgreSQL"],
    "Tools": ["Docker", "Git/GitHub", "Postman", "Axios", "Figma"]
  };

  return (
    <section id="about" className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100 py-16 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-10 right-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"
      ></motion.div>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"
      ></motion.div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          {/* Left: Content */}
          <div className="space-y-6">
            {[
              "I'm <span class='text-cyan-400 font-semibold'>Vinod Rajapaksha</span>, a passionate Full-Stack Developer and Software Engineering undergraduate, driven by the challenge of turning ideas into real, functional digital products.",
              "I specialize in building end-to-end solutions — from designing responsive, user-friendly interfaces to architecting efficient backend systems using modern technologies like MERN Stack, Spring Boot, and cloud deployment tools.",
              "My project experience includes building scalable applications like Employee Management Systems and Food Ordering platforms, strengthening my expertise in REST APIs, database design, and deployment pipelines."
            ].map((text, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group"
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <p 
                  className="text-slate-300 leading-relaxed text-base sm:text-lg"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </motion.div>
            ))}
            
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20 mt-6 group"
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <motion.span 
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.span>
                My Mission
              </h3>
              <p className="text-slate-200 text-sm sm:text-base">
                Build impactful, efficient, and modern digital experiences that solve real-world problems through clean architecture and maintainable code.
              </p>
            </motion.div>
          </div>

          {/* Right: Tech Stack & Skills */}
          <div className="space-y-6">
            {Object.entries(techStacks).map(([category, technologies], categoryIndex) => (
              <motion.div 
                key={category}
                variants={itemVariants}
                className="bg-slate-800/20 backdrop-blur-sm rounded-xl p-5 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 group"
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <motion.span 
                    className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  ></motion.span>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ 
                        delay: categoryIndex * 0.1 + techIndex * 0.05,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 cursor-default"
                      whileHover={{ 
                        scale: 1.1,
                        y: -2,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6"
            >
              {[
                { number: "5+", label: "Years", color: "cyan" },
                { number: "20+", label: "Projects", color: "blue" },
                { number: "15+", label: "Technologies", color: "purple" },
                { number: "4+", label: "Frameworks", color: "purple" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 group"
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(34, 211, 238, 0)",
                      `0 0 20px rgba(${stat.color === 'cyan' ? '34, 211, 238' : stat.color === 'blue' ? '59, 130, 246' : '168, 85, 247'}, 0.3)`,
                      "0 0 0px rgba(34, 211, 238, 0)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.5,
                    repeat: Infinity
                  }}
                >
                  <div className={`text-2xl font-bold text-${stat.color}-400`}>{stat.number}</div>
                  <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;