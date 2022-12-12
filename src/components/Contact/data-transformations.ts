import { createRef } from 'react';
import { ContactInfo, ContactWithRef } from './types';
import { gsap } from "gsap";


export function addRefsToContacts(contacts: ContactInfo[]) {
    return contacts.map(contact => {
        return {
            ...contact,
            refs: {
                container: createRef<HTMLDivElement>(),
                element: createRef<HTMLDivElement>(),
                text: createRef<HTMLDivElement>()
            }
        }
    })
}

export function matchRefsToTimelines(contactsWithRefs: ContactWithRef[]) {
    return contactsWithRefs.map(contactWithRef => {
        return {
            ref: contactWithRef.refs.container,
            timeline: gsap.timeline({repeat: -1})
        }
    })
}

export function offsetToPixel(offset: {x:number, y:number}) {
    return {
      x: convertViewMaxToPixels(offset.x),
      y: convertViewMaxToPixels(offset.y)
    }
}

export function convertViewMaxToPixels(viewWidth: number) {    
    const windowMax = Math.max(window.innerWidth, window.innerHeight);
    return (viewWidth / 100) * windowMax
}