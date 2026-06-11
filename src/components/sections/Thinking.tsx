import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Puzzle, Users, Settings, TrendingUp } from "lucide-react";

const BusinessProductThinking = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const mindsetPoints = [
    {
      title: "What real problem is being solved?",
      answer: "Before building anything, I focus on identifying the actual user pain point and ensuring the solution is meaningful, not just technical.",
      icon: Puzzle,
    },
    {
      title: "Who are the users and what do they need?",
      answer: "I analyze user behavior, expectations, and workflows to design systems that truly match their needs and improve experience.",
      icon: Users,
    },
    {
      title: "How can the solution be simple, scalable, and efficient?",
      answer: "I prefer clean architecture and scalable design so the system can grow without becoming complex or hard to maintain.",
      icon: Settings,
    },
    {
      title: "How does this create business value?",
      answer: "I always consider how technology impacts business goals such as efficiency, cost reduction, user satisfaction, and long-term growth.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="thinking" className="bg-slate-950 text-slate-100 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_60%)]" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"
        }
        className="max-w-5xl mx-auto px-4 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-cyan-400">
            Business & Product Thinking
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            Thinking Beyond{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Code
            </span>
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            I focus on how technology creates real business value, solves user problems,
            and aligns with long-term product goals.
          </p>
        </motion.div>

        {/* Interactive list */}
        <div className="space-y-4">
          {mindsetPoints.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="border border-slate-800 rounded-xl bg-slate-900/60 backdrop-blur-sm overflow-hidden"
              >
                {/* Question */}
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-cyan-400" />
                    <span className="font-medium text-slate-200">
                      {item.title}
                    </span>
                  </div>

                  <span className="text-cyan-400 text-xl">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-slate-400 text-sm leading-relaxed"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <div className="inline-block px-6 py-3 rounded-full border border-slate-800 bg-slate-900/50 text-slate-300 text-sm">
            “I think beyond code, combining engineering expertise with product and business thinking to create meaningful solutions.”
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BusinessProductThinking;