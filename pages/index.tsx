

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


import GradientShape from '@images/gradient-background-shape.svg'

import rody from '@content/rody.json'
import { Rody } from "types/rody"
import Nav from "@components/nav"
import { NavItemsType } from "types/nav"

interface HeroProps {
    content: {
        [lang: string]: HeroContentType
    },
    navItems: {
        [lang: string]: NavItemsType
    },
    rodyData: Rody
}

const HeroSection: NextPage<HeroProps> = ({ content, navItems, rodyData }) => {

    const { appData } = useContext(GlobalContext)

    const [pageContent, setPageContent] = useState<HeroContentType>(appData.lang ? content[appData.lang] : content.en)


    useEffect(() => setPageContent(appData.lang ? content[appData.lang] : content.en), [appData.lang])

    return (
        <div className={styles.main}>
            <Nav navItems={navItems} rodyData={rodyData} />
            <main>
                <section className={styles.hero}>
                    <p>{pageContent.greeting}<span>{rodyData.firstName}</span></p>
                    <h1 dangerouslySetInnerHTML={{__html: pageContent.jobTitle}}></h1>
                    <div className={styles.illustrationContainer}>
                        <GradientShape/>
                        <Image 
                            quality={100}
                            src={'/images/my-memoji-high-quality.png'} 
                            alt={'My memoji'} 
                            width="300" 
                            height="300" 
                        />
                    </div>
                    <div className={styles.btnGradientContainer}>
                        <button>{pageContent.projectsLink}</button>
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
            rodyData: rody
        }
    }
}

export default HeroSection