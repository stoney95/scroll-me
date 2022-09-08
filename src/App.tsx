import './App.scss';

import {createRef, MouseEvent, RefObject, useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Panel from "./components/Panel";
import usePanelAnimation from './hooks/usePanelAnimation';
import useLabelAnimation from './hooks/useLabelAnimation';
import Label from './components/Label';
import Scroll from './components/Scroll';
import Person from './components/Person';
import SkillsPlane from './components/SkillsPlane';
import Experience from './components/Experience';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

function App() {
  const videoRef = createRef<HTMLVideoElement>()
  const labelPerson = createRef<HTMLDivElement>()
  const labelSkills = createRef<HTMLDivElement>()
  const labelExperience = createRef<HTMLDivElement>()
  const labelContact = createRef<HTMLDivElement>()

  const panelPerson = createRef<HTMLDivElement>()
  const panelSkills = createRef<HTMLDivElement>()
  const panelExperience = createRef<HTMLDivElement>()
  const panelContact = createRef<HTMLDivElement>()

  useEffect(() => {
    function updateVideo() {
      const scrollPerenctage = window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
      const video = videoRef.current;
      
      if (video !== null) {
        const time = video.duration * scrollPerenctage * 0.9
        video.currentTime = time
      }
    }
    
    document.addEventListener("scroll", updateVideo)
    return () => document.removeEventListener("scroll", updateVideo)
  }, [])

  const panelsWithLabels = [
    {label: labelPerson, panel: panelPerson},
    {label: labelSkills, panel: panelSkills},
    {label: labelExperience, panel: panelExperience},
    {label: labelContact, panel: panelContact},
  ]

  usePanelAnimation(panelsWithLabels);
  useLabelAnimation(panelsWithLabels);

  return (
    <div className="App">
      <div className="container">
        <Label text="Person" ref={labelPerson} panel={panelPerson}/>
        <Label text="Skills" ref={labelSkills} panel={panelSkills}/>
        <Label text="Experience" ref={labelExperience} panel={panelExperience}/>
        <Label text="Contact" ref={labelContact} panel={panelContact}/>
      </div>
      <div className="panels">
        <Panel className="scroll">
          <Scroll/>
        </Panel>
        <Panel ref={panelPerson} className="panel person">
          <Person panelRef={panelPerson}/>
        </Panel>
        <Panel ref={panelSkills} className="skills">
          <SkillsPlane panelRef={panelSkills}/>
        </Panel>
        <Panel ref={panelExperience} className="experience">
          <Experience panelRef={panelExperience} />
        </Panel>
        <Panel ref={panelContact} className="contact">
          <Contact />
        </Panel>
      </div>
      {/* <video className="video" muted preload="auto" ref={videoRef}>
        <source src="waves.mp4" type="video/mp4"/>
      </video> */}
    </div>
  );
}

export default App;
