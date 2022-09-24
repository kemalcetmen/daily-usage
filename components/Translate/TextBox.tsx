import React from 'react'
import styles from '../../styles/TextBox.module.scss'
import TextareaAutosize from 'react-textarea-autosize';
import Mic from './Mic';
import Speaker from './Speaker';
import CopyText from './CopyText';

type Props = {
    type: string,
    text: string,
    currentLanguage: string,
    micOpen: boolean,
    setTextToTranslate?: React.Dispatch<React.SetStateAction<string>>,
    setTranslatedText?: React.Dispatch<React.SetStateAction<string>>,
    setShowModal: React.Dispatch<React.SetStateAction<string>>,
    setMicOpen?: React.Dispatch<React.SetStateAction<boolean>>,
}

const TextBox = ({
    type,
    text,
    currentLanguage,
    setTextToTranslate,
    setTranslatedText,
    setShowModal,
    micOpen,
    setMicOpen}: Props) => {
      
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
              <Mic micOpen={micOpen} setMicOpen={setMicOpen} setTextToTranslate={setTextToTranslate}/>
            )}
              {!micOpen && <Speaker text={text}/>}
            {type === 'output' && (
              !micOpen && <CopyText text={text}/>
            )}
          </div>
        </div>
    </div>
  )
}

export default TextBox