export enum Area {
    DATA_ENGINEERING = "Data Engineering",
    MACHINE_LEARNING = "Machine Learning",
    MLOPS = "MLOps",
    DATA_VISUALIZATION = "Data Visualization",
}

export enum Level {
    INTERACTED_WITH = "Interacted with",
    USED_ONCE = "Used once",
    USED_FREQUENTLY = "Used frequently",
    USED_EVERYDAY = "Used everyday",
    STILL_LEARNING = "Still learning",
}

export type Skill = {
    areas: Array<Area>;
    level: Level;
    name: string;
}

export type TransformedSkill = {
    position: {
        row: number;
        col: {
            start: number;
            end: number;
        }
    };
    name: string;
}

export type InnerTableRow = {
    columnRange: {
        start: number;
        end: number;
    };
    row: number;
    elements: Array<string>;
}

export type TableRow = {
    innerRows: Array<InnerTableRow>;
    rowNumber: number;
}

export type TableData = {
    rows: Array<TableRow>;
}