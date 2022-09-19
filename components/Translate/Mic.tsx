import React ,{useContext, useEffect} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ButtonContext } from '../../contexts/ButtonContext';

type Props = {
    setTextToTranslate : React.Dispatch<React.SetStateAction<string>> | undefined
}
const Mic = ({setTextToTranslate}: Props) => {
  const {setDisableButton} = useContext(ButtonContext)
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable,
      } = useSpeechRecognition()

    useEffect(() => {
        if(listening){setTextToTranslate?.(transcript)}
    },[listening, setTextToTranslate, transcript])
    
    const micOn = () => {
        if (isMicrophoneAvailable && browserSupportsSpeechRecognition){
          resetTranscript()
          SpeechRecognition.startListening({ continuous: true })
          setDisableButton(true)
        }else{
          console.error("Speech recognition")
          return
        }
    }

    const micOff = () => {
        SpeechRecognition.stopListening()
        setDisableButton(false)
    }

  return (
    <>
    {
      !listening ?
      <svg onClick={micOn} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398 512"><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>
      :
      <svg onClick={micOff} style={{padding: "0px", backgroundColor:"blue"}}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 511.99"><path d="M256 0c70.68 0 134.7 28.66 181.02 74.98C483.34 121.3 512 185.32 512 256s-28.66 134.69-74.98 181.01C390.7 483.33 326.68 511.99 256 511.99s-134.7-28.66-181.02-74.98C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.7 74.98-181.02C121.3 28.66 185.32 0 256 0zm-73.19 174.9h146.37c4.81 0 8.74 4.02 8.74 8.75v144.68c0 4.73-4 8.74-8.74 8.74H182.81c-4.73 0-8.73-3.92-8.73-8.74V183.65c0-4.81 3.93-8.75 8.73-8.75zm229.94-75.65C372.64 59.15 317.21 34.33 256 34.33c-61.21 0-116.64 24.82-156.75 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.21 24.82 116.63 64.92 156.74 40.11 40.1 95.54 64.92 156.75 64.92 61.21 0 116.64-24.82 156.75-64.92 40.1-40.11 64.92-95.53 64.92-156.74 0-61.21-24.82-116.64-64.92-156.75z"/></svg>
    }
    </>
    )
}

export default Mic