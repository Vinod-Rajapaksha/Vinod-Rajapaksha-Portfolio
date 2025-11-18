const About = () => {
  const techStacks = {
    "Frontend": ["React", "TypeScript", "JavaScript", "Vite", "Tailwind CSS", "HTML/CSS"],
    "Backend": ["Node.js", "Express.js", "Java", "Spring Boot", "Python", "Jakarta EE", "REST APIs"],
    "Database": ["MongoDB", "Mongoose", "MSSQL", "MySQL", "PostgreSQL"],
    "Tools": ["Docker", "Git/GitHub", "Postman", "Axios", "Figma"]
  };

  return (
    <section id="about" className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100 py-16 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                I'm <span className="text-cyan-400 font-semibold">Vinod Rajapaksha</span>, a passionate Full-Stack Developer and Software Engineering undergraduate, driven by the challenge of turning ideas into real, functional digital products.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                I specialize in building end-to-end solutions — from designing responsive, user-friendly interfaces to architecting efficient backend systems using modern technologies like MERN Stack, Spring Boot, and cloud deployment tools.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                My project experience includes building scalable applications like Employee Management Systems and Food Ordering platforms, strengthening my expertise in REST APIs, database design, and deployment pipelines.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20 mt-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                My Mission
              </h3>
              <p className="text-slate-200 text-sm sm:text-base">
                Build impactful, efficient, and modern digital experiences that solve real-world problems through clean architecture and maintainable code.
              </p>
            </div>
          </div>

          {/* Right: Tech Stack & Skills */}
          <div className="space-y-6">
            {Object.entries(techStacks).map(([category, technologies]) => (
              <div 
                key={category}
                className="bg-slate-800/20 backdrop-blur-sm rounded-xl p-5 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                <div className="text-2xl font-bold text-cyan-400">5+</div>
                <div className="text-xs text-slate-400 mt-1">Years</div>
              </div>
              <div className="text-center p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                <div className="text-2xl font-bold text-blue-400">20+</div>
                <div className="text-xs text-slate-400 mt-1">Projects</div>
              </div>
              <div className="text-center p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                <div className="text-2xl font-bold text-purple-400">15+</div>
                <div className="text-xs text-slate-400 mt-1">Technologies</div>
              </div>
              <div className="text-center p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                <div className="text-2xl font-bold text-purple-400">4+</div>
                <div className="text-xs text-slate-400 mt-1">Frameworks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;