

import styles from "@styles/pages/home.module.scss"
import { GetStaticProps, NextPage } from "next"
import Image from 'next/image'
import { HeroContentType } from "types/hero"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "utils/context"



import HeroContentEN from '@content/en/heroContent.json'
import HeroContentFR from '@content/fr/heroContent.json'


import NavItemsEN from '@content/en/navItems.json'
import NavItemsFR from '@content/fr/navItems.json'

import ThemeOptionsEN from '@content/en/themes.json'
import ThemeOptionsFR from '@content/fr/themes.json'


import GradientShape from '@images/gradient-background-shape.svg'

import rody from '@content/rody.json'
import { Rody } from "types/rody"
import Nav from "@components/nav"
import { NavItemsType } from "types/nav"
import { ThemeOptionType } from "types/theme"

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

    return (
        <div className={styles.main}>
            <Nav 
                navItems={navItems}
                themeOptions={themes} 
                rodyData={rodyData} 
            />
            <main>
                <section className={styles.hero}>
                    <p>{pageContent.greeting}<span>{rodyData.firstName}</span></p>
                    <h1 dangerouslySetInnerHTML={{__html: pageContent.jobTitle}}></h1>
                    <div className={styles.illustrationContainer}>
                        <Image 
                            quality={100}
                            src={'/images/gradient-background-shape.svg'} 
                            alt={'Gradient Background Shape'} 
                            fill
                            style={{ objectFit: "contain", maxWidth: "400px", maxHeight: "254px", top: "auto" }}
                        />
                        <Image 
                            quality={100}
                            src={'/images/my-memoji-high-quality-cropped.png'} 
                            alt={'My memoji'} 
                            fill
                            style={{ objectFit: "contain", maxWidth: "300px", maxHeight: "248px", top: "auto" }}
                        />
                    </div>
                    <div className={styles.btnGradientContainer}>
                        <button>{pageContent.projectsLink}</button>
                    </div>
                </section>
                {/* <section className={styles.aboutMe}>

                </section> */}
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