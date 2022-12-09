import { RefObject } from "react";
import { range } from "../../utils";
import { gsap } from "gsap";

import { offsetToPixel } from "./data-transformations";
import { RefsWithTimelines as RefWithTimeline } from "./types";

const TEXT_ACTIVE = {rotateX: "0deg", opacity: 1}
const TEXT_TO_INACTIVE = {duration: 0.2, rotateX: "20deg", opacity: 0}
const TEXT_FROM_INACTIVE = {duration: 0.2, rotateX: "-20deg", opacity: 0}

export function toOrbitMode(
    refsWithTimelines: {ref: RefObject<HTMLDivElement>, timeline: GSAPTimeline}[], 
    hoverTextRef: RefObject<HTMLDivElement>, 
    clickTextRef: RefObject<HTMLDivElement>
) {
    resumeOrbitAnimation(refsWithTimelines);
    animateText({from: clickTextRef, to: hoverTextRef})
}

export function toPauseMode(
    refsWithTimelines: RefWithTimeline[], 
    hoverTextRef: RefObject<HTMLDivElement>, 
    clickTextRef: RefObject<HTMLDivElement>   
) {
    pauseOrbitAnimation(refsWithTimelines);
    animateText({from: hoverTextRef, to: clickTextRef})
}

export function resumeOrbitAnimation(refsWithTimelines: RefWithTimeline[]) {
    refsWithTimelines.forEach(({timeline}) => timeline.resume())
}

export function pauseOrbitAnimation(refsWithTimelines: RefWithTimeline[]) {
    refsWithTimelines.forEach(({timeline}) => timeline.pause())
}

export function animateText(params: {
    from: RefObject<HTMLDivElement>, 
    to: RefObject<HTMLDivElement>
}) {
    const {from, to} = params
    finishActiveAnimations(from)
    finishActiveAnimations(to)

    hideElement(from)
    hideElement(to)

    const tl = gsap.timeline();
    tl.fromTo(from.current, TEXT_ACTIVE, TEXT_TO_INACTIVE)
    tl.fromTo(to.current, TEXT_FROM_INACTIVE, TEXT_ACTIVE)
}

function finishActiveAnimations(ref: RefObject<HTMLDivElement>) {
    const activeAnimations = gsap.getTweensOf(ref.current, true);
    activeAnimations.map(tween => tween.progress(1).kill())
}

function hideElement(ref: RefObject<HTMLDivElement>) {
    gsap.set(ref.current, {opacity: 0})
}

function getOffsetFromCenter(angle: number, radius: number) {
    const angleAsRadian = angle * Math.PI / 180
    const x = radius * Math.cos(angleAsRadian)
    const y = radius * Math.sin(angleAsRadian)

    return {x, y}
}

function changeContainerOrientation(obj: HTMLDivElement, tl: GSAPTimeline, angle: number, angleStep: number, radius: number, xOffset: number, flexDirection: string) {
    const offset = getOffsetFromCenter(angle - angleStep, radius);
    const offsetInPixel = offsetToPixel(offset)

    tl.to(obj, {
      translateX: `${offsetInPixel.x - xOffset}px`,
      translateY: `${offsetInPixel.y}px`,
      flexDirection: flexDirection,
      duration: 0,
      ease: "none"
    })
}

export function createOrbitAnimations(refsWithTimelines: RefWithTimeline[]) {
    const radiusInViewWidth = 20;
    const degrees = range(0, 35).map(x => x * 10)
    const degreePerAnimationStep = degrees[1] - degrees[0];
    const angleBetweenObjects = 360 / refsWithTimelines.length;
    
    refsWithTimelines.forEach(({ref, timeline}, idx) => {
        const obj = ref.current;
        const icon = obj?.getElementsByClassName("contact-icon-border")[0] as HTMLDivElement
        if (obj === null) return;
        if (icon === undefined) return;

        const angleOffset = angleBetweenObjects * idx;
        degrees.forEach(deg => {
            const {xOffsetRight: iconXOffsetRight, xOffsetLeft: iconXOffsetLeft} = calcIconXOffsetsToContainer(obj, icon)
            const angle = (deg + angleOffset) % 360;
            const offset = getOffsetFromCenter(angle, radiusInViewWidth)
            const offsetInPixel = offsetToPixel(offset);
            
            let flexDirection = "row"
            let lastIconXOffset = iconXOffsetLeft
            if (isOnLeftSide(angle)) {
                flexDirection = "row-reverse" 
                lastIconXOffset = iconXOffsetRight
            }
    
            if (isChangingSide(angle)) {
                changeContainerOrientation(obj, timeline, angle, degreePerAnimationStep, radiusInViewWidth, lastIconXOffset, flexDirection);
            }
    
            timeline.to(obj, {
                translateX: `${offsetInPixel.x - lastIconXOffset}px`,
                translateY: `${offsetInPixel.y}px`,
                flexDirection: flexDirection,
                duration: 2,
                ease: "none"
            })
        }) 
    })    
}

function calcIconXOffsetsToContainer(obj: HTMLDivElement, icon: HTMLDivElement) {
    const containerRect = obj.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    const xOffsetLeft = Math.abs(containerRect.left - (iconRect.width / 2) - iconRect.left);
    const xOffsetRight = Math.abs(containerRect.width - xOffsetLeft);

    return {xOffsetRight, xOffsetLeft}
}

function isChangingSide(angle: number) {
    return angle == 90 || angle == 270
}

function isOnLeftSide(angle: number) {
    return 90 <= angle && angle < 270
}