

import styles from "@styles/Home.module.scss"
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next"
import Image from 'next/image'
import { HeroContentType } from "types/hero"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "utils/context"


import HeroContentEN from '@content/en/heroContent.json'
import HeroContentFR from '@content/fr/heroContent.json'


import rody from '@content/rody.json'
import { Rody } from "types/rody"

interface HeroProps {
    content: {
        [lang: string]: HeroContentType
    },
    rodyData: Rody
}

const HeroSection: NextPage<HeroProps> = ({ content, rodyData }) => {

    const { appData } = useContext(GlobalContext)

    const [contentLang, setContentLang] = useState(Object.keys(content).find(key => key == appData.lang))

    const [pageContent, setPageContent] = useState<HeroContentType>(contentLang ? content[contentLang] : content.en)

    useEffect(() => {
        setContentLang(appData.lang)
    }, [appData.lang])

    useEffect(() => setPageContent(contentLang ? content[contentLang] : content.en), [contentLang])

    return (
        <div className={styles.main}>
            <main>
                <p>{pageContent.greeting}<span>{rodyData.firstName}</span></p>
                <h1>{pageContent.jobTitle}</h1>
                <Image src={'/images/my-memoji.svg'} alt={'my memoji'} width="300" height="300" />
            </main>
        </div>
    )

}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<HeroProps>> => {
    
    return {
        props: {
            content: {
                en: HeroContentEN,
                fr: HeroContentFR
            },
            rodyData: rody
        }
    }
}

export default HeroSection