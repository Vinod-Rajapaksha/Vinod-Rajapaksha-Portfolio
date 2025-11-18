import BallCanvas from "../canvas/Ball";
import SectionWrapper from "../../hooks/section-wrapper";
import { technologies } from "../../data/technologies";

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div className="h-28 w-28" key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

const TechSection = SectionWrapper(Tech, "tech");

export default TechSection;