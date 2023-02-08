
import LiveVisor from "../components/GeneratorVisorCounter";
import NavContent from '../contents/NavContentGenerator'

const GeneratorVisor = () => {
  return (
    <div className="mx-auto">
      <NavContent/>
      <LiveVisor />
    </div>
  );
};

export default GeneratorVisor;
