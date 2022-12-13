import type { NextPage } from 'next'
import Head from 'next/head'
import Cards from '../components/Index/Cards'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.content}>
        <Cards/>
      </div>
    </>
  )
}

export default Home
