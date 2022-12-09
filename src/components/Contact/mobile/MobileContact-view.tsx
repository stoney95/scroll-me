import { createRef, FC, RefObject, MouseEvent } from "react"

import {ContactWithRef} from "../types";
import gsap from "gsap";

import "./MobileContact.scss"

interface MobileContactViewProps {
    contacts: ContactWithRef[]
}




export const MobileContactView: FC<MobileContactViewProps> = ({contacts}) => {
    const elementRefs = contacts.map(createRef<HTMLDivElement>)

    return <div className="mobile-contact-site" onClick={() => clearAll(elementRefs)}>
        <div className="mobile-contact-grid">
            {contacts.map((contact, index) => {
                const ref = elementRefs[index];
                const isLeft = index % 2 == 0;
                return <div 
                    ref={contact.ref} 
                    className="mobile-contact-container" 
                    style={{
                        gridColumn: index % 2 + 1,
                        gridRow: Math.floor(index / 2) + 1
                    }}
                >
                    <div 
                        ref={ref}
                        className="mobile-contact-inactive" 
                        onClick={(event) => onClickLabel(event, contact.ref, elementRefs, index)}
                    >
                        <div className="mobile-contact-icon-border">
                            <img src={contact.img} className="mobile-contact-icon"/>
                        </div>
                        <div className={`mobile-contact-text ${isLeft? "left" : "right"}`}>
                            {contact.text}
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}

const onClickLabel = (event: MouseEvent, containerRef: RefObject<HTMLDivElement>, elementRefs: RefObject<HTMLDivElement>[], index: number) => {
    const elementRef = elementRefs[index];
    if (containerRef.current === null) return;
    if (elementRef.current === null) return;

    const isLeft = index % 2 == 0;
    const oppositeElementRef = getOppositeElement(elementRefs, index);
    const textElement = getTextElement(elementRef.current)

    if (elementRef.current.className.startsWith("mobile-contact-active")) {
        deactivateElement(containerRef.current, elementRef.current, oppositeElementRef.current, isLeft)
        return;
    }
    

    const {top, left, right} = elementRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    
    let className = "mobile-contact-active"
    if (!isLeft) className += " reversed"
    elementRef.current.className = className


    const rightOffset = windowWidth - right
    const sideOffset = isLeft ? left : rightOffset;
    const labelWidth = windowWidth - 2 * sideOffset;

    const rotation = isLeft? -8 : 5;
    const backgroundPosition = getBackgroundPosition(isLeft);

    const tl = gsap.timeline();

    tl.to(oppositeElementRef.current, {
        opacity: 0,
        duration: 0.3
    }).addLabel("opposite-element-removed")

    tl.to(elementRef.current, {
        rotateY: rotation,
        boxShadow: "0px 0px 10px 0px rgba(200, 200, 200, 0.8)"
    })

    tl.fromTo(elementRef.current, {
            backgroundPosition: `${backgroundPosition.start} 50%`
        }, {
            backgroundPosition: `${backgroundPosition.end} 50%`,
            duration: 0.3
        },
        "opposite-element-removed"
    )

    tl.fromTo(textElement, {
            opacity: 0
        }, {
            opacity: 1, duration: 0.3
        }, 
        "opposite-element-removed"
    )


    console.log(event)
    // elementRef.current.style.backgroundPosition = `${backgroundPositionX} 50%`;

    containerRef.current.style.position = "absolute";
    containerRef.current.style.top = `${top}px`;
    containerRef.current.style.width = `${labelWidth}px`;
    if (isLeft) containerRef.current.style.left = `${sideOffset}px`;
    if (!isLeft) containerRef.current.style.right = `${sideOffset}px`;
}

function clearAll(elementRefs: RefObject<HTMLDivElement>[]): void {
    let activeElementRefs = elementRefs
        .map((elementRef, index) => {return {ref: elementRef, index: index}})
        .filter((element) => element.ref.current?.className.startsWith("mobile-contact-active"));

    activeElementRefs.map((element) => {
        const isLeft = element.index % 2 == 0;
        const oppositeElementRef = getOppositeElement(elementRefs, element.index);
        // deactivateElement(element.ref, oppositeElementRef, isLeft);
        
    })
}

const deactivateElement = (container: HTMLDivElement, element: HTMLDivElement, oppositeElement: HTMLDivElement | null, isLeft: boolean) => { 
    const backgroundPosition = getBackgroundPosition(isLeft);

    const textElement = getTextElement(element)
    console.log(textElement)
    
    const tl = gsap.timeline();
    tl.addLabel("start", 0)

    tl.to(element, {
        backgroundPositionX: backgroundPosition.start,
        rotateY: 0,
        boxShadow: "0px 0px 0px 0px rgba(200, 200, 200, 0.8)"
    })

    tl.to(textElement, {
        opacity: 0
    }, "start")
    
    tl.to(oppositeElement, {
        opacity: 1, duration: 0.3
    })

    tl.set(container, {
        position: "unset", width: "unset"
    })
    
    tl.set(element, {className: "mobile-contact-inactive"})
}


const getBackgroundPosition = (isLeft: boolean) => {
    const start = isLeft ? "-50%" : "150%"
    const end = isLeft ? "30%" : "70%"
    return {start, end}
}

const getOppositeElement = (elementRefs: RefObject<HTMLDivElement>[], index: number) => {
    const isLeft = index % 2 == 0;
    const oppositeIndex = isLeft ? index + 1 : index -1;

    return elementRefs[oppositeIndex];
}

const getTextElement = (element: HTMLDivElement) => {
    return element.querySelector(".mobile-contact-text")
}