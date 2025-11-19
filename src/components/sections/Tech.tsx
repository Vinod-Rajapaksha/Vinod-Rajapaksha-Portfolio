import { useEffect, useState } from "react";
import BallCanvas from "../canvas/Ball";
import SectionWrapper from "../../hooks/section-wrapper";
import { technologies } from "../../data/technologies";

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleTechnologies = isMobile
    ? technologies.slice(0, 6) 
    : technologies;            

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {visibleTechnologies.map((technology) => (
        <div className="h-28 w-28" key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

const TechSection = SectionWrapper(Tech, "tech");

export default TechSection;