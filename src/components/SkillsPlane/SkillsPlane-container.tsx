import {createRef, FC, RefObject, useContext, useEffect} from 'react';

import {default as SkillsPlaneView} from "./SkillsPlane-view";
import {Skill, Area, Level, TransformedSkill, TableData, TableRow, InnerTableRow, TableRowWithRef} from "./types"

import { SkillContext } from "../../context/data/skills"
import { animateApperiance } from './animations';

interface SkillsProps {
    panelRef: RefObject<HTMLDivElement>;
}

const SkillsPlaneContainer: FC<SkillsProps> = ({panelRef}) => {
    const skills = useContext(SkillContext);
    const areas = Object.values(Area);
    const levels = Object.values(Level);

    function transformSkill(skill: Skill): TransformedSkill {
        const colIndexes = skill.areas.map(area => areas.indexOf(area)).sort((a, b) => a - b);
        const rowIndex = levels.indexOf(skill.level);

        return {
            position: {
                row: levels.length - (rowIndex + 1), 
                col: {
                    start: colIndexes[0] + 1,
                    end: colIndexes[colIndexes.length - 1] + 2
                }
            },
            name: skill.name
        }
    }

    function sortSkill(a: TransformedSkill, b: TransformedSkill): number {
        const rowDif = a.position.row - b.position.row;
        if ( rowDif !== 0 ) return rowDif;
        
        const startDif = a.position.col.start - b.position.col.start;
        if ( startDif !== 0 ) return startDif;

        const aRange = a.position.col.end - a.position.col.start;
        const bRange = b.position.col.end - b.position.col.start;
        const rangeDif = bRange - aRange;
        if ( rangeDif !== 0 ) return rangeDif;

        return 0
    }

    function groupSkills(skills: Array<TransformedSkill>): TableData {
        const result = {rows: new Array<TableRowWithRef>()}
        var previousSkill: TransformedSkill = skills[0];
        var currentInnerRow = 1;
        var elementInRow = true;
        
        var currentInnerTableRow = {
            columnRange: previousSkill.position.col,
            elements: [previousSkill.name],
            row: currentInnerRow,
        }

        var currentTableRow = {
            innerRows: [currentInnerTableRow],
            rowNumber: previousSkill.position.row,
            ref: createRef<HTMLDivElement>()
        };

        const positionEqual = (skillA: TransformedSkill, skillB: TransformedSkill) => {
            const startEqual = skillA.position.col.start === skillB.position.col.start
            const endEqual = skillA.position.col.end === skillB.position.col.end

            return startEqual && endEqual
        }

        const intersect = (skillA: TransformedSkill, skillB: TransformedSkill) => {
            const aLeftOfB = skillA.position.col.end <= skillB.position.col.start;
            const aRightOfB = skillA.position.col.start >= skillB.position.col.end;

            return ! (aLeftOfB || aRightOfB)
        }

        skills.slice(1).forEach(skill => {
            if (!(skill.position.row === currentTableRow.rowNumber)) {
                result.rows.push(currentTableRow);
                currentTableRow = {innerRows: new Array<InnerTableRow>(), rowNumber: skill.position.row, ref: createRef<HTMLDivElement>()};
                currentInnerRow = 1;
                elementInRow = false;
            }

            if ( elementInRow && positionEqual(skill, previousSkill)) {
                currentInnerTableRow.elements.push(skill.name);
            } else {
                if ( elementInRow && intersect(skill, previousSkill) ) currentInnerRow++;
                var newRowNumber = currentInnerRow;

                currentInnerTableRow = {
                    columnRange: skill.position.col,
                    elements: [skill.name],
                    row: newRowNumber,
                }
                currentTableRow.innerRows.push(currentInnerTableRow);
                elementInRow = true;
            }

            previousSkill = skill;
        })
        result.rows.push(currentTableRow);

        return result
    }

    const transformedSkills = skills.map((skill: Skill) => transformSkill(skill))
    const sortedSkills = transformedSkills.sort(sortSkill)
    const groupedSkills = groupSkills(sortedSkills)
    const refs = groupedSkills.rows.map(row => row.ref);

    useEffect(() => {
        animateApperiance(refs, panelRef);
    })

    return (<SkillsPlaneView skills={groupedSkills} areas={areas} levels={levels} panelRef={panelRef}/>)
}

export default SkillsPlaneContainer;