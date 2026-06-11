import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Achievements = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const highlights = [
    "Dean’s List Recognition",
    "Leadership & Mentoring",
    "Peer Trust & Respect",
    "Student Skill Development",
  ];

  return (
    <section id="achievements" className="bg-slate-950 text-slate-100 py-20 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_60%)]" />
      <div ref={ref} className="max-w-5xl mx-auto px-6 relative z-10">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-cyan-400">
            Achievements
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            Impact Beyond{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Certificates
            </span>
          </h2>
        </motion.div>

        {/* STORY */}
        <div className="grid sm:grid-cols-2 gap-6 text-justify">
        {[
          "My achievements are not limited to certificates or academic results. I focus on real impact, leadership, and the trust I build with people through my actions and contributions.",

          "During my university journey, I have been recognized for academic excellence, including placement on the Dean’s List, which reflects my consistency and dedication toward my studies.",

          "Beyond academics, I take pride in the trust and respect I have built within my peers and community. I actively help others improve their technical skills and guide them in their learning paths.",

          "I believe one of my strongest achievements is my ability to positively influence others — helping students grow in confidence, improve their skills, and move toward better opportunities.",

          "Leadership, responsibility, and trust-building are qualities I continuously develop. For me, true achievement is not only personal success, but also the success of people I help along the way."
        ].map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.15,
            }}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { type: "spring", stiffness: 300 }
            }}
            className={`bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group
                      ${i === 4 ? "sm:col-span-2" : ""}`}
          >
            {text}
          </motion.p>
        ))}
        </div>

        {/* HIGHLIGHTS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 flex flex-wrap gap-3 justify-center"
        >
          {highlights.map((item, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:border-cyan-500/40 transition"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* QUOTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block px-6 py-3 rounded-full border border-slate-800 bg-slate-900/50 text-slate-300 text-sm">
            “True achievement is measured by the value you create for others.”
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Achievements;