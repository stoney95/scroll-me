import { FC, forwardRef, Ref } from "react";

import "./Label.scss";

interface LabelProps {
    text: string;
}

const Label = forwardRef<HTMLDivElement, LabelProps>(({text}, ref) => {
    return <div ref={ref} className="label">{text}</div>
})

export default Label;