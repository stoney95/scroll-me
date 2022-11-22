export type Skill = {
    name: string;
    column: {
        start: number;
        end: number;
    },
    containerAnimation: GSAPTween | undefined
}