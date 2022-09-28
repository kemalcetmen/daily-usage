import React,{useEffect} from 'react'
import styles from '../styles/TheButton.module.scss'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
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
  customCommands : Command[],
  disableButton: boolean,
  setDisableButton?: React.Dispatch<React.SetStateAction<boolean>>,
}

const TheButton = ({customCommands,disableButton,setDisableButton}:Props) => {
  const baseCommands : Command[] = [
    {
      command: ['Hello', 'Hi'],
      callback: () => {},
      matchInterim: true
    },
  ]
  const commands = disableButton ? [] : baseCommands.concat(customCommands)
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition({transcribing:!disableButton ,commands })

  useEffect(() => {
    console.log(`micmain ${transcript}`)    
  },[transcript])

  const oneClick = ()=>{
    if(isMicrophoneAvailable && browserSupportsSpeechRecognition){
      setDisableButton?.(false)
      SpeechRecognition.startListening()
      resetTranscript()

    }else{
      console.error("Speech recognition")
      return
    }
  }
  const doubleClick = ()=>{
    if(isMicrophoneAvailable && browserSupportsSpeechRecognition){
      setDisableButton?.(false)
      SpeechRecognition.startListening({ continuous: true})
      resetTranscript()
    }else{
      console.error("Speech recognition")
      return
    }
  }
  const click = DoubleClickHook(oneClick,doubleClick);

  const closeButton= () => {
    SpeechRecognition.stopListening()
  }
  return (
    <div className={styles.all}>
      {(!disableButton && listening)
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