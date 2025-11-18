const About = () => {
  return (
    <section id="about" className="bg-slate-950 text-slate-100 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-slate-300 max-w-3xl">
          I'm Vinod Rajapaksha, a passionate Full-Stack Developer and Software Engineering undergraduate, driven by the challenge of turning ideas into real, functional digital products. I specialize in building end-to-end solutions — from designing responsive, user-friendly interfaces to architecting efficient backend systems.
          <br /><br />
          I’ve worked with a wide range of technologies, including the MERN Stack (MongoDB, Express.js, React.js, Node.js), Jakarta EE, Spring Boot, and modern tools like Docker, Git/GitHub, Axios, Mongoose, Postman, and more. My project experience includes building scalable applications such as an Employee Management System and a Food Ordering System, which strengthened my understanding of REST APIs, database design, UI/UX principles, and deployment pipelines.
          <br /><br />
          I’m continuously exploring new technologies to refine my craft — whether it's improving performance, enhancing user experience, or adopting better development practices. Beyond coding, I value strong problem-solving, clean architecture, and writing maintainable, readable code.
          <br /><br />
          My aim is Build impactful, efficient, and modern digital experiences that solve real-world problems.
        </p>
        <h3 className="mt-8 mb-3 font-medium text-slate-200">Tech Stack</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          {["JavaScript", "TypeScript", "React", "Vite", "Tailwind", "Node.js", "Express", "Python", "Java", "Spring Boot", "MongoDB", "SQL"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default About;