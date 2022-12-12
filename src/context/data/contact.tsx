import { createContext } from "react";

import {ContactInfo} from "../../components/Contact/types";

const contactInfos = [
    {
        text: "connect",
        img: "linkedin.svg",
        link: "https://www.linkedin.com/in/simon-s-a1b033191/"
    },
    {
        text: "write me",
        img: "mail.svg",
        link: "mailto:simon@steinheber.info"
    },
    {
        text: "see my github",
        img: "github.svg",
        link: "https://github.com/stoney95"
    },
    {
        text: "download my CV",
        img: "download.svg",
        link: "resume-v3.pdf"
    },
    {
        text: "give feedback",
        img: "feedback.svg",
        link: "https://github.com/stoney95/scroll-me/issues"
    },
    {
        text: "visit my hometown",
        img: "location.svg",
        link: "https://goo.gl/maps/Z6yTa4vnMAQMNWos6"
    },
]

export const ContactContext = createContext<Array<ContactInfo>>(contactInfos)

export const ContactInfosProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    return <ContactContext.Provider value={contactInfos}>{children}</ContactContext.Provider>
}