import Navbar from './Navbar'
import styles from '../styles/Layout.module.scss'

type Props = {
    children: React.ReactNode,
}

const Layout = ({children}: Props) => {
  return (
    <>
        <Navbar />
        <main  className={styles.layoutmain}>{children}</main>
    </>  
    )
}

export default Layout