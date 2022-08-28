import './App.scss';

import {createRef, MouseEvent, RefObject, useEffect} from "react";
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

  const mailContainer = createRef<HTMLDivElement>();
  const githubContainer = createRef<HTMLDivElement>();
  const locationContainer = createRef<HTMLDivElement>();
  const linkedinContainer = createRef<HTMLDivElement>();

  const testObjects = [
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
    createRef<HTMLDivElement>(),
  ]

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

  function rotateElement(ev: MouseEvent<HTMLDivElement>, ref: RefObject<HTMLDivElement>) {
    const contactContainerObj = ref.current;
    if (contactContainerObj === null) return;

    const boundingBox = contactContainerObj.getBoundingClientRect();
    const [left, top, width, heigth] = [boundingBox.left, boundingBox.top, boundingBox.width, boundingBox.height]

    const xOffsetToCenter = ev.clientX - (left + width / 2)
    const yOffsetToCenter = ev.clientY - (top + heigth / 2)

    const xPercent = xOffsetToCenter / (width)
    const yPercent = yOffsetToCenter / (heigth)

    //The rotation around the x-axis dependes on how far away the pointer is from the center on the y-axis
    //Positive rotation pushes the top away from the viewer. The mouse above the center gives a negative offset
    const xRotation = -5 * yPercent; 

    //The rotation around the y-axis dependes on how far away the pointer is from the center on the x-axis
    const yRotation = 5 * xPercent;

    
    const totalXPercent = 50 - xPercent * 100;
    const totalYPercent = 50 - yPercent * 100;
    
    gsap.to(contactContainerObj, {
      rotateX: `${xRotation}deg`,
      rotateY: `${yRotation}deg`,
      backgroundPosition: `${totalXPercent}% ${totalYPercent}%`,
      backgroundImage: "radial-gradient(circle at center, #23a6d5 0, #23a5d557 25%, transparent 40%)"
      // backgroundImage: "radial-gradient(circle at center, white 0, rgba(255, 255, 255, 0.292) 25%, transparent 40%)"
    })
  }

  function rotateElementToZero(ev: MouseEvent<HTMLDivElement>, ref: RefObject<HTMLDivElement>) {
    const contactContainerObj = ref.current;
    if (contactContainerObj === null) return;

    gsap.to(contactContainerObj, {
      rotateY: `0deg`,
      rotateX: `0deg`,
      backgroundImage: "radial-gradient(circle at center, transparent 0, transparent 15%, transparent 30%)"
    })
  }

  function openInNewTab(url: string) {
    window.open(url, '_blank')?.focus();
  }

  function getOffsetFromCenter(angle: number, radius: number) {
    const angleAsRadian = angle * Math.PI / 180
    const x = radius * Math.cos(angleAsRadian)
    const y = radius * Math.sin(angleAsRadian)

    return {x, y}
  }

  const range = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, i) => min + i);


  function convertRemToPixels(rem: number) {    
      return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  // useEffect(() => {
  //   const objs = testObjects.map(ref => ref.current)
  //   const degrees = range(0, 35).map(x => x * 10)
    
  //   objs.forEach((obj, idx) => {
  //     const tl = gsap.timeline({repeat: -1});
  //     degrees.forEach(deg => {
  //       const angleOffset = 60 * idx
  //       const offset = getOffsetFromCenter(deg + angleOffset, 20)
  //       tl.to(obj, {
  //         translateX: `${offset.x}rem`,
  //         translateY: `${offset.y}rem`,
  //         duration: 1,
  //         ease: "none"
  //       })
  //     })
  //   })
    
  // }, [])

  function changeContainerOrientation(obj: HTMLDivElement, tl: GSAPTimeline, angle: number, angleStep: number, radius: number, xOffset: number, flexDirection: string) {
    const offset = getOffsetFromCenter(angle - angleStep, radius);
    const offsetInPixel = offsetToPixel(offset)

    tl.to(obj, {
      translateX: `${offsetInPixel.x - xOffset}px`,
      translateY: `${offsetInPixel.y}px`,
      flexDirection: flexDirection,
      duration: 0,
      ease: "none"
    })
  }

  function offsetToPixel(offset: {x:number, y:number}) {
    return {
      x: convertRemToPixels(offset.x),
      y: convertRemToPixels(offset.y)
    }
  }

  useEffect(() => {
    const radiusInRem = 20;
    const degrees = range(0, 35).map(x => x * 10)
    const tl = gsap.timeline({repeat: -1})
    const obj = githubContainer.current;
    const icon = obj?.getElementsByClassName("contact-icon-border")[0]

    const degreeStep = degrees[1] - degrees[0];

    if (obj === null) return;
    if (icon === undefined) return;

    const containerRect = obj.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    const xOffsetRight = Math.abs(containerRect.left - (iconRect.width / 2) - iconRect.left);
    const xOffsetLeft = Math.abs(containerRect.width - xOffsetRight);

    degrees.forEach(deg => {
      const angleOffset = 0;
      const angle = deg + angleOffset;
      const offset = getOffsetFromCenter(angle, radiusInRem)

      const offsetInPixel = offsetToPixel(offset);
      
      let flexDirection = "row"
      let xOffset = xOffsetRight
      if (90 <= angle && angle < 270) {
        flexDirection = "row-reverse" 
        xOffset = xOffsetLeft
      }

      let duration = 1;
      if (angle === 90 || angle === 270) {
        changeContainerOrientation(obj, tl, angle, degreeStep, radiusInRem, xOffset, flexDirection);
      }

      tl.to(obj, {
        translateX: `${offsetInPixel.x - xOffset}px`,
        translateY: `${offsetInPixel.y}px`,
        flexDirection: flexDirection,
        duration: duration,
        ease: "none"
      })
    })    
  }, [])


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
          <Experience panelRef={panelExperience} />
        </Panel>
        <Panel ref={panelContact} className="contact">
          {/* {testObjects.map(ref => {
            return <div className="contact-test" ref={ref}></div>
          })} */}
          <div className="contact-hint">
            <span className="highlighted">Click</span><br/>to ...
          </div>
          {/* <div 
            onMouseMove={(ev) => rotateElement(ev, mailContainer)} 
            onMouseLeave={(ev) => rotateElementToZero(ev, mailContainer)}
            onClick={() => openInNewTab("mailto:simon@steinheber.info")}
            ref={mailContainer} 
            className="contact-container mail"
          >
            <div className="contact-icon-border">
              <img src="mail.svg" className="contact-icon"/>
            </div>
            <div className="contact-text">
              write me
            </div>
          </div> */}
          <div 
            onMouseMove={(ev) => rotateElement(ev, githubContainer)} 
            onMouseLeave={(ev) => rotateElementToZero(ev, githubContainer)} 
            onClick={() => openInNewTab("https://github.com/stoney95")}
            ref={githubContainer} 
            className="contact-container github"
          >
            <div className="contact-icon-border">
              <img src="github.svg" className="contact-icon"/>
            </div>
            <div className="contact-text">
              see my github
            </div>
          </div>
          {/* <div 
            onMouseMove={(ev) => rotateElement(ev, linkedinContainer)} 
            onMouseLeave={(ev) => rotateElementToZero(ev, linkedinContainer)} 
            onClick={() => openInNewTab("https://www.linkedin.com/in/simon-s-a1b033191/")}
            ref={linkedinContainer} 
            className="contact-container linkedin"
            >
            <div className="contact-icon-border">
              <img src="linkedin.svg" className="contact-icon"/>
            </div>
            <div className="contact-text">
              connect
            </div>
          </div>
          <div 
            onMouseMove={(ev) => rotateElement(ev, locationContainer)} 
            onMouseLeave={(ev) => rotateElementToZero(ev, locationContainer)} 
            onClick={() => openInNewTab("https://goo.gl/maps/Z6yTa4vnMAQMNWos6")}
            ref={locationContainer} 
            className="contact-container location"
          >
            <div className="contact-icon-border">
              <img src="location.svg" className="contact-icon"/>
            </div>
            <div className="contact-text">
              see my hometown
            </div>
          </div> */}
        </Panel>
      </div>
      {/* <video className="video" muted preload="auto" ref={videoRef}>
        <source src="waves.mp4" type="video/mp4"/>
      </video> */}
    </div>
  );
}

export default App;
