import {FC, RefObject} from "react";

import "./Experience.scss";
import { ExperienceViewProps, Months, ExperienceViewDataWithRef } from "./types";



function addExperienceDetails(experiences: Map<number, Map<number, ExperienceViewDataWithRef>>, year: number, mobileView: boolean) {
    const experiencesInYear = experiences.get(year)?.values();
    if (experiencesInYear === undefined) return <></>

    const experiencesArray = Array.from(experiencesInYear)
    return <>{
        experiencesArray.map((experience) => {
            return <div className="experience-detail">
                <div ref={experience.titleRef} className='experience-title'>
                    {mobileView ? experience.titleShort : experience.title}
                </div>
                <div ref={experience.labelRef} className='experience-label-container'>
                    {experience.labels.map(label => <div className='experience-label'>{label}</div>)}
                    {!mobileView && experience.tags.map(tag => <div className='experience-label'>{tag}</div>)}
                </div>
                <div ref={experience.descriptionContainerRef} className="experience-description-container">
                    <div ref={experience.descriptionRef} className='experience-description'>
                        <p ref={experience.descriptionParagraphRef}>{experience.description}</p>
                    </div>
                </div>
            </div>
        })
    }</>
}

const ExperienceView: FC<ExperienceViewProps> = ({years, months, experiences, mobileView}) => {
    return <div className='experience-container'>
    {years.map(({year, ref: yearRef}) => {
        return <div className='experience-year-container'>
            <div className="experience-year">
                <div className='experience-year-label'>{year}</div>
                <div className='experience-months'>
                    {months.map(month => {
                        let className = "experience-month"
                        const monthExperience = experiences.get(year)?.get(month);
                        const monthActive = monthExperience !== undefined;

                        if (monthActive) className += " project-start"
                        return <div className={"experience-month-container"}>
                            {monthActive ? 
                            <div ref={monthExperience.circleRef} className={className}/> : 
                            <div className={className}/>
                            }
                        </div>
                    })}
                </div>
            </div>
            <div ref={yearRef} className='experience-details-container'>
                {addExperienceDetails(experiences, year, mobileView)}
            </div>
        
      </div>
    })}
    <div className='experience-year'>
      <div className='experience-year-label'></div>
      <div className='experience-months'>
        {months.map(month => {
            return <div className='experience-month-container'>
                <span className="experience-month-label">
                    {Object.keys(Months)[Object.values(Months).indexOf(month)]}
                </span>
            </div>
        })}
      </div>
    </div>
  </div>
}

export default ExperienceView;