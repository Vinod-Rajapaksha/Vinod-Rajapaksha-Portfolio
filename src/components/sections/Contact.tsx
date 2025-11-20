import { motion, type Variants, type Transition } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemTransition: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 12
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: itemTransition
    }
  };

  const floatingTransition: Transition = {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: floatingTransition
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_hvscckm',     
        'template_ft65ze8',    
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'vinodrajapaksha.dev@gmail.com',
          reply_to: formData.email,
          time: new Date().toLocaleString()
        },
        'yWQgLZ0x55nPo22_M'             
      );
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Auto reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsSubmitting(false);
      alert('Sorry, there was an error sending your message. Please try again or email me directly at vinodrajapaksha.dev@gmail.com');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
  <section
    id="contact"
    className="bg-slate-950 text-slate-100 py-20 relative overflow-hidden"
  >
    {/* Subtle gradient overlay */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_60%)] opacity-80" />

    {/* Animated Background Elements */}
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      animate={inView ? { scale: 1, rotate: 180 } : {}}
      transition={{ duration: 1.5 }}
      className="absolute -top-48 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
    />

    <motion.div
      initial={{ scale: 0, rotate: 180 }}
      animate={inView ? { scale: 1, rotate: 0 } : {}}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
    />

    {/* Floating Shapes */}
    <motion.div
      variants={floatingVariants}
      animate="animate"
      className="absolute top-20 left-10 w-6 h-6 bg-cyan-400/30 rounded-full"
    />
    <motion.div
      variants={floatingVariants}
      animate="animate"
      transition={{ delay: 1 }}
      className="absolute bottom-32 right-20 w-4 h-4 bg-blue-400/40 rounded-full"
    />
    <motion.div
      variants={floatingVariants}
      animate="animate"
      transition={{ delay: 2 }}
      className="absolute top-1/2 left-1/4 w-3 h-3 bg-cyan-300/50 rounded-full"
    />

    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="max-w-6xl mx-auto px-4 relative z-10"
    >
      {/* Section label */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center mb-12 gap-3"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-900/60 px-4 py-1 text-xs font-medium text-cyan-300 tracking-[0.2em] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Let&apos;s Talk
        </span>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Contact Info */}
        <motion.div
          variants={itemVariants}
          className="space-y-8 lg:pr-4"
        >
          <div className="space-y-4">
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight"
            >
              Let&apos;s Create Something Amazing
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-slate-300 text-lg leading-relaxed max-w-xl"
            >
              I&apos;m always excited to discuss new projects, creative ideas, and
              opportunities to bring your vision to life. Tell me what you&apos;re
              building — I&apos;ll help you make it real.
            </motion.p>
          </div>

          {/* Small status row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 text-sm"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-300 px-3 py-1 border border-emerald-500/30">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              Available for collaboration
            </span>
            <span className="text-slate-400">
              ⏱ Typically replies within <span className="text-cyan-300">a few hours</span>
            </span>
          </motion.div>

          {/* Contact Methods */}
          <motion.div variants={itemVariants} className="space-y-4 pt-2">
            {[
              {
                href: "mailto:vinodrajapaksha.dev@gmail.com",
                text: "vinodrajapaksha.dev@gmail.com",
                label: "Primary contact • Best for detailed project briefs",
                color: "cyan",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                href: "https://github.com/Vinod-Rajapaksha",
                text: "GitHub",
                label: "Explore code, experiments & open-source work",
                color: "slate",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                ),
              },
              {
                href: "https://www.linkedin.com/in/vinod-rajapaksha",
                text: "LinkedIn",
                label: "Let’s connect professionally & discuss opportunities",
                color: "blue",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
            ].map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noreferrer"
                className={`group relative flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-${contact.color}-500/60 transition-all duration-300 backdrop-blur-sm overflow-hidden`}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  boxShadow:
                    "0 24px 60px rgba(15,23,42,0.9), 0 0 40px rgba(56,189,248,0.18)",
                }}
              >
                {/* subtle gradient edge on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10" />

                <motion.div
                  className={`relative z-10 p-2 rounded-lg bg-${contact.color}-500/10 text-${contact.color}-400`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {contact.icon}
                </motion.div>

                <div className="relative z-10 flex-1">
                  <p
                    className={`text-${contact.color}-400 font-semibold group-hover:text-${contact.color}-300 transition-colors`}
                  >
                    {contact.text}
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    {contact.label}
                  </p>
                </div>

                <motion.div
                  className="relative z-10 text-slate-400 group-hover:text-slate-100 transition-colors"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div variants={itemVariants} className="relative">
          {/* Glow behind form */}
          <div className="pointer-events-none absolute -inset-4 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_60%)] opacity-50 blur-3xl" />

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="relative text-center p-8 rounded-2xl bg-gradient-to-br from-green-500/10 via-slate-900/80 to-cyan-500/10 border border-green-500/25 shadow-[0_20px_60px_rgba(15,23,42,0.95)]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/40"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-slate-200 mb-6">
                Thank you for reaching out,{" "}
                <span className="font-semibold text-white">
                  {formData.name}
                </span>
                . I&apos;ve received your message and will get back to you within
                24 hours.
              </p>
              <motion.button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-300 shadow-md hover:shadow-green-500/40"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Another Message
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="relative space-y-6 p-8 rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 shadow-[0_24px_80px_rgba(15,23,42,1)]"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400">
                    Send me a message
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Share as many details as you like — the more context, the
                    better I can help.
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Secure & private
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-slate-300 text-sm font-medium"
                  >
                    Your Name *
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A4 4 0 019 16h6a4 4 0 013.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </span>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/25 transition-all duration-300 text-white placeholder-slate-500"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-slate-300 text-sm font-medium"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12H8m8 4H8m10-8H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2z"
                        />
                      </svg>
                    </span>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/25 transition-all duration-300 text-white placeholder-slate-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-slate-300 text-sm font-medium"
                  >
                    Your Message *
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/25 transition-all duration-300 text-white placeholder-slate-500 resize-none"
                    placeholder="Tell me about your project, timeline, budget range, or just say hello!"
                  />
                  <p className="text-xs text-slate-500 text-right">
                    I read every message personally.
                  </p>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`relative w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? "bg-slate-700 cursor-not-allowed text-slate-200"
                    : "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-lg shadow-cyan-500/25"
                } text-white flex items-center justify-center gap-2`}
                whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 100 24v-4l3 3-3 3v-4a8 8 0 01-8-8z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4l16 8-16 8 4-8-4-8z"
                      />
                    </svg>
                    <span>Send Message</span>
                  </div>
                )}
              </motion.button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </motion.div>
  </section>
);

};

export default Contact;