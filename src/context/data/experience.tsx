import React, { createContext } from "react";

import {ExperienceByDate} from "../../components/Experience/types"

const projects = [
    {
        data: {
            title: "EMNLP 2018: Aspect-Based Sentiment Analysis with Deep Neural Networks",
            titleShort: "EMNLP 2018: Aspect-based Sentiment Analysis",
            description: "For my Bachelor thesis, I conducted research on Aspect-Based Sentiment Analysis using Deep Neural Networks. I compared various network architectures and embedding strategies to analyze sentiment in German corpora. I conducted experiments, analyzed results, and established a new state-of-the-art performance. The findings were significant enough to warrant publication, and the resulting paper was accepted and presented at EMNLP 2018 conference as Joint Aspect and Polarity Classification for Aspect-based Sentiment Analysis with End-to-End Neural Networks.",
            tags: ["sentiment analysis", "deep learning", "neural networks", "EMNLP 2018"],
            scope: "nlp research",
            role: "researcher",
            teamSize: 4,
        },
        date: {
            year: 2018,
            month: 6
        }
    },
    {
        data: {
            title: "Comparative Analysis of Time Series Forecasting Methods using New York Taxi Ride Dataset",
            titleShort: "Time Series Forecasting Methods Comparison",
            description: "As part of an internal research project, I conducted a comparative analysis of different time series forecasting methods using the New York taxi ride dataset from Kaggle. I performed experiments and evaluated the results, including exploring complex network architectures that aggregated time-series data at different granularities (monthly, weekly, daily) to incorporate different seasonalities of the data. Performance was measured using metrics such as mean squared error (MSE) and root mean squared error (RMSE). While the deep learning models showed potential in some scenarios, XGBoost remained a competitive benchmark in terms of overall performance.",
            tags: ["comparative analysis", "deep learning"],
            scope: "geo-spatial time-series forecasting",
            role: "researcher",
            teamSize: 5
        },
        date: {
            year: 2018,
            month: 11
        }
    },
    {
        data: {
            title: "NLP Analysis of Call-Center Recordings with Azure Speech-to-Text and SpaCy",
            titleShort: "NLP Analysis of Call-Center Recordings",
            description: "In this project, I utilized Azure Speech-to-Text for transcribing recordings from an Automotive call center. The transcribed results were then analyzed using NLP techniques, including keyword extraction and aspect-based sentiment analysis, using the SpaCy library. The goal was to identify the most important topics discussed in the calls to help the business unit responsible for the call center identify areas where their staff needed additional training. Despite challenges such as the quality of transcribed text, which often lacked completeness and grammatical accuracy, and the absence of labeled data for evaluation, we managed to extract the most important topics. The results of the NLP analysis were visualized for the business unit to gain insights into customer feedback and sentiments.",
            tags: ["SpaCy", "keyword extraction", "sentiment analysis"],
            scope: "speech-to-text, nlp",
            role: "software engineer, nlp engineer",
            teamSize: 3
        },
        date: {
            year: 2019,
            month: 2
        }
    },
    {
        data: {
            title: "Reinforcement Learning for Goods Transportation Optimization in German Railway Network",
            titleShort: "Reinforcement Learning for Goods Transportation Optimization",
            description: "In this project, we developed a demonstration use case to showcase how reinforcement learning (RL) can be applied to optimize goods transportation in the German railway network. My role was to develop the simulation environment and implement a Monte Carlo Tree Search (MCTS) algorithm for planning the actions of the RL agents. The first phase of the project was awarded the Microsoft Germany - AI Award, and the showcase was further developed and demonstrated in the Microsoft Technology Center in Munich. The solution includes a web app that visualizes the progress and actions of the RL agents, with a scalable serverless architecture in the backend that interacts with the simulation environment and plans the next move for each agent.",
            tags: ["mcts", "microsoft germany - ai award", "serverless"],
            scope: "reinforcement learning",
            role: "software engineer, rl developer",
            teamSize: 2,
        },
        date: {
            year: 2019,
            month: 3
        }
    },
    {
        data: {
            title: "Energy Consumption Analysis of Production Plant",
            titleShort: "Energy Consumption Analysis",
            description: "In this project, the goal was to conduct an exploratory analysis of the energy consumption data of multiple production plants, focusing on different mediums such as heat, electricity, and compressed air. As the responsible data analyst, I was responsible for gathering, understanding, aggregating, and visualizing the data. Through thorough analysis, we identified multiple optimization potentials and energy leakages within the plant. The results were communicated to the business stakeholders, and recommendations for further actions were provided.",
            tags: ["energy consumption analysis", "data visualization"],
            scope: "explorative data analysis, data visualization",
            role: "data scientist",
            teamSize: 5
        },
        date: {
            year: 2019,
            month: 10
        }
    },
    {
        data: {
            title: "Migration of historically grown data processing structures for supply chain monitoring into PySpark pipelines",
            titleShort: "PySpark for supply chain monitoring",
            description: "In this project, our goal was to migrate historically grown complex data structures and processes of a business unit from a big car manufacturer into a new cloud architecture. I focused on the KPI calculation for the supply chain monitoring of our customer. I worked on identifying and understanding the business processes and corresponding data, and then structured and visualized the data to reflect the underlying business process. This helped simplify communication with the customer and aided developers from other teams in understanding the data and business process. Additionally, I transformed long-running and unmaintainable database views that calculated the KPIs into PySpark pipelines, which reduced the runtime. Overall, my contributions helped provide better insight into the data for the team, including developers and business people, and reduced the runtime of the KPI calculations.",
            tags: ["cloud architecture", "PySpark", "kpi calculation"],
            scope: "data migration, data Engineering",
            role: "data engineer",
            teamSize: 15
        },
        date: {
            year: 2020,
            month: 3
        }
    },
    {
        data: {
            title: "Integration of AWS Active Custom Translate (ACT) into NLP Platform for Corporate-wide Translations",
            titleShort: "Evaluation of AWS ACT for Corporate-wide Translations",
            description: "As part of an NLP platform project, my goal was to integrate AWS Active Custom Translate (ACT) to enable corporate-wide translations. Before building the feature, I evaluated the quality of ACT by setting up an evaluation environment with a training and inference pipeline. On top of this pipeline, I developed an automatic report generation system that provided high-level and in-depth analysis of the translation quality using BLEU score as a metric. The main challenge I faced was integrating domain-specific abbreviations into the translation process, which required close cooperation with the business unit and human translators to resolve. I also took on a leadership role, leading two colleagues and handing over the project to them for implementation of the feature.",
            tags: ["nlp platform", "AWS Active Custom Translate", "BLEU score"],
            scope: "machine translation",
            role: "nlp engineer, team lead",
            teamSize: 3
        },
        date: {
            year: 2021,
            month: 5
        }
    },
    {
        data: {
            title: "Initiative for Democratizing AI using Azure Machine Learning (AzureML)",
            titleShort: "Initiative for Democratizing AI with AzureML",
            description: "As part of an AI initiative in a big manufacturing company, my colleague and I helped democratize AI throughout the organization using Azure Machine Learning (AzureML). We provided tutorials to educate Data Scientists on the basics of AzureML, which helped the initiative gain traction and implement the first use cases. In a later phase, I contributed an MLOps template to streamline new ML projects. Providing code and model staging with automated stage-transitions and quality gates where required from the beginning of the project helps Data Scientist to focus on delivering business value. Code quality checks and monitoring ensure a smooth and efficient ML project workflow.",
            tags: ["democratizing ai", "AzureML", "mlops"],
            scope: "mlops",
            teamSize: 2,
            role: "tech lead"
        },
        date: {
            year: 2021,
            month: 9
        }
    },
    {
        data: {
            title: "Scalable Timeseries Forecasting Platform for Demand Planning",
            titleShort: "Scalable Timeseries Forecasting Platform",
            description: "As a tech lead in a project to build a scalable timeseries forecasting platform, our goal is to support demand planners in their decision-making process by providing accurate forecasts of future product demand. The main challenge in this project is the large number of time-series per plant, which can be in thousands. We leverage AutoML and automated best model selection to build a solid baseline, and custom forecasting algorithms to further improve forecasting quality. Through a high degree of parallelization, we achieve scalable training processes. Defining clear interfaces enables the platform to be applied to multiple plants at scale. The platform is currently productive in two plants, with plans for a roll-out to additional plants. My responsibilities include laying out the technical agenda, discussing the midterm project roadmap with the customer, defining interfaces with corporate architects, and leading a team of 4 developers to ensure successful implementation.",
            tags: ["scalability", "demand planning", "auto-ml", "parallelization"],
            scope: "time-series forecasting",
            role: "tech lead",
            teamSize: 4
        },
        date: {
            year: 2022,
            month: 2
        }
    },
]


export const ExperienceContext = createContext<Array<ExperienceByDate>>(projects)

export const ExperienceListProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    return <ExperienceContext.Provider value={projects}>{children}</ExperienceContext.Provider>
}