import { RefObject } from "react";

export type ContactInfo = {
    text: string;
    img: string;
    link: string;
}

export interface ContactWithRef extends ContactInfo {
    refs: ContactRefs
}

export interface ContactRefs {
    container: RefObject<HTMLDivElement>;
    element: RefObject<HTMLDivElement>;
    text: RefObject<HTMLDivElement>;
}

export interface RefsWithTimelines {
    ref: RefObject<HTMLDivElement>;
    timeline: GSAPTimeline;
}