import {FC, RefObject, useEffect} from "react";

import "./SkillsPlane.scss";
import SkillView from "./Skill"
import {TableData, TableRowWithRef, Area, Level} from "./types"

interface ISkillPlaneView {
    skills: TableData;
    areas: Array<Area>;
    levels: Array<Level>;
}


const generateRow = (row: TableRowWithRef, numColumns: number, numRows: number) => {
    return <div ref={row.ref} className="inner-row top-to-bottom" style={{gridTemplateColumns: `repeat(${numColumns}, 1fr)`}}>
        {
            row.innerRows.map(row => {
                return <div 
                className="skill-area" 
                style={{
                    gridColumn: `${row.columnRange.start} / ${row.columnRange.end}`, 
                    gridRow: row.row
                }}>
                    {row.elements.map(element => {
                        return <SkillView name={element} column={row.columnRange}/>
                    })}
                </div>
            })
        }
        <div className="y-axis-lable">
            {numRows - row.rowNumber}
        </div>
    </div>
}



const SkillsPlaneView: FC<ISkillPlaneView> = ({skills, areas, levels}) => {

    const gridStyle = {
        display: "grid",
        gridGap: "10px",
    }

    const levelDescription = levels.map((level, index) => {
        return `${index + 1}=${level}`
    }).join(", ")

    return (<div className="skill-container">
        <div className="level-description">{levelDescription}</div>
        <div className="plane" style={gridStyle}>
            {skills.rows.map(row => generateRow(row, areas.length, levels.length))}
        </div>
        <div className="x-axis-labels">
            {areas.map(area => {
                return <div className="x-axis-label">
                    <span>{area}</span>
                </div>
            })}
        </div>
    </div>)
}

export default SkillsPlaneView;