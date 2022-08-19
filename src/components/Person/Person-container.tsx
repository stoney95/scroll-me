import {FC, RefObject, useRef} from 'react';
import useAnimation from '../../hooks/useAnimation';
import { gsap } from 'gsap';

import {default as PersonView} from "./Person-view";

interface PersonProps {
    panelRef: RefObject<HTMLDivElement>;
}

const PersonContainer: FC<PersonProps> = ({panelRef}) => {
    const image = useRef<HTMLDivElement>(null);
    const title = useRef<HTMLDivElement>(null);
    const text = useRef<HTMLDivElement>(null);

    const animateTitle = (title: HTMLDivElement) => {
        gsap.fromTo(title, 
            {
                opacity: 0
            },
            {
                scrollTrigger: {
                trigger: panelRef.current,
                start: "top 20%",
                end: "top top",
                pin: title,
                scrub: 0.5,
                },
                opacity: 1
            }
        )
    }
    
    const animateImage = (imageObj: HTMLDivElement) => {
        const imageHeight = imageObj.getBoundingClientRect().height;
    
        gsap.fromTo(imageObj, 
            {bottom: `-${imageHeight}px`},
            {
                scrollTrigger: {
                    trigger: panelRef.current,
                    start: "top top",
                    endTrigger: imageObj,
                    end: "top 40%",
                    scrub: true,
                    pin: panelRef.current,
                    pinSpacing: true,
                    snap: 1
                },
                bottom: "20vh"
            }  
        )
    }
    
    const animateText = (textObj: HTMLDivElement) => {
        const textHeight = textObj.getBoundingClientRect().height;

        gsap.fromTo(textObj,
            {bottom: `-${textHeight}px`},
            {
                scrollTrigger: {
                    trigger: image.current,
                    start: "top 70%",
                    end: "top 50%",
                    scrub: 0.5
                },
                top: "50vh"
            }  
        )
    }

    useAnimation(title, animateTitle);
    useAnimation(image, animateImage);
    useAnimation(text, animateText);

    return (<PersonView imageRef={image} textRef={text} titleRef={title}/>)
}

export default PersonContainer;