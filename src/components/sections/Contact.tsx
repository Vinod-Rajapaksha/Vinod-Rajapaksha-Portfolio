import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
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

  return (
    <section id="contact" className="bg-slate-950 text-slate-100 py-20 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
      ></motion.div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-5xl mx-auto px-4 relative z-10"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-2xl font-semibold mb-4"
        >
          Let's Connect
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-slate-300 mb-8 max-w-2xl"
        >
          Want to talk about a project, collaboration or opportunity?
          Reach out any time. I'm always open to discussing new opportunities and ideas.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col gap-4 text-sm"
        >
          {[
            {
              href: "mailto:vinodrajapaksha.dev@gmail.com",
              text: "vinodrajapaksha.dev@gmail.com",
              color: "cyan"
            },
            {
              href: "https://github.com/Vinod-Rajapaksha",
              text: "GitHub",
              color: "slate"
            },
            {
              href: "https://www.linkedin.com/in/vinod-rajapaksha",
              text: "LinkedIn",
              color: "slate"
            }
          ].map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-${link.color}-500/50 transition-all duration-300 max-w-md group`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                x: 10,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <motion.div
                className={`w-3 h-3 bg-${link.color}-400 rounded-full`}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.5,
                  repeat: Infinity 
                }}
              ></motion.div>
              <span className={`text-${link.color}-400 group-hover:text-${link.color}-300 transition-colors duration-300`}>
                {link.text}
              </span>
              <motion.svg 
                className="w-4 h-4 ml-auto text-slate-400 group-hover:text-slate-200 transition-colors duration-300"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </motion.svg>
            </motion.a>
          ))}
        </motion.div>

        {/* Animated CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-12 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20 text-center"
          whileHover={{ 
            scale: 1.02,
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          <h3 className="text-lg font-semibold text-cyan-400 mb-2">
            Ready to start your next project?
          </h3>
          <p className="text-slate-300 text-sm">
            Let's build something amazing together!
          </p>
          <motion.a
            href="mailto:vinodrajapaksha.dev@gmail.com"
            className="inline-block mt-4 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;