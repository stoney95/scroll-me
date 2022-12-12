import {FC, createRef, useContext, RefObject, useEffect} from 'react';
import {gsap} from "gsap";

import {ContactContext} from "../../context/data/contact"
import {default as ContactView} from "./Contact-view";
import { addRefsToContacts, matchRefsToTimelines } from './data-transformations';
import { createOrbitAnimations, toOrbitMode, toPauseMode } from './animations';
import { default as MobileContactView } from './mobile';


const ContactContainer: FC = () => {
    const contacts = useContext(ContactContext);
    const contactsWithRefs = addRefsToContacts(contacts);
    const refsWithTimelines = matchRefsToTimelines(contactsWithRefs);

    const hoverTextRef = createRef<HTMLDivElement>();
    const clickTextRef = createRef<HTMLDivElement>();

    useEffect(() => {
        gsap.set(clickTextRef.current, {opacity: 0});
        createOrbitAnimations(refsWithTimelines)
    })

    // if ( window.innerWidth < 600 ) {
    //     return <MobileContactView contacts={contactsWithRefs} />
    // }
    
    return <MobileContactView contacts={contactsWithRefs} />
}

export default ContactContainer;