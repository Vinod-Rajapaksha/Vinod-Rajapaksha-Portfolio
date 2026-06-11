import { motion, type Variants, type Transition } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Code2, Users, BookOpen } from "lucide-react";

const Leadership = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemTransition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 12,
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: itemTransition,
    },
  };

  const items = [
    {
      title: "Career Guidance",
      desc: "Helping students understand career paths in software engineering, choosing technologies, and planning long-term growth.",
      icon: Target,
    },
    {
      title: "Technical Mentoring",
      desc: "Assisting with coding problems, projects, system design, and real-world development practices.",
      icon: Code2,
    },
    {
      title: "Learning Communities",
      desc: "Encouraging collaboration, peer learning, and participation in tech communities and group projects.",
      icon: Users,
    },
    {
      title: "Knowledge Sharing",
      desc: "Sharing practical experience, project insights, and industry knowledge to help others grow faster.",
      icon: BookOpen,
    },
  ];

  return (
    <section id="leadership" className="bg-slate-950 text-slate-100 py-20 relative overflow-hidden">
      {/* Top and bottom glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_60%)]" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-cyan-400 mb-3">
            Leadership & Mentoring
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold">
            Supporting{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Students & Developers
            </span>
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Beyond development, I actively support students in their learning
            journey through guidance, mentoring, and real-world experience sharing.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm"
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  boxShadow: "0 20px 50px rgba(56,189,248,0.15)",
                }}
              >
                <div className="mb-4">
                  <Icon className="w-8 h-8 text-cyan-400" />
                </div>

                <h3 className="text-lg font-semibold text-slate-200 mb-2">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <div className="inline-block px-6 py-3 rounded-full bg-slate-900/60 border border-slate-800 text-sm text-slate-300">
            “I believe growth is multiplied when knowledge is shared.”
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Leadership;