import {FC, useRef} from "react";
import {Skill} from "./types"
import { gsap } from "gsap";

import useAnimation from "../../../hooks/useAnimation";

import "./Skill.scss";



const SkillView: FC<Skill> = ({name, column, containerAnimation}) => {
    const multiColumn = useRef<HTMLDivElement>(null);
    const multiColumnText = useRef<HTMLSpanElement>(null);

    const animateText = (skillView: HTMLDivElement) => {
        const t1 = gsap.timeline({
            scrollTrigger: {
                trigger: skillView,
                start: "left 70%",
                end: "left 20%",
                scrub: 1,
                containerAnimation: containerAnimation,
                markers: true
            },
        });


        t1.to(
            skillView,
            {
                translateX: 5,
                scrollTrigger: {
                    trigger: skillView,
                    start: "left 10%",
                    end: "right 90%",
                    pin: multiColumnText.current,
                    markers: true
                }
            }
        )
    }

    // useAnimation(multiColumn, animateText)

    const colRange = column.end - column.start;

    if (colRange > 1) return <div ref={multiColumn} className="skill multi-column"><span ref={multiColumnText}>{name}</span></div>
    return <div className="skill"><span >{name}</span></div>
}

export default SkillView;