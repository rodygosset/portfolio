import { Html, Head, Main, NextScript } from 'next/document'
import { useContext } from 'react'
import { GlobalContext } from 'utils/context'


const MyDocument = () => {

    const { appData } = useContext(GlobalContext)

    const isDarkMode = () => appData.theme == "dark"

    const getClassNames = () => isDarkMode() ? 'dark' : ''

    return (
        <Html>
            <Head />
            <body className={getClassNames()}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )

} 

export default MyDocument


