import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";


export const animateApperiance = (refs: RefObject<HTMLDivElement>[], panelRef: RefObject<HTMLDivElement>) => {
    const tl = gsap.timeline();
    

    refs.forEach((ref) => {
        tl.fromTo(ref.current,
            {opacity: 0, scale: 1},
            {opacity: 1, scale: 1} )   
        // ).to(ref.current, 
        //     // {scale: 1.2}, 
        //     {scale: 1}
        // )
    })

    new ScrollTrigger({
        animation: tl,
        trigger: panelRef.current,
        start: "top 50%",
        end: "top 5%",
        scrub: 0.5,
    })
}