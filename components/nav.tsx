import styles from "@styles/layout/nav.module.scss"
import { useContext, useState } from "react"

import { NavItemsType } from "types/nav"

import { Rody } from "types/rody"
import { GlobalContext } from "utils/context"

interface NavProps {
    navItems: {
        [lang: string]: NavItemsType
    },
    rodyData: Rody,
    contentLang: string
}

const Nav = ({ navItems, rodyData }: NavProps) => {

    const { appData } = useContext(GlobalContext)

    const [current, setCurrent] = useState<string>(Object.keys(navItems)[0])

    return (
        <nav className={styles.nav}>
            <p>{rodyData.firstName} {rodyData.lastName}</p>
            <ul>
            {
                Object.keys(navItems).map(itemKey => {

                    return (
                        <li className={itemKey == current ? styles.current : ''}>{navItems[appData.lang][itemKey]}</li>
                    )
                })
            }
            </ul>
        </nav>
    )

}


export default Nav