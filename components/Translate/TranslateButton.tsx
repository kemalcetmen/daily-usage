import React,{useState} from 'react'
import TheButton from '../TheButton'
type LangWithCode = {
  lang: string,
  code: string
}
type Props = {
    languages: any,
    disableButton: boolean,
    setInputLanguage : React.Dispatch<React.SetStateAction<LangWithCode>>,
    setOutputLanguage : React.Dispatch<React.SetStateAction<LangWithCode>>,
    setTextToTranslate : React.Dispatch<React.SetStateAction<string>>,
    setDisableButton?: React.Dispatch<React.SetStateAction<boolean>>,
}

interface Command {
    command: string | string[] | RegExp;
    callback: (...args: any[]) => unknown;
    isFuzzyMatch?: boolean | undefined;
    matchInterim?: boolean | undefined;
    fuzzyMatchingThreshold?: number | undefined;
    bestMatchOnly?: boolean | undefined;
}

const TranslateButton = ({
    languages,
    disableButton,
    setInputLanguage,
    setOutputLanguage,
    setTextToTranslate,
    setDisableButton}: Props) => {

    const translateRequest = (inputLanguage:string, outputLanguage:string) => {
      const inputlang =languages.find((lang: any) => lang.lang === inputLanguage)
      const outputlang =languages.find((lang: any) => lang.lang === outputLanguage)
     if( !(inputlang && outputlang)) return console.error("Languages are not exist")
     setInputLanguage(inputlang)
     setOutputLanguage(outputlang)
    }
    const customCommands : Command[] = [
    {
      command: 'Translate from * to *',
      callback: (inputLanguage:string, outputLanguage:string) =>translateRequest(inputLanguage,outputLanguage)
    },
  ]
  return (
    <TheButton 
      customCommands={customCommands} 
      disableButton={disableButton}
      setDisableButton={setDisableButton}
    />
  )
}

export default TranslateButton