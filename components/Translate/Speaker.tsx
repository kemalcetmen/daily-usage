import React, { useContext } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';
import { ButtonContext } from '../../contexts/ButtonContext';

type Props = {
    text: string,
}

const Speaker = ({text}: Props) => {
  const {micOpen} = useContext(ButtonContext)

    const { speak,cancel,speaking } = useSpeechSynthesis();
    const spkOn = () => {
        speak({ text: text })
    }
    const spkOff = () => {
        cancel()
    }
  return (
    <>{!micOpen && 
      <>
       { !speaking ?
        <svg onClick={spkOn} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M234.67,106.67V405.33A21.33,21.33,0,0,1,200,422L99.18,341.33H64a64.07,64.07,0,0,1-64-64V234.67a64.07,64.07,0,0,1,64-64H99.18L200,90a21.33,21.33,0,0,1,34.66,16.66Zm54.11,90.68a21.33,21.33,0,0,0-1.19,30.15,42.23,42.23,0,0,1,0,57,21.33,21.33,0,1,0,31.33,29,84.89,84.89,0,0,0,0-114.94A21.34,21.34,0,0,0,288.78,197.34ZM379,137.87a21.33,21.33,0,0,0-30.78,29.54,127.61,127.61,0,0,1,0,177.19A21.33,21.33,0,1,0,379,374.14a170.26,170.26,0,0,0,0-236.27Zm60.36-60.6a21.34,21.34,0,0,0-30.55,29.79,213.59,213.59,0,0,1,0,297.9,21.34,21.34,0,0,0,30.55,29.79,256.28,256.28,0,0,0,0-357.48Z"/></svg>
        :
        <svg onClick={spkOff} style={{padding: "0px"}}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 511.99"><path d="M256 0c70.68 0 134.7 28.66 181.02 74.98C483.34 121.3 512 185.32 512 256s-28.66 134.69-74.98 181.01C390.7 483.33 326.68 511.99 256 511.99s-134.7-28.66-181.02-74.98C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.7 74.98-181.02C121.3 28.66 185.32 0 256 0zm-73.19 174.9h146.37c4.81 0 8.74 4.02 8.74 8.75v144.68c0 4.73-4 8.74-8.74 8.74H182.81c-4.73 0-8.73-3.92-8.73-8.74V183.65c0-4.81 3.93-8.75 8.73-8.75zm229.94-75.65C372.64 59.15 317.21 34.33 256 34.33c-61.21 0-116.64 24.82-156.75 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.21 24.82 116.63 64.92 156.74 40.11 40.1 95.54 64.92 156.75 64.92 61.21 0 116.64-24.82 156.75-64.92 40.1-40.11 64.92-95.53 64.92-156.74 0-61.21-24.82-116.64-64.92-156.75z"/></svg>
      }</>
    }
    </>
    )
}

export default Speaker