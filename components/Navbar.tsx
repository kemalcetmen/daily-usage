import React from 'react'
import LoginButton from './LoginButton'
import styles from '../styles/Layout.module.scss'
import Link from 'next/link'
type Props = {}

const Navbar = (props: Props) => {
    return (
      <nav className={styles.navbar}>
        <div className={styles.links}>
          <Link href="/translate">
              <div className={styles.link}>
                  <div>{"Translate"}</div>
              </div>
          </Link>
          <Link href="/money">
              <div className={styles.link}>
                  <div>{"Wallet"}</div>
              </div>
          </Link>
        </div>
        
        <div className={styles.logButton}>
          <LoginButton/>
        </div>
      </nav>
    )
}

export default Navbar
