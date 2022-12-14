import { IconProp } from "@fortawesome/fontawesome-svg-core";


export interface HeroContentType {
    greeting: string,
    jobTitle: string,
    projectsLink: string,
    introParagraph: string,
    resumeDownloadButton: string,
    interestsIntroText: string,
    interests: { name: string, iconName: string }[]
}