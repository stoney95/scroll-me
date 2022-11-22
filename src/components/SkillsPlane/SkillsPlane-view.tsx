import {FC, RefObject, useEffect, useLayoutEffect, useRef, useState} from "react";

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


const generateRow = (row: TableRowWithRef, numColumns: number, numRows: number, containerAnimation: GSAPTween | undefined) => {

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
                            return <SkillView name={element} column={row.columnRange} containerAnimation={containerAnimation}/>
                        })}
                    </div>
                })
            }
            <div className="y-axis-label">
                {numRows - row.rowNumber}
            </div>
        </div>
    </> 
}



const SkillsPlaneView: FC<ISkillPlaneView> = ({skills, areas, levels, panelRef}) => {

    const gridStyle = {
        display: "grid",
        gridGap: "10px",
    }

    const planeRef = useRef<HTMLDivElement>(null);
    const planeContainerRef = useRef<HTMLDivElement>(null);
    const [containerAnimation, setContainerAnimation] = useState<GSAPTween>();

    useEffect(() => {
        if (planeRef.current === null) return
        if (planeContainerRef.current === null) return
        if (panelRef.current === null) return

        const panelTop = panelRef.current.getBoundingClientRect().top;
        const planeTop = planeRef.current.getBoundingClientRect().top - panelTop;
        
        const completeWidth = planeRef.current.offsetWidth;
        const planeContainerWidth = planeContainerRef.current.getBoundingClientRect().width;
        const widthToScroll = completeWidth - planeContainerWidth;
        const percentToScroll = widthToScroll / completeWidth * 100;


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
                markers: true
            }
        });

        setContainerAnimation(animation);
    }, [])

    const levelDescription = levels.map((level, index) => {
        return `${index + 1}=${level}`
    }).join(", ")

    return (<div className="skill-container">
        <div className="level-description">{levelDescription}</div>
        <div ref={planeContainerRef} className="plane-container">
            <div ref={planeRef} className="plane-container-scroll">
                <div className="plane" style={gridStyle}>
                    {skills.rows.map(row => generateRow(row, areas.length, levels.length, containerAnimation))}
                </div>
                <div className="x-axis-labels">
                    {areas.map(area => {
                        return <div className="x-axis-label">
                            <span>{area}</span>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>)
}

export default SkillsPlaneView;