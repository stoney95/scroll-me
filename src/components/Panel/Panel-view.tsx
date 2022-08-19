import { FC, PropsWithChildren, forwardRef, Ref, RefObject } from "react";

import "./Panel.scss"


interface PanelProps extends PropsWithChildren {
    className: string;
}

const Panel = forwardRef<HTMLDivElement, PanelProps>(({children, className}, ref) => {
    return <div ref={ref} className={`${className} panel`}>
        {children}
    </div>
})

export default Panel;