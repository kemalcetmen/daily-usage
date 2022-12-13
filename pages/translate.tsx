import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import TextBox from '../components/Translate/TextBox'
import styles from '../styles/Translate.module.scss'
import Modal from '../components/Translate/Modal'
import Head from 'next/head'
import TranslateButton from '../components/TalkButtons(removed)/TranslateButton'
import Languages from '../components/Translate/Language'

const langsexample = require('../langsexample.json')//there is a problem in getting languages api 

type LangWithCode = {
  lang: string,
  code: string
}
const Translate: NextPage = () => {
  const [showModal, setShowModal] = useState<string>("")
  const [languages, setLanguages] = useState<LangWithCode[] | any>(null)
  const [inputLanguage, setInputLanguage] = useState<LangWithCode>({ lang: "", code: "" })
  const [outputLanguage, setOutputLanguage] = useState<LangWithCode>({ lang: "", code: "" })
  const [oldInput, setOldInput] = useState<LangWithCode>({ lang: "", code: "" })
  const [oldOutput, setOldOutput] = useState<LangWithCode>({ lang: "", code: "" })
  const [textToTranslate, setTextToTranslate] = useState<string>('')
  const [translatedText, setTranslatedText] = useState<string>('')
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    if (inputLanguage === outputLanguage) {
      if (inputLanguage !== oldInput) {
        setOutputLanguage(oldInput)
        setTextToTranslate(translatedText)
        setTranslatedText(textToTranslate)
      } else {
        setInputLanguage(oldOutput)
        setTextToTranslate(translatedText)
        setTranslatedText(textToTranslate)
      }
    } else {
      setOldInput(inputLanguage)
      setOldOutput(outputLanguage)
    }
  }, [inputLanguage, outputLanguage])

  useEffect(() => {
    getLanguages()
  }, [])

  const getLanguages = () => {
    const langs = Object.values(langsexample.translation).map((e: any) => e.name)
    const codes = Object.keys(langsexample.translation)
    const langswithcodes = langs.reduce((o, k, i) => ([...o, { lang: k, code: codes[i] }]), [])
    const firstInput = langswithcodes.find((l: any) => l.lang === "English")
    const firstOutput = langswithcodes.find((l: any) => l.lang === "Turkish")
    setInputLanguage(firstInput)
    setOutputLanguage(firstOutput)
    setLanguages(langswithcodes)
  }

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const inputCode = inputLanguage.code
    const outputCode = outputLanguage.code
    const data = {
      textToTranslate, inputCode, outputCode
    }
    fetch('/api/translate', {
      method: 'POST',
      body: JSON.stringify(data),
      signal
    }).then((res) => res.json())
      .then((data) => {
        const translation = data[0]?.translations[0].text
        setTranslatedText(translation)
      })
    return () => {
      controller.abort()
    }
  }, [textToTranslate, inputLanguage, outputLanguage])

  const handleClick = () => {
    setInputLanguage(outputLanguage)
    setOutputLanguage(inputLanguage)
    setTextToTranslate(translatedText)
    setTranslatedText(textToTranslate)
  }
  return (
    <>
      <Head>
        <title>Translate</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <TranslateButton
        languages={languages}
        disableButton={disableButton}
        setDisableButton={setDisableButton}
        setInputLanguage={setInputLanguage}
        setOutputLanguage={setOutputLanguage}
        setTextToTranslate={setTextToTranslate}
    /> */}
        <div className={styles.content}>
          {!showModal
            ?
            <>
              <div className={styles.languages}>
                <Languages
                  type="input"
                  currentLanguage={inputLanguage.lang}
                  setShowModal={setShowModal}
                />
                <div className={styles.changebutton} >
                  <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></svg>
                </div>
                <Languages
                  type="output"
                  currentLanguage={outputLanguage.lang}
                  setShowModal={setShowModal}
                />
              </div>
              <div className={styles.texts}>
                <TextBox
                  type="input"
                  text={textToTranslate}
                  disableButton={disableButton}
                  setTextToTranslate={setTextToTranslate}
                  setTranslatedText={setTranslatedText}
                  setDisableButton={setDisableButton}
                />
                <TextBox
                  type="output"
                  text={translatedText}
                  disableButton={disableButton}
                />
              </div>
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