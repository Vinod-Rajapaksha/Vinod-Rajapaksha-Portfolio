import ComputersCanvas from "../canvas/Computers";
import ParticleBackground from "../ParticleBackground";
import { Canvas } from "@react-three/fiber";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center relative overflow-hidden py-8"
    >
      {/* Particle Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-4 left-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-pulse sm:top-10 sm:left-10 sm:w-48 sm:h-48 md:top-20 md:left-20 md:w-72 md:h-72"></div>
      <div className="absolute bottom-4 right-4 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000 sm:bottom-10 sm:right-10 sm:w-64 sm:h-64 md:bottom-20 md:right-20 md:w-96 md:h-96"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 relative z-10 w-full">
        {/* Left: Text Content */}
        <div className="flex-1 space-y-3 md:space-y-4 lg:space-y-6 text-center lg:text-left w-full flex flex-col justify-center">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5.5xl xl:text-6xl font-bold leading-tight md:leading-tighter">
            <span className="bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent block">
              Hi, I'm
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient block mt-1 md:mt-2">
              Vinod Rajapaksha
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Crafting <span className="text-cyan-400 font-semibold">Full-Stack Web Apps & Mobile Solutions </span> 
            powered by modern technologies. From intuitive interfaces to scalable backend systems.
          </p>

          {/* Stats */}
          <div className="flex justify-center lg:justify-start gap-4 md:gap-6 lg:gap-8 pt-2 md:pt-4 flex-wrap">
            {['3+ Years', '50+ Projects', '95% Client'].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400">{stat.split(' ')[0]}</div>
                <div className="text-xs text-slate-400 mt-0.5">{stat.split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Model Container */}
        <div className="flex-1 w-full max-w-md lg:max-w-lg xl:max-w-xl flex items-center justify-center">
          <div className="relative w-full aspect-square max-h-[250px] sm:max-h-[300px] md:max-h-[350px] lg:max-h-[400px] xl:max-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl border border-slate-700/50 backdrop-blur-sm"></div>
            <ComputersCanvas />
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Only show when there's enough space */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-slate-400 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;