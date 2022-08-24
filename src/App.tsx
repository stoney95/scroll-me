import './App.scss';

import {createRef, useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"

import Panel from "./components/Panel";
import usePanelAnimation from './hooks/usePanelAnimation';
import useLabelAnimation from './hooks/useLabelAnimation';
import Label from './components/Label';
import Scroll from './components/Scroll';
import Person from './components/Person';
import SkillsPlane from './components/SkillsPlane';
import Experience from './components/Experience';

gsap.registerPlugin(ScrollTrigger);


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
        <Label text="Person" ref={labelPerson} />
        <Label text="Skills" ref={labelSkills} />
        <Label text="Experience" ref={labelExperience} />
        <Label text="Contact" ref={labelContact} />
      </div>
      <div className="panels">
        <Panel className="scroll">
          <Scroll/>
        </Panel>
        <Panel ref={panelPerson} className="panel person">
          <Person panelRef={panelPerson}/>
        </Panel>
        <Panel ref={panelSkills} className="skills">
          <SkillsPlane />
        </Panel>
        <Panel ref={panelExperience} className="experience">
          {/* <div className='experience-container'>
            {(Object.keys(projectStarts) as (keyof typeof projectStarts)[]).map(year => {
              const yearActive = year === activeProject.year;

              return <div className='experience-year-container'>
                <div className="experience-year">
                  <div className='experience-year-label'>{year}</div>
                  <div className='experience-months'>
                    {range(1,12).map(month => {
                      let className = "experience-month"
                      const monthProjectStart = projectStarts[year].includes(month);
                      const monthActive = activeProject.month === month && activeProject.year === year;

                      if (monthProjectStart) className += " project-start"
                      return <div className={"experience-month-container"}>
                        {monthActive ? 
                          <div ref={experienceCircleFocus} className={className}/> : 
                          <div className={className}/>
                        }
                      </div>
                    })}
                  </div>
                </div>
                {yearActive &&
                  <div ref={experienceDetails} className='experience-details-container'>
                      <div ref={experienceShortDesc} className='experience-short-description'>
                        {activeProject.shortDescription}
                      </div>
                      <div ref={experienceLabels} className='experience-label-container'>
                        {activeProject.labels.map(label => <div className='experience-label'>{label}</div>)}
                      </div>
                      <div ref={experienceLongDesc} className='experience-long-description'>
                        {activeProject.longDescription}
                      </div>
                  </div>
                }
              </div>
            })}
            <div className='experience-year'>
              <div className='experience-year-label'></div>
              <div className='experience-months'>
                {range(1,12).map(month => {return <div className='experience-month-container'>AUG</div>})}
              </div>
            </div>
          </div> */}
          <Experience panelRef={panelExperience} />
        </Panel>
        <Panel ref={panelContact} className="contact"></Panel>
      </div>
      {/* <video className="video" muted preload="auto" ref={videoRef}>
        <source src="waves.mp4" type="video/mp4"/>
      </video> */}
    </div>
  );
}

export default App;
