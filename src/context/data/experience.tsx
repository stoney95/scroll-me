import React, { createContext } from "react";

import {ExperienceByDate} from "../../components/Experience/types"

const projects = [
    {
        data: {
            title: "EMNLP2018: Publish bachelor thesis",
            description: "I am se greatesht!!!. Lorem ipusum",
            scope: "natural language processing",
            teamSize: 4,
            role: "researcher"
        },
        date: {
            year: 2018,
            month: 6
        }
    },
    {
        data: {
            title: "LOGAN: Spark pipelines",
            description: "The projects was shit but I did very well",
            scope: "ETL",
            teamSize: 15,
            role: "developer"
        },
        date: {
            year: 2020,
            month: 3
        }
    },
    {
        data: {
            title: "ai:attack: Democratizing AI throughout Siemesn",
            description: "The project is fun. I learn a lot and contribute even more",
            scope: "MLOps",
            teamSize: 4,
            role: "tech lead"
        },
        date: {
            year: 2021,
            month: 9
        }
    },
    {
        data: {
            title: "CarSharing: Short project",
            description: "I did not know what I was supposed to do there",
            scope: "Timeseries Forecasting",
            teamSize: 9,
            role: "developer"
        },
        date: {
            year: 2019,
            month: 6
        }
    },
    {
        data: {
            title: "Call Analysis",
            description: "BMW loved our results",
            scope: "NLP, Voice Transcription",
            teamSize: 5,
            role: "developer"
        },
        date: {
            year: 2019,
            month: 2
        }
    },
]


export const ExperienceContext = createContext<Array<ExperienceByDate>>(projects)

export const ExperienceListProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    return <ExperienceContext.Provider value={projects}>{children}</ExperienceContext.Provider>
}