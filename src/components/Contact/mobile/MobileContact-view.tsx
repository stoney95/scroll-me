import { createRef, FC, RefObject, MouseEvent } from "react"

import {ContactWithRef} from "../types";
import gsap from "gsap";

import "./MobileContact.scss"

interface MobileContactViewProps {
    contacts: ContactWithRef[];
    allContactsRef: RefObject<HTMLDivElement>;
    contactsViewportRef: RefObject<HTMLDivElement>;
}


export const MobileContactView: FC<MobileContactViewProps> = ({contacts, allContactsRef, contactsViewportRef}) => {
    return <div className="mobile-contact-site">
        <div ref={allContactsRef} className="mobile-contact-grid">
            {contacts.map((contact, index) => {
                const isLeft = index % 2 == 0;
                return <div 
                ref={contact.refs.container} 
                className="mobile-contact-container" 
                >
                    <div 
                        ref={contact.refs.element}
                        className={`mobile-contact ${isLeft ?"reversed" : null}`}
                        onClick={() => openInNewTab(contact.link)}
                        >
                        <div className="mobile-contact-icon-border">
                            <img src={contact.img} className="mobile-contact-icon"/>
                        </div>
                        <div ref={contact.refs.text} className={`mobile-contact-text ${isLeft? "left" : "right"}`}>
                            {contact.text}
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}

function openInNewTab(url: string) {
    window.open(url, '_blank')?.focus();
}
