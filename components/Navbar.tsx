import React from 'react'
import LoginButton from './LoginButton'
import styles from '../styles/Navbar.module.scss'
type Props = {}

const Navbar = (props: Props) => {
    return (
      <div className={styles.navbar}>
        <div className={styles.logButton}>
          <LoginButton/>
        </div>
      </div>
    )
}

export default Navbar
