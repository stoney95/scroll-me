import {FC, RefObject, useEffect, useRef} from 'react';
import {gsap} from "gsap";

import {default as ScrollView} from "./Scroll-view";
import useAnimation from '../../hooks/useAnimation';

interface ScrollProps {
    panelRef: RefObject<HTMLDivElement>;
    stopPanelRef: RefObject<HTMLDivElement>;
}

const ScrollContainer: FC<ScrollProps> = ({panelRef, stopPanelRef}) => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    const scrollTriangle = useRef<HTMLDivElement>(null);
    const title = useRef<HTMLHeadingElement>(null);

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

    const animateContainer = (container: HTMLDivElement) => {
        const top = container.getBoundingClientRect().top;
        gsap.to(container, {
            scrollTrigger: {
                trigger: container,
                start: `top ${top * 0.9}px`,
                end: "top 10%",
                scrub: 0.5
            },
            opacity: 0
        })
    }

    const animateTriangle = (triangle: HTMLDivElement) => {
        const tl = gsap.timeline({repeat: -1, repeatDelay: 0.5});
        tl
            .to(triangle, {duration:0.8, transform: "translateY(1em) rotate(45deg)", borderImage: "linear-gradient(60deg, #23a6d5, #23a6d5) 1"})
            // .to(triangle, {duration:0.5, transform: "translateY(0.5em) rotate(45deg)"})
            // .to(triangle, {duration:0.5, transform: "translateY(1em) rotate(45deg)"})
            .to(triangle, {duration:0.8, transform: "translateY(0em) rotate(45deg)", borderImage: "linear-gradient(60deg, #23a6d5, #23d5ab) 1"})
    }

    useAnimation(scrollContainer, animateContainer);
    useAnimation(scrollTriangle, animateTriangle);
    useAnimation(title, animateTitle);

    useEffect(() => {
        const triangle = scrollTriangle.current;
        if (triangle === null) return;
    }, [])

    return <ScrollView ref={scrollContainer} refTriangle={scrollTriangle} refTitle={title}/>
}

export default ScrollContainer;