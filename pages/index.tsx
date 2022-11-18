import Head from 'next/head'

import styles from "@styles/Home.module.scss"
import Image from 'next/image'

const Home = () => {

    return (
        <div className={styles.main}>
            <Head>
                <title>Rody Gosset's Portfolio</title>
                <meta name="description" content="Rody Gosset's personal web developer & designer portfolio." />
                <link rel="icon" href="/favicon.png" type="image/svg+xml" />
            </Head>

            <main>
                <p>Hi, I'm <span>Rody</span></p>
                <h1>web developer <br/>designer</h1>
                <Image src={'/images/my-memoji.svg'} alt={'my memoji'} width="300" height="300" />
            </main>
        </div>
    )

}

export default Home