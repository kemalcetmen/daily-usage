import type { NextPage } from 'next'
import React , {useState, useEffect} from 'react'
import TextBox from '../components/Translate/TextBox'
import styles from '../styles/Translate.module.scss'
import langs from '../tryings/langs'
import Modal from '../components/Translate/Modal'
import TranslateButton from '../components/Translate/TranslateButton'

const Translate: NextPage = () => {
    const [showModal, setShowModal] = useState<string>("")
    const [languages, setLanguages] = useState<string[] | any>(null)
    const [inputLanguage, setInputLanguage] = useState<string>('English')
    const [outputLanguage, setOutputLanguage] = useState<string>('Polish')
    const [textToTranslate, setTextToTranslate] = useState<string>('')
    const [translatedText, setTranslatedText] = useState<string>('')

    const getLanguages = () =>{
        setLanguages(langs.map(e => e.name))
    }
    useEffect(() => {
        console.log(speechSynthesis.getVoices())
        getLanguages()
    },[])

    const handleClick = () => {
        setInputLanguage(outputLanguage)
        setOutputLanguage(inputLanguage)
        setTextToTranslate(translatedText)
        setTranslatedText(textToTranslate)
    }
  return (
    <>
    <TranslateButton
        setInputLanguage={setInputLanguage}
        setOutputLanguage={setOutputLanguage}
        setTextToTranslate={setTextToTranslate}
    />
    <div className={styles.content}>
        {!showModal
        ?
        <>
            <TextBox
                type="input"
                text={textToTranslate}
                currentLanguage={inputLanguage}
                setTextToTranslate={setTextToTranslate}
                setTranslatedText={setTranslatedText}
                setShowModal={setShowModal}
            />
            <div className={styles.changebutton} onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path  d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></svg>            
            </div>
            <TextBox 
                type="output"
                text={translatedText}
                currentLanguage={outputLanguage}
                setShowModal={setShowModal}
            />
        </>
        :
        <Modal 
            languages={languages}
            setShowModal={setShowModal}
            setChosenLanguage={showModal === 'input' ? setInputLanguage : setOutputLanguage}
        />}
    </div>
    </>
  )
}

export default Translate