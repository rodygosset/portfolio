import { faLanguage, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Scroll from 'react-scroll'
import styles from "@styles/layout/nav.module.scss"
import { useContext, useState } from "react"

import { NavItemsType } from "types/nav"

import { Rody } from "types/rody"
import { ThemeOptionType } from "types/theme"
import { GlobalContext } from "utils/context"

import GradientCloseIcon from "@icons/gradient-close-icon.svg"
import ModernBurgerIcon from "@icons/modern-burger-icon.svg"

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

    const [showWrapper, setShowWrapper] = useState<boolean>(false)

    const getWrapperClassNames = () => {
        let classNames = styles.wrapper
        classNames += showWrapper ? ' ' + styles.showWrapper : ' ' + styles.hideWrapper
        return classNames
    }

    return (
        <nav className={styles.nav}>
            <a onClick={scrollToTop}>{rodyData.firstName} {rodyData.lastName}</a>
            <div className={getWrapperClassNames()}>
                {
                    showWrapper &&
                    <div className={styles.toggleContainer}>
                        <GradientCloseIcon className={styles.toggle} onClick={() => setShowWrapper(!showWrapper)} />
                    </div>
                }
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
            </div>
            {
                showWrapper ?
                <GradientCloseIcon className={styles.toggle} onClick={() => setShowWrapper(!showWrapper)} />
                :
                <ModernBurgerIcon className={styles.toggle} onClick={() => setShowWrapper(!showWrapper)} />
            }
        </nav>
    )

}


export default Nav