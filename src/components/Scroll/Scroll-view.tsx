import {FC, forwardRef, RefObject} from "react";

import "./Scroll.scss";

interface ScrollProps {
    refTriangle: RefObject<HTMLDivElement>;
}

const ScrollView = forwardRef<HTMLDivElement, ScrollProps>(({refTriangle}, ref) => {
    return <div ref={ref} className="scroll-container">
        <div className="scroll-text">Scroll</div>
        <div ref={refTriangle} className="scroll-triangle"/>
    </div>
})

export default ScrollView;