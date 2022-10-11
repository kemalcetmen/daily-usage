import React from 'react'
import styles from '../../styles/translate/TextBox.module.scss'
import TextareaAutosize from 'react-textarea-autosize';
import Mic from './Mic';
import Speaker from './Speaker';
import CopyText from './CopyText';
import OpenClosesvg from '../General/OpenClosesvg';

type Props = {
    type: string,
    text: string,
    currentLanguage: string,
    disableButton: boolean,
    setTextToTranslate?: React.Dispatch<React.SetStateAction<string>>,
    setTranslatedText?: React.Dispatch<React.SetStateAction<string>>,
    setShowModal: React.Dispatch<React.SetStateAction<string>>,
    setDisableButton?: React.Dispatch<React.SetStateAction<boolean>>,
}

const TextBox = ({
    type,
    text,
    currentLanguage,
    setTextToTranslate,
    setTranslatedText,
    setShowModal,
    disableButton,
    setDisableButton}: Props) => {
      
    const handleClick = () => {
        setTextToTranslate?.("")
        setTranslatedText?.("")
      }
    const openModal = () => {
        setShowModal(type)
      }  

  return (
    <div>
        <div className={styles.languageselector} onClick={openModal}>
          <input
                disabled={true}
                value={currentLanguage}
            />
            <OpenClosesvg close ={false}/>
        </div>
        <div className={type === "input" ? styles.input : styles.output}>
          <div className={styles.texts}>
            <TextareaAutosize
                onChange={(e) => setTextToTranslate?.(e.target.value)}
                disabled={type !== "input"}
                value={text}
                placeholder={type == 'input' ? 'Enter text' : 'Translation'}
            />
            {type === 'input' && (
              <div className={styles.delete} onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
              </div>
            )}
          </div>
          <div className={styles.svgs}> 
            {type === 'input' && (
              <Mic setDisableButton={setDisableButton} setTextToTranslate={setTextToTranslate}/>
            )}
              {!disableButton && <Speaker text={text}/>}
            {type === 'output' && (
              !disableButton && <CopyText text={text}/>
            )}
          </div>
        </div>
    </div>
  )
}

export default TextBox