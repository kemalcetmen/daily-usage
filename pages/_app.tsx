import 'regenerator-runtime/runtime'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {

  const {session}:any = pageProps

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>  
    </SessionProvider>
    )
}

export default MyApp
