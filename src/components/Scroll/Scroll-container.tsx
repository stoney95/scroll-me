import {FC, useEffect, useRef} from 'react';
import {gsap} from "gsap";

import {default as ScrollView} from "./Scroll-view";
import useAnimation from '../../hooks/useAnimation';

const ScrollContainer: FC = () => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    const scrollTriangle = useRef<HTMLDivElement>(null);

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
        const tl = gsap.timeline({repeat: -1, repeatDelay: 1});
        tl
            .to(triangle, 0.8, {transform: "translateY(1em) rotate(45deg)", borderImage: "linear-gradient(60deg, #23a6d5, #23a6d5) 1"})
            .to(triangle, 0.5, {transform: "translateY(0.5em) rotate(45deg)"})
            .to(triangle, 0.5, {transform: "translateY(1em) rotate(45deg)"})
            .to(triangle, 0.8, {transform: "translateY(0em) rotate(45deg)", borderImage: "linear-gradient(60deg, #23a6d5, #23d5ab) 1"})
    }

    useAnimation(scrollContainer, animateContainer);
    useAnimation(scrollTriangle, animateTriangle);

    useEffect(() => {
        const triangle = scrollTriangle.current;
        if (triangle === null) return;
    }, [])

    return <ScrollView ref={scrollContainer} refTriangle={scrollTriangle} />
}

export default ScrollContainer;