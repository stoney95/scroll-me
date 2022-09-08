import { RefObject } from "react";

export type ContactInfo = {
    text: string;
    img: string;
    link: string;
}

export interface ContactWithRef extends ContactInfo {
    ref: RefObject<HTMLDivElement>
}

export interface RefsWithTimelines {
    ref: RefObject<HTMLDivElement>;
    timeline: GSAPTimeline;
}