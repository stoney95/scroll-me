import {FC, RefObject, useRef} from 'react';
import useAnimation from '../../hooks/useAnimation';
import { gsap } from 'gsap';

import {default as PersonView} from "./Person-view";

interface PersonProps {
    panelRef: RefObject<HTMLDivElement>;
}

const PersonContainer: FC<PersonProps> = ({panelRef}) => {
    const image = useRef<HTMLDivElement>(null);
    const text = useRef<HTMLDivElement>(null);
    
    const animateText = (textObj: HTMLDivElement) => {
        const textHeight = textObj.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;

        gsap.from(textObj,
            {
                // bottom: `-${textHeight}px`,
                top: windowHeight + textHeight,
                scrollTrigger: {
                    trigger: image.current,
                    start: "top 60%",
                    end: "bottom 80%",
                    scrub: 0.5,
                }
            }  
        )
    }

    useAnimation(text, animateText);

    return (<PersonView imageRef={image} textRef={text}/>)
}

export default PersonContainer;