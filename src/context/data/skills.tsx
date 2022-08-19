import React, { createContext } from "react";
import { Skill, Area, Level } from "../../components/SkillsPlane/types"

const skills = [
  {
    areas: [Area.DATA_ENGINEERING, Area.MACHINE_LEARNING, Area.MLOPS, Area.DATA_VISUALIZATION],
    name: "python",
    level: Level.STILL_LEARNING
  },
  {
    areas: [Area.DATA_ENGINEERING, Area.MACHINE_LEARNING, Area.MLOPS, Area.DATA_VISUALIZATION],
    name: "pytest",
    level: Level.USED_EVERYDAY
  },
  {
    areas: [Area.DATA_ENGINEERING, Area.MACHINE_LEARNING],
    name: "pandas",
    level: Level.USED_EVERYDAY
  },
  {
    areas: [Area.DATA_ENGINEERING],
    name: "pyspark",
    level: Level.USED_FREQUENTLY
  },
  {
    areas: [Area.DATA_ENGINEERING],
    name: "PostgreSQL",
    level: Level.USED_FREQUENTLY
  },
  {
    areas: [Area.DATA_ENGINEERING, Area.MACHINE_LEARNING],
    name: "NumPy",
    level: Level.USED_FREQUENTLY
  },
  {
    areas: [Area.DATA_ENGINEERING],
    name: "Databricks",
    level: Level.INTERACTED_WITH
  },
  {
    areas: [Area.DATA_ENGINEERING],
    name: "kafka",
    level: Level.INTERACTED_WITH
  },
  {
    areas: [Area.DATA_ENGINEERING],
    name: "hiveQL",
    level: Level.INTERACTED_WITH
  },
  {
    areas: [Area.DATA_ENGINEERING],
    name: "HDFS",
    level: Level.INTERACTED_WITH
  },
  {
    areas: [Area.MACHINE_LEARNING],
    name: "sklearn",
    level: Level.USED_EVERYDAY
  },
  {
    areas: [Area.MACHINE_LEARNING, Area.MLOPS],
    name: "Docker",
    level: Level.USED_FREQUENTLY
  },
  {
    areas: [Area.MACHINE_LEARNING],
    name: "keras",
    level: Level.USED_FREQUENTLY
  },
  {
    areas: [Area.MACHINE_LEARNING],
    name: "SpaCy",
    level: Level.USED_FREQUENTLY
  },
  {
    areas: [Area.MACHINE_LEARNING],
    name: "C#",
    level: Level.USED_ONCE
  },
  {
    areas: [Area.MACHINE_LEARNING],
    name: "pyTorch",
    level: Level.USED_ONCE
  },
  {
    areas: [Area.MACHINE_LEARNING],
    name: "Huggingface",
    level: Level.USED_ONCE
  },
  {
    areas: [Area.MLOPS],
    name: "AzureML",
    level: Level.USED_EVERYDAY
  },
  {
    areas: [Area.MLOPS],
    name: "MLFlow",
    level: Level.INTERACTED_WITH
  },
  {
    areas: [Area.MLOPS],
    name: "Airflow",
    level: Level.INTERACTED_WITH
  },
  {
    areas: [Area.MLOPS],
    name: "Apache Beam",
    level: Level.INTERACTED_WITH
  },
  {
    areas: [Area.DATA_VISUALIZATION],
    name: "plotly",
    level: Level.USED_EVERYDAY
  },
  {
    areas: [Area.DATA_VISUALIZATION],
    name: "React",
    level: Level.USED_FREQUENTLY
  },
  {
    areas: [Area.DATA_VISUALIZATION],
    name: "Typescript",
    level: Level.USED_FREQUENTLY
  },
  {
    areas: [Area.DATA_VISUALIZATION],
    name: "MapboxGL",
    level: Level.USED_ONCE
  },
  {
    areas: [Area.MLOPS],
    name: "Github Actions",
    level: Level.USED_ONCE
  },
  {
    areas: [Area.MLOPS],
    name: "Gitlab CI",
    level: Level.USED_FREQUENTLY
  },
]




export const SkillContext = createContext<Array<Skill>>(skills)

export const SkillListProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    return <SkillContext.Provider value={skills}>{children}</SkillContext.Provider>
}