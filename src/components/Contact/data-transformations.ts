import { createRef } from 'react';
import { ContactInfo, ContactWithRef } from './types';
import { gsap } from "gsap";


export function addRefsToContacts(contacts: ContactInfo[]) {
    return contacts.map(contact => {
        return {
            ...contact,
            ref: createRef<HTMLDivElement>()
        }
    })
}

export function matchRefsToTimelines(contactsWithRefs: ContactWithRef[]) {
    return contactsWithRefs.map(contactWithRef => {
        return {
            ref: contactWithRef.ref,
            timeline: gsap.timeline({repeat: -1})
        }
    })
}

export function offsetToPixel(offset: {x:number, y:number}) {
    return {
      x: convertRemToPixels(offset.x),
      y: convertRemToPixels(offset.y)
    }
}

export function convertRemToPixels(rem: number) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}