import { useEffect } from "react";
import { gsap } from "gsap";

import PanelWithLabel from "../types/panel";
import {flatten} from "./utils";



const usePanelAnimation = (panelsWithLabels: PanelWithLabel[]) => {
    const allRefs = flatten(panelsWithLabels);

    useEffect(() => {
        panelsWithLabels.forEach(({panel, label}) => {
            if (label.current === null) return;

            const labelBoundingRect = label.current.getBoundingClientRect();
            const labelHeight = labelBoundingRect.height;
            const labelTop = labelBoundingRect.top;

            const containerTop = label.current.parentElement?.getBoundingClientRect().top;

            if (containerTop === undefined) return;
            const padding = Math.abs(containerTop - labelTop);

            gsap.to(label.current, {
                scrollTrigger: {
                  trigger: panel.current,
                  start: `top ${containerTop}px`,
                  end: "bottom bottom",
                  scrub: 0,
                },
                transform: `translateY(calc(-100vh + 2*${padding}px + ${labelHeight}px))`,
                ease: "linear"

            })
        
            gsap.to(panel.current, {
                scrollTrigger: {
                  trigger: panel.current,
                  start: "top bottom",
                  end: "bottom bottom",
                //   snap: {snapTo: 1, delay: 0.0, duration: {min: 0.05, max: 2}}
                },
                ease: "linear"
            })
        })
    }, allRefs)
}

export default usePanelAnimation;