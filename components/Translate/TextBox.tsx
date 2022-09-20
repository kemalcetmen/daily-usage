import React from 'react'
import styles from '../../styles/TextBox.module.scss'
import TextareaAutosize from 'react-textarea-autosize';
import Mic from './Mic';
import Speaker from './Speaker';

type Props = {
    type: string,
    text: string,
    currentLanguage: string,
    setTextToTranslate?: React.Dispatch<React.SetStateAction<string>>,
    setTranslatedText?: React.Dispatch<React.SetStateAction<string>>,
    setShowModal: React.Dispatch<React.SetStateAction<string>>
}

const TextBox = ({
    type,
    text,
    currentLanguage,
    setTextToTranslate,
    setTranslatedText,
    setShowModal}: Props) => {
      
    const handleClick = () => {
        setTextToTranslate?.("")
        setTranslatedText?.("")
      }
    const openModal = () => {
        setShowModal(type)
      }  

  return (
    <div className={styles.textbox}>
        <div className={styles.languageselector} onClick={openModal}>
          <input disabled value={currentLanguage}/>
          <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M7 10l5 5 5-5z"></path></svg>
        </div>
        <div className={type === "input" ? styles.input : styles.output}>
          <div className={styles.texts}>
            {type === 'input' && (
              <div className={styles.delete} onClick={handleClick}>
                ˟
              </div>
            )}
            <TextareaAutosize
                onChange={(e) => setTextToTranslate?.(e.target.value)}
                disabled={type !== "input"}
                value={text}
                placeholder={type == 'input' ? 'Enter text' : 'Translation'}
            />
          </div>
          <div className={styles.svgs}> 
            {type === 'input' && (
              <Mic setTextToTranslate={setTextToTranslate}/>
            )}
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M234.67,106.67V405.33A21.33,21.33,0,0,1,200,422L99.18,341.33H64a64.07,64.07,0,0,1-64-64V234.67a64.07,64.07,0,0,1,64-64H99.18L200,90a21.33,21.33,0,0,1,34.66,16.66Zm54.11,90.68a21.33,21.33,0,0,0-1.19,30.15,42.23,42.23,0,0,1,0,57,21.33,21.33,0,1,0,31.33,29,84.89,84.89,0,0,0,0-114.94A21.34,21.34,0,0,0,288.78,197.34ZM379,137.87a21.33,21.33,0,0,0-30.78,29.54,127.61,127.61,0,0,1,0,177.19A21.33,21.33,0,1,0,379,374.14a170.26,170.26,0,0,0,0-236.27Zm60.36-60.6a21.34,21.34,0,0,0-30.55,29.79,213.59,213.59,0,0,1,0,297.9,21.34,21.34,0,0,0,30.55,29.79,256.28,256.28,0,0,0,0-357.48Z"/></svg> */}
              <Speaker text={text}/>
            {type === 'output' && (
              <svg onClick={() =>  navigator.clipboard.writeText(text)} xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 155.77 162.88"><path d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"/></svg>
            )}
          </div>
        </div>
    </div>
  )
}

export default TextBox