import { FC, forwardRef, RefObject } from "react";
import {gsap} from "gsap";

import "./Label.scss";

interface LabelProps {
    text: string;
    panel?: RefObject<HTMLDivElement>
}

const Label = forwardRef<HTMLDivElement, LabelProps>(({text, panel}, ref) => {
    const scrollToPanel = () => {
        if (panel === undefined) return
        if (panel.current === null) return

        gsap.to(window, {duration: 1, scrollTo: panel.current})
    }

    return <div onClick={scrollToPanel} ref={ref} className="label">{text}</div>
})

export default Label;