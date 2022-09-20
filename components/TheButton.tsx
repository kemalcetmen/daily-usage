import React,{useContext, useEffect, useState} from 'react'
import styles from '../styles/TheButton.module.scss'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ButtonContext } from '../contexts/ButtonContext';
import DoubleClickHook from './hooks/DoubleClickHook';

interface Command {
  command: string | string[] | RegExp;
  callback: (...args: any[]) => unknown;
  isFuzzyMatch?: boolean | undefined;
  matchInterim?: boolean | undefined;
  fuzzyMatchingThreshold?: number | undefined;
  bestMatchOnly?: boolean | undefined;
}

type Props = {
  commands : Command[]
}

const TheButton = ({commands}:Props) => {
  const {micOpen,setMicOpen} = useContext(ButtonContext)
  const {
    transcript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({transcribing:!micOpen ,commands })

  useEffect(() => {
    console.log(`micmain ${transcript}`)    
  },[transcript])

  const oneClick = ()=>{
    SpeechRecognition.startListening()
    setMicOpen(false)
  }
  const doubleClick = ()=>{
    SpeechRecognition.startListening({continuous: true})
    setMicOpen(false)
  }
  const click = DoubleClickHook(oneClick,doubleClick);

  const closeButton= () => {
    SpeechRecognition.stopListening()
  }
  return (
    <div className={styles.all}>
      {(!micOpen && listening)
        ?
        <div className={styles.whenworking}>
          {transcript &&
          <div className={styles.dialog}>
            <input
              value={transcript}
              disabled
            />
          </div>
          }
          <div className={styles.workingbutton} onClick={closeButton}>
            <div className={styles.buttonimage} >
              t
            </div>
          </div>
        </div>
        :
        <div className={styles.closedbutton} onClick={click} title='Double click for long listening'>
            <div className={styles.buttonimage} >
              t
            </div>
        </div>
      }
    </div>
  )
}

export default TheButton