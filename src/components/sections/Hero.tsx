import ComputersCanvas from "../canvas/Computers";
import ParticleBackground from "../ParticleBackground";
import { Canvas } from "@react-three/fiber";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center relative overflow-hidden"
    >
      {/* Particle Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>

      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col md:flex-row items-center gap-16 relative z-10">
        {/* Left: Enhanced Text Content */}
        <div className="flex-1 space-y-6">

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
              Hi, I'm
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Vinod Rajapaksha
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            Crafting <span className="text-cyan-400 font-semibold">Full-Stack Web Apps & Mobile Solutions </span> 
            powered by modern technologies. From intuitive interfaces to scalable backend systems, I bring ideas to life with React, MERN, and Java ecosystems.
          </p>

          {/* <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center gap-2"
            >
              <span>View My Work</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <a
              href="#contact"
              className="group px-8 py-4 border border-slate-600 hover:border-cyan-400 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>Get In Touch</span>
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
          </div> */}

          {/* Stats */}
          <div className="flex gap-8 pt-8">
            {['3+ Years', '50+ Projects', '95% Client'].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{stat.split(' ')[0]}</div>
                <div className="text-sm text-slate-400">{stat.split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Enhanced 3D Model Container */}
        <div className="flex-1 w-full h-[400px] sm:h-[500px] md:h-[600px] relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl border border-slate-700/50 backdrop-blur-sm"></div>
          <ComputersCanvas />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;