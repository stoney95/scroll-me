import {createRef, FC, useContext, useEffect} from 'react';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"

import {default as ExperienceView} from "./Experience-view";

import { ExperienceContext } from '../../context/data/experience';
import {ExperienceByDate, ExperienceProps, ExperienceViewByDate, ExperienceViewData, ExperienceViewDataWithRef} from "./types"

const range = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

const transformToViewProps = (experiences: ExperienceByDate[]) => {
    const transformedExperiences = experiences.map((exp) => {
        let additionalLabels = exp.data.additionalLabels;
        if (additionalLabels === undefined) additionalLabels = []

        return {
            date: exp.date,
            data: {
                title: exp.data.title,
                description: exp.data.description,
                labels: [
                    `${exp.data.scope}`,
                    `role: ${exp.data.role}`,
                    `team size: ${exp.data.teamSize}`,
                    ...additionalLabels
                ]
            }
        }
    })

    return transformedExperiences
}

const structureExperiencesByDate = (experiences: ExperienceViewByDate[]) => {
    return experiences.reduce((prev, current) => {
        const year = current.date.year;
        const month = current.date.month;
        const props = current.data;
        const prevYear = prev.get(year);

        if (prevYear !== undefined) {
            prevYear.set(month, props);
            prev.set(year, prevYear);
        } else {
            const prevYear = new Map<number, ExperienceViewData>();
            prevYear.set(month, props)
            prev.set(year, prevYear);
        }

        return prev
    }, new Map<number, Map<number, ExperienceViewData>>())
}

const sortExperiencesByDate = (experiences: Map<number, Map<number, ExperienceViewData>>) => {
    const sortedByYear = new Map([...experiences].sort());
    sortedByYear.forEach((value, year) => {
        sortedByYear.set(year, new Map([...value].sort()))
    })

    return sortedByYear;
}

const addRefsToExperiences = (experiences: Map<number, Map<number, ExperienceViewData>>) => {
    const experiencesWithRefs = new Map<number, Map<number, ExperienceViewDataWithRef>>()
    experiences.forEach((year, keyYear) => {
        const monthsOfYear = new Map<number, ExperienceViewDataWithRef>();
        year.forEach(((month, keyMonth) => {
            const experienceViewDataWithRefs = {
                ...month,
                titleRef: createRef<HTMLDivElement>(),
                descriptionRef: createRef<HTMLDivElement>(),
                labelRef: createRef<HTMLDivElement>(),
                circleRef: createRef<HTMLDivElement>(),
            }

            monthsOfYear.set(keyMonth, experienceViewDataWithRefs)
        }))

        experiencesWithRefs.set(keyYear, monthsOfYear)
    })

    return experiencesWithRefs
}

const ExperienceContainer: FC<ExperienceProps> = ({panelRef}) => {
    const experiences = useContext(ExperienceContext);

    const experienceViewData = transformToViewProps(experiences);
    const structuredExperiences = structureExperiencesByDate(experienceViewData);
    const sortedExperiences = sortExperiencesByDate(structuredExperiences);
    const experiencesWithRefs = addRefsToExperiences(sortedExperiences);

    const years = experiences.map(exp => exp.date.year)
    const completeYearRange = range(Math.min(...years), Math.max(...years))
    const yearsWithRef = completeYearRange.map(year => {return {year: year, ref: createRef<HTMLDivElement>()}})
    const months = range(1,12);

    useEffect(() => {
        const tl = gsap.timeline();

        yearsWithRef.forEach(year => {
            tl.fromTo(year.ref.current, 
                {height: "0vh"},
                {height: "40vh"},
            ).addLabel(`detailsExpanded${year.year}`)

            const experiencesInYear = experiencesWithRefs.get(year.year)

            experiencesInYear?.forEach((experience, month) => {
                tl.fromTo(experience.circleRef.current, 
                    {border: "0.0em solid rgba(35, 213, 171, 0.0)"},
                    {border: "0.7em solid rgba(35, 213, 171, 0.99)", duration: 0.25}
                ).addLabel(`circleFocused${year}${month}`)

                tl.fromTo(experience.titleRef.current,
                    {opacity: 0},
                    {opacity: 1},
                    `circleFocused${year}${month}-=10%`
                )
                  
                tl.fromTo(experience.labelRef.current,
                    {top: `40vh`},
                    {top: "50%", duration: 1, transform: "translateY(-50%)"}  
                ).addLabel(`labelsInPlace${year}${month}`)
            
                tl.fromTo(experience.descriptionRef.current,
                    {top: `40vh`},
                    {top: "50%", duration: 0.75, transform: "translateY(-50%)"},
                    "<25%"  
                ).addLabel(`descriptionInPlace${year}${month}`)
            
                tl.to(experience.titleRef.current, 
                    {opacity: 0.4},
                    `descriptionInPlace${year}${month}-=50%`
                ).addLabel(`titleFadedOut${year}${month}`)
            
                tl.to(experience.labelRef.current,
                    {opacity: 0.0, duration:0.5}  
                ).addLabel(`labelsGone${year}${month}`)
            
                tl.to(experience.descriptionRef.current,
                    {opacity: 0.0, duration: 0.5},
                    `labelsGone${year}${month}-=50%`,
                ).addLabel(`descriptionGone${year}${month}`)
            
                tl.to(experience.titleRef.current,
                    {opacity: 0.0, duration: 0.3},
                    `labelsGone${year}${month}`
                )

                tl.to(experience.circleRef.current,
                    {border: "0.0em solid rgba(35, 213, 171, 0.0)", duration: 0.3}
                ).addLabel(`circleFocusGone${year}${month}`)
            })

            tl.to(year.ref.current,
                {height: "0vh"}  
              ).addLabel(`detailsGone${year}`)
        })
    
        ScrollTrigger.create({
          animation: tl,
          trigger: panelRef.current,
          start: "top top",
          end: `+=${experiences.length * 100}%`,
          scrub: true,
          pin: panelRef.current,
          pinSpacing: true,
        })
      }, [])

    return (<ExperienceView years={yearsWithRef} months={months}  experiences={experiencesWithRefs}/>)
}

export default ExperienceContainer;