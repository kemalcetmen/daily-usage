import React,{useContext, useEffect, useState} from 'react'
import styles from '../styles/TheButton.module.scss'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ButtonContext } from '../contexts/ButtonContext';

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
  const {micOpen} = useContext(ButtonContext)

  const {transcript,resetTranscript, listening,
  } = useSpeechRecognition({transcribing:!micOpen ,commands })

  // useEffect(() => {
  //   resetTranscript()
  // },[micOpen, resetTranscript])

  // useEffect(() => {
  //   console.log(`main ${transcript}`)
  //   console.log(`listening ${listening}`)

  // })
  const openButtonOne = () => {
    resetTranscript()
    SpeechRecognition.startListening()
  }
  const openButtonDouble = () => {
    //it doesnt work now
    resetTranscript()
    SpeechRecognition.startListening({ continuous: true})
  }
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
        <div className={styles.closedbutton} onClick={openButtonOne} onDoubleClick={openButtonDouble}>
            <div className={styles.buttonimage} >
              t
            </div>
        </div>
      }
    </div>
  )
}

export default TheButton