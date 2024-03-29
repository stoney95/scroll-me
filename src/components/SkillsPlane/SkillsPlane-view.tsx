import {createRef, FC, RefObject, useEffect, useLayoutEffect, useRef, useState} from "react";

import "./SkillsPlane.scss";
import SkillView from "./Skill"
import {TableData, TableRowWithRef, Area, Level} from "./types"
import { gsap } from "gsap";
import useAnimation from "../../hooks/useAnimation";

interface ISkillPlaneView {
    skills: TableData;
    areas: Array<Area>;
    levels: Array<Level>;
    panelRef: RefObject<HTMLDivElement>
}


const generateRow = (row: TableRowWithRef, numColumns: number, numRows: number, containerAnimation: GSAPTween | undefined, containerRef: RefObject<HTMLDivElement>) => {
    return <>
        <div ref={row.ref} className="inner-row top-to-bottom" style={{gridTemplateColumns: `repeat(${numColumns}, 1fr)`}}>
            {
                row.innerRows.map(row => {
                    return <div 
                    className="skill-area" 
                    style={{
                        gridColumn: `${row.columnRange.start} / ${row.columnRange.end}`, 
                        gridRow: row.row
                    }}>
                        {row.elements.map(element => {
                            return <SkillView name={element} column={row.columnRange} containerAnimation={containerAnimation} containerRef={containerRef}/>
                        })}
                    </div>
                })
            }
        </div>
    </> 
}

const YAxisLabel: FC<{container: RefObject<HTMLDivElement>, row: TableRowWithRef, numRows: number}> = ({container, row, numRows}) => {
    const labelRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (row.ref.current === null) return;
        if (labelRef.current === null) return;
        if (container.current === null) return;

        const rowBoundingRect = row.ref.current.getBoundingClientRect();
        const containerBoundingRect = container.current.getBoundingClientRect();

        gsap.set(labelRef.current, {
            position: "absolute",
            top: rowBoundingRect.top - containerBoundingRect.top + rowBoundingRect.height / 2,
            left: rowBoundingRect.left - 10,
            translateX: "-100%",
            translateY: "-50%",
            fontSize: "14px",
        })
    }, [row.ref])


    return <div ref={labelRef}>
        {numRows - row.rowNumber}
    </div>
}

const SkillsPlaneView: FC<ISkillPlaneView> = ({skills, areas, levels, panelRef}) => {

    const gridStyle = {
        display: "grid",
        gridGap: "10px",
    }

    const containerRef = useRef<HTMLDivElement>(null);
    const planeRef = useRef<HTMLDivElement>(null);
    const planeContainerRef = useRef<HTMLDivElement>(null);
    const xAxisLabelContainerRef = useRef<HTMLDivElement>(null);
    const [containerAnimation, setContainerAnimation] = useState<GSAPTween>();

    useEffect(() => {
        if (window.innerWidth > 600) return;

        if (planeRef.current === null) return
        if (planeContainerRef.current === null) return
        if (xAxisLabelContainerRef.current === null) return
        if (panelRef.current === null) return

        const panelTop = panelRef.current.getBoundingClientRect().top;
        const planeTop = planeRef.current.getBoundingClientRect().top - panelTop;

        const completeWidth = planeRef.current.offsetWidth;
        const planeContainerWidth = planeContainerRef.current.getBoundingClientRect().width;
        const widthToScroll = completeWidth - planeContainerWidth;
        const percentToScroll = widthToScroll / completeWidth * 100;

        gsap.to(xAxisLabelContainerRef.current, {
            xPercent: -percentToScroll,
            ease: "none",
            scrollTrigger: {
                trigger: planeRef.current,
                start: `top ${planeTop}px`,
                end: "+=" + widthToScroll + "px",
                scrub: true,
                pin: panelRef.current,
                pinSpacing: true,
                snap: 1/3,
            }
        });

        const animation = gsap.to(planeRef.current, {
            xPercent: -percentToScroll,
            ease: "none",
            scrollTrigger: {
                trigger: planeRef.current,
                start: `top ${planeTop}px`,
                end: "+=" + widthToScroll + "px",
                scrub: true,
                pin: panelRef.current,
                pinSpacing: true,
                snap: 1/3,
            }
        });

        setContainerAnimation(animation);
    }, [])

    const levelDescription = levels.map((level, index) => {
        return `${index + 1}=${level}`
    }).join(", ")

    return (<div ref={containerRef} className="skill-container">
        <div className="plot-container">
            <div className="level-description">{levelDescription}</div>
            <div ref={planeContainerRef} className="plane-container">
                <div  className="plane-container-border">
                    <div ref={planeRef} className="plane-container-scroll plane" style={gridStyle}>
                        {skills.rows.map(row => generateRow(row, areas.length, levels.length, containerAnimation, planeContainerRef))}
                    </div>
                </div>
                    <div ref={xAxisLabelContainerRef} className="x-axis-labels plane-container-scroll">
                        {areas.map(area => {
                            return <div className="x-axis-label">
                                <span className="x-axis-label-text">{area}</span>
                            </div>
                        })}
                    </div>
            </div>
        </div>
        {skills.rows.map(row => <YAxisLabel container={containerRef} row={row} numRows={skills.rows.length}/>)}
    </div>)
}

export default SkillsPlaneView;