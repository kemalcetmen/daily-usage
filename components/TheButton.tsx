import React,{useContext, useState} from 'react'
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
  commands : Command[] | undefined 
}

const TheButton = ({commands}:Props) => {
  const {disableButton} = useContext(ButtonContext)

  const {transcript} = useSpeechRecognition({ commands })
  
  return (
    <div className={styles.all}>
    {!disableButton 
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
        <div className={styles.thebutton} onClick={()=>SpeechRecognition.startListening()}>
          <div className={styles.buttonimage} >
            t
          </div>
        </div>
      </div>
      :
      <div className={styles.redbutton}>
        r
      </div>
    }
    </div>
  )
}

export default TheButton