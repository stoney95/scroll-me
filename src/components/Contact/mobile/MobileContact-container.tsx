import { createRef, FC, RefObject, useEffect} from "react";
import { addRefsToContacts } from "../data-transformations";
import { ContactInfo, ContactRefs } from "../types";
import { MobileContactView } from "./MobileContact-view";
import gsap from "gsap";



const ContactContainer: FC<{contacts: ContactInfo[]}> = ({contacts}) => {
    const contactsWithRefs = addRefsToContacts(contacts);
    const allContactsRef = createRef<HTMLDivElement>();
    const contactsViewportRef = createRef<HTMLDivElement>();

    useEffect(() => {
        // const transformAnimation = animateAllContactsContainer(allContactsRef, contactsViewportRef);
        animateContacts(contactsWithRefs.map(contact => contact.refs), allContactsRef)
    }, [])

    return <MobileContactView contacts={contactsWithRefs} allContactsRef={allContactsRef} contactsViewportRef={contactsViewportRef}/>
}

export default ContactContainer

const animateContacts = (contactsRefs: ContactRefs[], allContactsRef: RefObject<HTMLDivElement>) => {
    if (allContactsRef.current === null) return;
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: allContactsRef.current,
            start: "top 70%",
            end: "bottom 100%",
            scrub: true,
        }
    })

    contactsRefs.map((refs, index) => {
        if (refs.element.current === null) return;
        if (refs.container.current === null) return;
        if (refs.text.current === null) return;
        
        const isLeft = index % 2 == 0;    
        const rotation = isLeft? 5 : -5;
        const backgroundPosition = getBackgroundPosition(isLeft);
        
        gsap.set(refs.element.current, {transformOrigin: isLeft ? "left" : "right"})
                
        tl.addLabel(`start-${index}`)
        
        tl.fromTo(refs.container.current, {
            scale: 0.8
        }, {
            scale: 1
        }, `start-${index}-=100%`)
        
        tl.fromTo(refs.element.current, {
            boxShadow: "0px 0px 0px 0px rgba(200,200,200,0.8)",
            opacity: 0
        }, {
            boxShadow: "0px 0px 10px 0px rgba(200,200,200,0.8)",
            opacity: 1
        }, `start-${index}-=100%`)

        tl.fromTo(refs.element.current, {
            rotateY: rotation
        }, {
            rotateY: 0
        }, `-=50%`)
        
        tl.fromTo(refs.element.current, {
            backgroundPosition: `${backgroundPosition.start} 50%`,
            backgroundImage: `radial-gradient(circle at center, #23a6d5 0, #23a5d557 0, transparent 0)`
        }, {
            backgroundPosition: `${backgroundPosition.end} 50%`,
            backgroundImage: `radial-gradient(circle at center, #23a5d5b5 0, #23a5d516 25%, transparent 40%)`,
            // backgroundImage: `radial-gradient(circle at center, #23a6d5 0, #23a5d557 25%, transparent 40%)`
        })
    })
}

const getBackgroundPosition = (isLeft: boolean) => {
    const start = isLeft ? "-50%" : "150%"
    const end = isLeft ? "10%" : "90%"
    return {start, end}
}