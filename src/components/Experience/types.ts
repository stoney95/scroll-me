import { RefObject } from "react"

export interface ExperienceProps {
    panelRef: RefObject<HTMLDivElement>;
}

export type ExperienceDate = {
    year: number,
    month: number
}

export type ExperienceData = {
    title: string,
    titleShort?: string,
    description: string,
    scope: string,
    role: string,
    teamSize: number,
    tags?: string[]
}

export type ExperienceByDate = {
    data: ExperienceData,
    date: ExperienceDate
}

export type ExperienceViewData = {
    title: string;
    titleShort?: string;
    labels: string[];
    description: string;
    tags: string[];
}

export type ExperienceViewByDate = {
    data: ExperienceViewData,
    date: ExperienceDate
}

export interface ExperienceViewDataWithRef extends ExperienceViewData{
    circleRef: RefObject<HTMLDivElement>;
    titleRef: RefObject<HTMLDivElement>;
    descriptionRef: RefObject<HTMLDivElement>;
    descriptionContainerRef: RefObject<HTMLDivElement>;
    labelRef: RefObject<HTMLDivElement>;
    descriptionParagraphRef: RefObject<HTMLParagraphElement>;
    viewPercent?: number;
}

export interface YearWithRef {
    year: number;
    ref: RefObject<HTMLDivElement>;
}

export interface ExperienceViewProps {
    years: YearWithRef[],
    months: number[],
    experiences: Map<number, Map<number, ExperienceViewDataWithRef>>,
    mobileView: boolean,
}

export enum Months {
    "JAN"=1,
    "FEB"=2,
    "MAR"=3,
    "APR"=4,
    "MAY"=5,
    "JUN"=6,
    "JUL"=7,
    "AUG"=8,
    "SEP"=9,
    "OCT"=10,
    "NOV"=11,
    "DEC"=12
}