import { useEffect } from "react";
import { gsap } from "gsap";

import PanelWithLabel from "../types/panel";
import {flatten} from "./utils";



const usePanelAnimation = (panelsWithLabels: PanelWithLabel[]) => {
    const allRefs = flatten(panelsWithLabels);

    useEffect(() => {
        panelsWithLabels.forEach(({panel, label}) => {
            gsap.to(label.current, {
                scrollTrigger: {
                  trigger: panel.current,
                  start: "top 90%",
                  end: "bottom bottom",
                  scrub: 0.5,
                },
                transform: "translateY(calc(-100vh + 100px))"
            })
        
            gsap.to(panel.current, {
                scrollTrigger: {
                  trigger: panel.current,
                  start: "top bottom",
                  end: "bottom bottom",
                  snap: {snapTo: 1, delay: 0.0, duration: {min: 0.05, max: 2}}
                }
            })
        })
    }, allRefs)
}

export default usePanelAnimation;