import Navbar from './Navbar'
import styles from '../styles/Layout.module.scss'
import Footer from './Footer'

type Props = {
    children: React.ReactNode,
}

const Layout = ({children}: Props) => {
  return (
    <div className={styles.layout}>
        <Navbar />
        <main  className={styles.layoutmain}>{children}</main>
        <Footer/>
    </div>  
    )
}

export default Layout