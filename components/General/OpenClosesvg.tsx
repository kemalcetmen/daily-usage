import React from 'react'
import styles from '../../styles/TurnSvg.module.scss'

type Props = {
  close: boolean,
}

const OpenClosesvg = ({close}: Props) => {
  return (
    <div className={close ? styles.close : styles.open}>
      <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M7 10l5 5 5-5z"></path></svg>
    </div>
  )
}

export default OpenClosesvg