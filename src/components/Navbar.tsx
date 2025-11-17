import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Animated Logo */}
        <a
          href="#home"
          className="group relative font-semibold text-slate-100 text-lg"
        >
          <span className="relative z-10 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            {"<"}Vinod Rajapaksha{"/>"}
          </span>
        </a>

        {/* Navigation with Hover Effects */}
        <div className="flex gap-8 items-center">
          {["About", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-slate-300 hover:text-cyan-400 transition-colors duration-300 group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* CTA Button */}
          <a
            href="#contact"
            className="ml-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            Let&apos;s Talk
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
