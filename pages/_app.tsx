import '@styles/globals.scss'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import App from 'next/app'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { GlobalData } from 'types/global'
import { defaultContext, GlobalContext } from 'utils/context'

import globalData from '@content/global.json'

interface MyAppProps extends AppProps {
  globalData: GlobalData
}

const MyApp = ({ Component, pageProps, globalData }: MyAppProps) => {
  

  // set up the context (app data) that will be shared accross pages
  // used to make sure the user is authenticated,
  // and verify that they're authorized to access requested content

  const [appData, setAppData] = useState(defaultContext.appData) 
  
  // memoize the context
  const value = useMemo(
    () => ({ appData, setAppData }), [appData]
  );

  
  const [title, setTitle] = useState("")

  useEffect(() => {
    // update the page title depending on the site's language
    const lang = Object.keys(globalData.title).find(key => key == appData.lang)
    if(!lang) { return }
    setTitle(globalData.title[lang])
  }, [appData.lang])

  return (
    <GlobalContext.Provider value={value}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Rody Gosset's personal web developer & designer portfolio." />
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // get the app props
  const appProps: AppInitialProps = await App.getInitialProps(appContext)
  let componentProps = {}
  if(appContext.Component.getInitialProps) {
    // also get the current page's props
    componentProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  // pass the JSON File as props

  const data = globalData

  return {
    ...appProps,
    globalData: data,
    pageProps: {
      ...componentProps
    }
  }
}



export default MyApp