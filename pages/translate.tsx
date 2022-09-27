import type { NextPage } from 'next'
import React , {useState, useEffect} from 'react'
import TextBox from '../components/Translate/TextBox'
import styles from '../styles/Translate.module.scss'
import Modal from '../components/Translate/Modal'
import TranslateButton from '../components/Translate/TranslateButton'
const langsexample = require('../langsexample.json')//temporary

type LangWithCode = {
    lang: string,
    code: string
  }
const Translate: NextPage = () => {
    const [showModal, setShowModal] = useState<string>("")
    const [languages, setLanguages] = useState<LangWithCode[] | any>(null)
    const [inputLanguage, setInputLanguage] = useState<LangWithCode>({
    lang: "English",
    code: "en"
  })
    const [outputLanguage, setOutputLanguage] = useState<LangWithCode>({
    lang: "Turkish",
    code: "tr"
  })
    const [textToTranslate, setTextToTranslate] = useState<string>('')
    const [translatedText, setTranslatedText] = useState<string>('')
    const [disableButton,setDisableButton] =useState(false)
    useEffect(() => {
        getLanguages()
    },[])
  
    const getLanguages = () =>{
        const langs = Object.values(langsexample.translation).map((e:any) => e.name)
        const codes = Object.keys(langsexample.translation)
        const langswithcodes = langs.reduce((o, k, i) => ([...o, {lang:k,code:codes[i]}]),[])
        setLanguages(langswithcodes)
    }
    const submitTranslate = async () => {
        const inputCode=inputLanguage.code
        const outoutCode=outputLanguage.code
        const data = {
            textToTranslate, inputCode, outoutCode
          }
        const response = await fetch('/api/translateApi', {
          method: 'POST',
          body: JSON.stringify(data),
        })
        const translated = await response.json()
        const translation = translated[0].translations[0].text
        setTranslatedText(translation)
      }
    //   useEffect(() => {
    //     submitTranslate()
    //     console.log(textToTranslate)
    // },[textToTranslate])
    //this useEffect for translate whenever text change (more expensive)

    const handleClick = () => {
        setInputLanguage(outputLanguage)
        setOutputLanguage(inputLanguage)
        setTextToTranslate(translatedText)
        setTranslatedText(textToTranslate)
    }
  return (
    <>
    <TranslateButton
        disableButton={disableButton}
        setDisableButton={setDisableButton}
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
                currentLanguage={inputLanguage.lang}
                disableButton={disableButton}
                setTextToTranslate={setTextToTranslate}
                setTranslatedText={setTranslatedText}
                setShowModal={setShowModal}
                setDisableButton={setDisableButton}
            />
            <div>
            <div className={styles.changebutton} onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path  d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></svg>            
            </div>
            <div className={styles.submitbutton} onClick={submitTranslate}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path  d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></svg>            
            </div>
            </div>
            
            <TextBox 
                type="output"
                text={translatedText}
                currentLanguage={outputLanguage.lang}
                setShowModal={setShowModal}
                disableButton={disableButton}
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