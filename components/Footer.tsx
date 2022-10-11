import React from 'react'
import styles from '../styles/Layout.module.scss'
import { BsFacebook } from 'react-icons/bs';
import { BsYoutube } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';

type Props = {}

const Footer = (props: Props) => {
    return (
      <footer className={styles.footer}>
        <div className={styles.icons}>
          <div title="we are not going anywhere" className={styles.fb}>
            <BsFacebook/>
          </div>
          <div title="we are not going anywhere" className={styles.yt}>
            <BsYoutube/>
          </div>
          <div title="we are not going anywhere" className={styles.tw}>
            <AiFillTwitterCircle/>
          </div>
          <div title="we are not going anywhere" className={styles.in}>
            <AiFillInstagram/>
          </div>
        </div>
      </footer>
    )
}

export default Footer
