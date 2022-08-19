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


  const experienceLabels = createRef<HTMLDivElement>();
  const experienceShortDesc = createRef<HTMLDivElement>();
  const experienceLongDesc = createRef<HTMLDivElement>();
  const experienceDetails = createRef<HTMLDivElement>();

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

  const years = [2018, 2019, 2020, 2021, 2022]
  const range = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const projectStarts = {
    "2018": [4, 11],
    "2019": [1, 5, 8, 10],
    "2020": [3, 6, 11],
    "2021": [2, 7],
    "2022": [4, 7, 9]
  }

  const activeProject = {
    year: "2020",
    month: 6,
    labels: ["developer", "natural language processing", "team size: 12", "pyspark", "hdfs", "python", "pytest"],
    shortDescription: "Migrating historically grown database views to PySpark",
    longDescription: "The project was a big migration project. I was responsible to migrate historically grown, verbose database views to PySpark. I helped to business unit to understand the logic implemented in the views and migrated them to PySpark. By this I reduced the runtime and enabled the BU to use the results from the data transformation"
  }

  useEffect(() => {
    function calculateTarget() {
      if (experienceDetails.current === null) return "top top";
      const detailsTop = experienceDetails.current.getBoundingClientRect().top;
      const viewHeight = window.visualViewport.height;

      const detailsBottomTarget = detailsTop + 0.4 * viewHeight;

      console.log(detailsTop, viewHeight, detailsBottomTarget)

      return `bottom ${detailsBottomTarget}px`
    }


    const tl = gsap.timeline();
    tl.fromTo(experienceDetails.current, 
      {height: "0vh"},
      {height: "40vh"}  
    ).addLabel("detailsExpanded")
    
    tl.fromTo(experienceLabels.current,
      {top: `40vh`},
      {top: "30%", duration: 1}  
    ).addLabel("labelsInPlace")

    tl.fromTo(experienceLongDesc.current,
      {top: `40vh`},
      {top: "30%", duration: 0.75},
      "<25%"  
    ).addLabel("descriptionInPlace")

    tl.to(experienceShortDesc.current, 
      {opacity: 0.4},
      "detailsExpanded+=25%"
    ).addLabel("titleFadedOut")

    ScrollTrigger.create({
      animation: tl,
      trigger: panelExperience.current,
      start: "top top",
      end: "+=60%",
      scrub: true,
      pin: panelExperience.current,
      pinSpacing: true,
    })

    const labelsHeight = experienceLabels.current?.getBoundingClientRect().height;
  }, [])

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
          <div className='experience-container'>
            {(Object.keys(projectStarts) as (keyof typeof projectStarts)[]).map(year => {
              const yearActive = year === activeProject.year;

              return <div className='experience-year-container'>
                <div className="experience-year">
                  <div className='experience-year-label'>{year}</div>
                  <div className='experience-months'>
                    {range(1,12).map(month => {
                      let className = "experience-month"
                      const monthProjectStart = projectStarts[year].includes(month);
                      const monthActive = activeProject.month === month;

                      if (monthProjectStart) className += " project-start"
                      if (monthActive) className += " active"
                      return <div className={"experience-month-container"}>
                        <div className={className}/>
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
          </div>
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
