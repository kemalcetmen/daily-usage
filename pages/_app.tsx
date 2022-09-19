import 'regenerator-runtime/runtime'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { ButtonProvider } from '../contexts/ButtonContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
        <ButtonProvider>
           <Layout>
               <Component {...pageProps} />
           </Layout>
        </ButtonProvider>
    )
}

export default MyApp
