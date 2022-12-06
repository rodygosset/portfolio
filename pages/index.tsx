

import styles from "@styles/pages/home.module.scss"
import { GetStaticProps, NextPage } from "next"
import Image from 'next/image'
import { HeroContentType } from "types/hero"
import { MouseEventHandler, useContext, useEffect, useState } from "react"
import { GlobalContext } from "utils/context"

import HeroContentEN from '@content/en/heroContent.json'
import HeroContentFR from '@content/fr/heroContent.json'


import NavItemsEN from '@content/en/navItems.json'
import NavItemsFR from '@content/fr/navItems.json'

import ThemeOptionsEN from '@content/en/themes.json'
import ThemeOptionsFR from '@content/fr/themes.json'

import rody from '@content/rody.json'
import { Rody } from "types/rody"
import Nav from "@components/nav"
import { NavItemsType } from "types/nav"
import { ThemeOptionType } from "types/theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload, faCompactDisc, faCode, faHeart } from "@fortawesome/free-solid-svg-icons"
import { faFigma } from "@fortawesome/free-brands-svg-icons"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import Router from "next/router"

interface HeroProps {
    content: {
        [lang: string]: HeroContentType
    },
    navItems: {
        [lang: string]: NavItemsType
    },
    themes: {
        [lang: string]: ThemeOptionType
    },
    rodyData: Rody
}

const HeroSection: NextPage<HeroProps> = ({ content, navItems, themes, rodyData }) => {

    const { appData } = useContext(GlobalContext)

    const [pageContent, setPageContent] = useState<HeroContentType>(appData.lang ? content[appData.lang] : content.en)


    useEffect(() => setPageContent(appData.lang ? content[appData.lang] : content.en), [appData.lang])

    
    const isDarkMode = () => appData.theme == "dark"

    const getClassNames = () => isDarkMode() ? styles.main + ' ' + styles.dark : styles.main


    const handleClick: MouseEventHandler<HTMLDivElement> = e => {
        e.stopPropagation()
        e.preventDefault()
        Router.push('/#projects')
    }


    return (
        <div className={getClassNames()}>
            <Nav 
                navItems={navItems}
                themeOptions={themes} 
                rodyData={rodyData} 
            />
            <main>
                <section className={styles.hero}>
                    <div className={styles.sectionWrapper}>
                        <p>{pageContent.greeting}<span>{rodyData.firstName}</span></p>
                        <h1 dangerouslySetInnerHTML={{__html: pageContent.jobTitle}}></h1>
                        <div className={styles.illustrationContainer}>
                            <Image 
                                quality={100}
                                src={'/images/gradient-background-shape.svg'} 
                                alt={'Gradient Background Shape'} 
                                fill
                                style={{ 
                                    objectFit: "contain", 
                                    maxWidth: "400px", 
                                    maxHeight: "254px", 
                                    top: "auto",
                                    aspectRatio: "1.575"
                                }}
                            />
                            <Image 
                                quality={100}
                                src={'/images/my-memoji-high-quality-cropped.png'} 
                                alt={'My memoji'} 
                                fill
                                style={{ 
                                    objectFit: "contain", 
                                    maxWidth: "300px", 
                                    maxHeight: "248px", 
                                    top: "auto",
                                    aspectRatio: "1.21"
                                }}
                            />
                        </div>
                        <div className={styles.btnGradientContainer} onClick={handleClick}>
                            <a href="#projects">{pageContent.projectsLink}</a>
                        </div>
                    </div>
                </section>
                <section className={styles.aboutMe}>
                    <div className={styles.sectionWrapper}>
						<p dangerouslySetInnerHTML={{__html: pageContent.introParagraph}}></p>
						<button>{pageContent.resumeDownloadButton} <FontAwesomeIcon icon={faDownload}/></button>
						<div className={styles.interests}>
							<p>{pageContent.interestsIntroText}</p>
							<ul>
								{
									pageContent.interests.map((value, index) => {
										const toIconLookup = (i: string) => { 
											const iSplit = i.split(" ")
											return { 
													prefix: iSplit[0].slice(0, 4).replace("-", ""),
													iconName: iSplit[1].slice(3)
											}
										}
										const iconMatch = (i: string, icon: IconDefinition) => {
											const { prefix, iconName } = toIconLookup(i)
											return prefix == icon.prefix && iconName == icon.iconName
										}
										let icon
										if(iconMatch(value.iconName, faFigma)) { icon = faFigma }
										else if(iconMatch(value.iconName, faCode)) { icon = faCode }
										else if(iconMatch(value.iconName, faCompactDisc)) { icon = faCompactDisc }
										else { icon = faHeart }
										return <li key={index}>{value.name}<FontAwesomeIcon icon={icon}/></li>
									})
								}
							</ul>
						</div>
                    </div>
                </section>
            </main>
        </div>
    )

}

export const getStaticProps: GetStaticProps<HeroProps> = async () => {
    
    return {
        props: {
            content: {
                en: HeroContentEN,
                fr: HeroContentFR
            },
            navItems: {
                en: NavItemsEN,
                fr: NavItemsFR
            },
            themes: {
                en: ThemeOptionsEN,
                fr: ThemeOptionsFR
            },
            rodyData: rody
        }
    }
}

export default HeroSection