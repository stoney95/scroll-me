import { RefObject } from "react";

export type Skill = {
    name: string;
    column: {
        start: number;
        end: number;
    },
    containerAnimation: GSAPTween | undefined,
    containerRef: RefObject<HTMLDivElement>
}