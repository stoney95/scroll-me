import {FC, forwardRef, RefObject} from "react";

import "./Scroll.scss";

interface ScrollProps {
    refTriangle: RefObject<HTMLDivElement>;
    refTitle: RefObject<HTMLHeadingElement>;
}

const ScrollView = forwardRef<HTMLDivElement, ScrollProps>(({refTriangle, refTitle}, ref) => {
    return <>
        <h1 ref={refTitle} className="title">
                Hi, I'm <span className="highlighted">Simon</span>
        </h1>
        <p className="title-description">
            to navigate this page you only need to <span className="title-scroll">scroll</span>
        </p>
        <div ref={ref} className="scroll-container">
            <div ref={refTriangle} className="scroll-triangle"/>
        </div>
    </>
})

export default ScrollView;