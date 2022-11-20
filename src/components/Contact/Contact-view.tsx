import {FC, RefObject, MouseEvent} from "react";
import {gsap} from "gsap";

import { ContactWithRef } from "./types";

import "./Contact.scss";

interface ContactViewProps {
    contacts: ContactWithRef[];
    hoverTextRef: RefObject<HTMLDivElement>;
    clickTextRef: RefObject<HTMLDivElement>;
    toOrbitMode: () => void;
    toPauseMode: () => void;
}

interface ContactInfoViewProps {
    props: ContactWithRef;
    toOrbitMode: () => void;
    toPauseMode: () => void;
}

const ContactView: FC<ContactViewProps> = ({contacts, hoverTextRef, clickTextRef, toOrbitMode, toPauseMode}) => {
    return <>
        <div ref={hoverTextRef} className="contact-hint">
            <span className="highlighted">Hover</span><br/>an icon
        </div>
        <div ref={clickTextRef} className="contact-hint">
            <span className="highlighted">Click</span><br/>to ...
        </div>
        {contacts.map(contact => ContactInfoView({props: contact, toOrbitMode, toPauseMode}))}
    </>
}

const ContactInfoView: FC<ContactInfoViewProps> = ({props, toOrbitMode, toPauseMode}) => {
    const {ref, link, text, img} = props
    return <div 
        onMouseMove={(ev) => rotateElement(ev, ref)} 
        onMouseLeave={() => {
            rotateElementToZero(ref);
            toOrbitMode();
        }}
        onMouseEnter={(ev) => {
            toPauseMode();
            rotateElement(ev, ref);
        }}
        onClick={() => openInNewTab(link)}
        ref={ref} 
        className="contact-container"
    >
        <div className="contact-icon-border">
            <img src={img} className="contact-icon"/>
        </div>
        <div className="contact-text">
            {text}
        </div>
    </div>
}

function rotateElement(ev: MouseEvent<HTMLDivElement>, ref: RefObject<HTMLDivElement>) {
    const contactContainerObj = ref.current;
    if (contactContainerObj === null) return;

    const MAXIMAL_ROTATION_IN_DEG = 5;
    const {xPercent, yPercent} = calculatePercentalOffsetFromCenter(ev, contactContainerObj)

    //The rotation around the x-axis dependes on how far away the pointer is from the center on the y-axis
    //Positive rotation pushes the top away from the viewer. The mouse above the center gives a negative offset
    const xRotation = -MAXIMAL_ROTATION_IN_DEG * yPercent; 

    //The rotation around the y-axis dependes on how far away the pointer is from the center on the x-axis
    const yRotation = MAXIMAL_ROTATION_IN_DEG * xPercent;

    const totalXPercent = 50 - xPercent * 100;
    const totalYPercent = 50 - yPercent * 100;
    
    gsap.to(contactContainerObj, {
      rotateX: `${xRotation}deg`,
      rotateY: `${yRotation}deg`,
      backgroundPosition: `${totalXPercent}% ${totalYPercent}%`,
      backgroundImage: "radial-gradient(circle at center, #23a6d5 0, #23a5d557 25%, transparent 40%)",
      cursor: "pointer",
    //   backgroundImage: "radial-gradient(circle at center, #ee7652bd 0, #ee765257 25%, transparent 40%)",
    //   color: "white"
    })
}

function calculatePercentalOffsetFromCenter(ev: MouseEvent<HTMLDivElement>, obj: HTMLDivElement) {
    const boundingBox = obj.getBoundingClientRect();
    const [left, top, width, heigth] = [boundingBox.left, boundingBox.top, boundingBox.width, boundingBox.height]

    const xOffsetToCenter = ev.clientX - (left + width / 2)
    const yOffsetToCenter = ev.clientY - (top + heigth / 2)

    const xPercent = xOffsetToCenter / (width)
    const yPercent = yOffsetToCenter / (heigth)

    return {xPercent, yPercent}
}

function rotateElementToZero(ref: RefObject<HTMLDivElement>) {
    const contactContainerObj = ref.current;
    if (contactContainerObj === null) return;

    gsap.to(contactContainerObj, {
      rotateY: `0deg`,
      rotateX: `0deg`,
      backgroundImage: "radial-gradient(circle at center, transparent 0, transparent 15%, transparent 30%)",
    //   color: "transparent"
    })

    
  }

function openInNewTab(url: string) {
    window.open(url, '_blank')?.focus();
}

export default ContactView;