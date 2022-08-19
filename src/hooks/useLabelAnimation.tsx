import PanelWithLabel from "../types/panel";
import { gsap } from "gsap";
import { useEffect } from "react";
import { flatten } from "./utils";


const useLabelAnimation = (panelsWithLabels: PanelWithLabel[]) => {
    const allRefs = flatten(panelsWithLabels);

    useEffect(() => {
        panelsWithLabels.forEach(({panel, label}) => {
            gsap.fromTo(label.current,
                {backgroundPositionX: "100%"},
                {
                    scrollTrigger: {
                        trigger: panel.current,
                        start: "top 5%",
                        end: "top top",
                        scrub: true,
                    },
                    backgroundPositionX: "50%"
                }
            )
        
            gsap.to(label.current,
                {
                    scrollTrigger: {
                        trigger: panel.current,
                        start: "bottom center",
                        end: "bottom top",
                        scrub: true,
                    },
                    backgroundPositionX: "0%"
                }
            )
        })
    }, allRefs);
    
}

export default useLabelAnimation;