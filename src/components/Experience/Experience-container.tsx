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
                descriptionContainerRef: createRef<HTMLDivElement>(),
                descriptionParagraphRef: createRef<HTMLParagraphElement>(),
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
        const detailsHeight = "50vh"

        yearsWithRef.forEach(year => {
            const experiencesInYear = experiencesWithRefs.get(year.year)
            
            experiencesInYear?.forEach((experience) => {
                if (experience.descriptionContainerRef.current === null) return;
                if (experience.descriptionParagraphRef.current === null) return;
                
                const descriptionContainerHeight = experience.descriptionContainerRef.current?.getBoundingClientRect().height;
                const descriptionParagraphHeight = experience.descriptionParagraphRef.current?.getBoundingClientRect().height;

                const yPercent = Math.max(0, (descriptionParagraphHeight - descriptionContainerHeight) / descriptionParagraphHeight * 100);
                if (experience.viewPercent === undefined) experience.viewPercent = yPercent;
            })
            
            tl.fromTo(year.ref.current, 
                {height: "0vh"},
                {height: detailsHeight},
            ).addLabel(`detailsExpanded${year.year}`)
                

            experiencesInYear?.forEach((experience, month) => {
                const circleWidth = experience.circleRef.current ? experience.circleRef.current.getBoundingClientRect().width : 4;
                tl.to(experience.circleRef.current, 
                    {
                        boxShadow: `0px 0px 15px 1px rgba(35, 213, 171, 0.99), inset 0px 0px 0px ${circleWidth / 4}px rgba(35, 213, 171, 1)`,
                        scale: 1.5,
                        duration: 0.25,
                        ease: "none"
                    },
                ).addLabel(`circleFocused${year}${month}`)

                tl.fromTo(experience.titleRef.current,
                    {opacity: 0},
                    {opacity: 1},
                    `circleFocused${year}${month}-=10%`
                )
                  
                tl.fromTo(experience.labelRef.current,
                    {translateY: detailsHeight, opacity: 0, duration: 1},
                    {translateY: 0, opacity: 1}  
                ).addLabel(`labelsInPlace${year}${month}`)
            
                tl.fromTo(experience.descriptionRef.current,
                    {height: "0%"},
                    {height: "100%", duration: 1},
                    "<25%"  
                ).addLabel(`descriptionInPlace${year}${month}`)

                if (experience.viewPercent !== undefined) {
                    tl.to(experience.descriptionParagraphRef.current,
                        {
                            yPercent: -experience.viewPercent,
                            duration: experience.viewPercent === 0 ? 0 : experience.viewPercent / 100 + 1
                        }
                    )
                }
            
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
                    // {border: "0.7em solid transparent", duration: 0.3}
                    {
                        // background: "black",
                        scale: 1,
                        boxShadow: "0px 0px 0px 0px black, inset 0px 0px 0px 0px black", 
                        duration: 0.3
                    }
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