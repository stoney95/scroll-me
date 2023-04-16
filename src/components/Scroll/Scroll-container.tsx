import {FC, RefObject, useEffect, useRef} from 'react';
import {gsap} from "gsap";

import {default as ScrollView} from "./Scroll-view";
import useAnimation from '../../hooks/useAnimation';

interface ScrollProps {
    panelRef: RefObject<HTMLDivElement>;
    stopPanelRef: RefObject<HTMLDivElement>;
    titleRef: RefObject<HTMLHeadingElement>;
}

const ScrollContainer: FC<ScrollProps> = ({panelRef, stopPanelRef, titleRef}) => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    const scrollTriangle = useRef<HTMLDivElement>(null);
    const scrollExplanation = useRef<HTMLParagraphElement>(null);

    const animateTitle = (title: HTMLHeadingElement) => {
        if (panelRef.current === null) return
        if (stopPanelRef.current === null) return

        gsap.to(title, {
            scrollTrigger: {
                trigger: panelRef.current,
                endTrigger: stopPanelRef.current,
                start: "top top",
                end: "bottom top",
                pin: title,
                pinSpacing: true,
            }
        })

        gsap.to(title, {
            opacity: 0,
            scrollTrigger: {
                trigger: stopPanelRef.current,
                start: "bottom 90%",
                end: "bottom 80%",
                scrub: 0.5
            }
        })
    }

    const animateExplanation = (explanation: HTMLParagraphElement) => {
        if (titleRef.current === null) return;
        if (scrollContainer.current === null) return;

        const titleBottom = titleRef.current.getBoundingClientRect().bottom;
        const viewHeight = window.innerHeight / 100;

        gsap.to(explanation, {
            opacity: 0,
            scrollTrigger: {
                trigger: explanation,
                start: `top ${titleBottom + viewHeight}`,
                end: `bottom ${titleBottom + viewHeight}`,
                scrub: 0.5,
                pin: explanation
            }
        })

        gsap.to(scrollContainer.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: explanation,
                start: `top ${titleBottom + viewHeight}`,
                end: `bottom ${titleBottom + viewHeight}`,
                scrub: 0.5,
                pin: explanation
            }
        })
    }

    const animateTriangle = (triangle: HTMLDivElement) => {
        const tl = gsap.timeline({repeat: -1, repeatDelay: 0.5});
        tl
            .to(triangle, {duration:0.8, transform: "translateY(1em) rotate(45deg)", borderImage: "linear-gradient(60deg, #23a6d5, #23a6d5) 1"})
            .to(triangle, {duration:0.8, transform: "translateY(0em) rotate(45deg)", borderImage: "linear-gradient(60deg, #23a6d5, #23d5ab) 1"})
    }

    useAnimation(scrollTriangle, animateTriangle);
    useAnimation(titleRef, animateTitle);
    useAnimation(scrollExplanation, animateExplanation);

    useEffect(() => {
        const triangle = scrollTriangle.current;
        if (triangle === null) return;
    }, [])

    return <ScrollView ref={scrollContainer} refTriangle={scrollTriangle} refTitle={titleRef} refExplanation={scrollExplanation}/>
}

export default ScrollContainer;