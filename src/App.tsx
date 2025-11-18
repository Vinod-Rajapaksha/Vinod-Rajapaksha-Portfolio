import Navbar from "./components/Navbar";
import ElasticCursor from "./components/ElasticCursor";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Tech from "./components/sections/Tech";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Preloader from "./components/preloader/preloader";

function App() {
  return (
    <Preloader>
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <ElasticCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Tech />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Vinod Rajapaksha. All rights reserved.
      </footer>
    </div>
    </Preloader>
  );
}

export default App;