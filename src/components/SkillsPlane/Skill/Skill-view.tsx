import {FC, useEffect, useRef} from "react";
import {Skill} from "./types"
import { gsap } from "gsap";

import useAnimation from "../../../hooks/useAnimation";

import "./Skill.scss";



const SkillView: FC<Skill> = ({name, column, containerAnimation, containerRef}) => {
    const skillTagRef = useRef<HTMLDivElement>(null);
    const skillTextRef = useRef<HTMLSpanElement>(null);
    
    const animateText = (skillTag: HTMLDivElement, skillText: HTMLSpanElement, container: HTMLDivElement) => {
        if (containerAnimation === undefined) return;

        const skillTagBoundingRect = skillTag.getBoundingClientRect();
        const containerBoundingRect = container.getBoundingClientRect();

        const widthSkillTag = skillTagBoundingRect.width;
        const widthContainer = containerBoundingRect.width;
        const containerLeft = containerBoundingRect.left;
        const containerRight = containerBoundingRect.right;
        
        const initialOffset = -widthSkillTag / 2 + widthContainer / 2;
        const endOffset = -initialOffset;

        gsap.set(skillText, {translateX: initialOffset})
        gsap.to(
            skillText,
            {
                translateX: endOffset,
                ease: "none",
                scrollTrigger: {
                    trigger: skillTag,
                    start: `left ${containerLeft}px`,
                    end: `right ${containerRight}px`,
                    scrub: 0,
                    containerAnimation: containerAnimation,
                    id: name,
                },
            }
        )
    }

    useEffect(() => {
        if (skillTagRef.current === null) return;
        if (skillTextRef.current === null) return;
        if (containerRef.current === null) return;

        animateText(skillTagRef.current, skillTextRef.current, containerRef.current)
    }, [containerAnimation])

    const colRange = column.end - column.start;

    if (colRange > 1) return <div ref={skillTagRef} className="skill multi-column"><span ref={skillTextRef}>{name}</span></div>
    return <div className="skill"><span >{name}</span></div>
}

export default SkillView;