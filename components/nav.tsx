import { faLanguage, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Scroll from 'react-scroll'
import styles from "@styles/layout/nav.module.scss"
import Link from "next/link"
import { useContext, useState } from "react"

import { NavItemsType } from "types/nav"

import { Rody } from "types/rody"
import { ThemeOptionType } from "types/theme"
import { GlobalContext } from "utils/context"

const scroll = Scroll.animateScroll


interface NavProps {
    navItems: {
        [lang: string]: NavItemsType
    },
    themeOptions: {
        [lang: string]: ThemeOptionType
    }
    rodyData: Rody
}

const Nav = ({ navItems, themeOptions, rodyData }: NavProps) => {

    const { appData } = useContext(GlobalContext)

    const [current, setCurrent] = useState<string>(navItems[appData.lang][Object.keys(navItems[appData.lang])[0]])


    const NavItem = ({ item }: { item: string}) => {

        return (
            <li 
                className={item == current ? styles.current : ''}>
                { item }
            </li>
        )
    }

    const scrollToTop = () => scroll.scrollToTop({ duration: 700 })

    return (
        <nav className={styles.nav}>
            <a onClick={scrollToTop}>{rodyData.firstName} {rodyData.lastName}</a>
            <ul>
            {
                Object.keys(navItems[appData.lang]).map((itemKey, index) => {
                    const item = navItems[appData.lang][itemKey]
                    return (
                        <NavItem 
                            key={index}
                            item={item} 
                        />
                    )
                })
            }
            </ul>
            <div className={styles.options}>
                <button>
                    <FontAwesomeIcon icon={faLanguage} />
                    {appData.lang.toUpperCase()}
                </button>
                <button>
                    <FontAwesomeIcon icon={appData.theme == "light" ? faSun : faMoon} />
                    {themeOptions[appData.lang][appData.theme]}
                </button>
            </div>
        </nav>
    )

}


export default Nav