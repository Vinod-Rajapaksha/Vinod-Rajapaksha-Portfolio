const Contact = () => {
  return (
    <section id="contact" className="bg-slate-950 text-slate-100 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-slate-300 mb-6">
          Want to talk about a project, collaboration or opportunity?
          Reach out any time.
        </p>
        <div className="flex flex-col gap-3 text-sm">
          <a
            href="mailto:vinodrajapaksha.dev@gmail.com"
            className="underline underline-offset-4 text-cyan-400"
          >
            vinodrajapaksha.dev@gmail.com
          </a>
          <a
            href="https://github.com/Vinod-Rajapaksha"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 text-slate-300"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vinod-rajapaksha"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 text-slate-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
