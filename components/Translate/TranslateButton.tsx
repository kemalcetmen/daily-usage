import React,{useState} from 'react'
import TheButton from '../TheButton'

type Props = {
    setInputLanguage : React.Dispatch<React.SetStateAction<string>>
    setOutputLanguage : React.Dispatch<React.SetStateAction<string>>
    setTextToTranslate : React.Dispatch<React.SetStateAction<string>>
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
    setInputLanguage,
    setOutputLanguage,
    setTextToTranslate}: Props) => {
    const [message,setMessage]=useState("")

    const commands : Command[] = [
    {
      command: 'I would like to order *',
      callback: (food: any) => setMessage(`Your order is for: ${food}`)
    },
    {
      command: 'selam',
      callback: (food: any) =>console.log("selamke")
    },
    {
      command: 'The weather is :condition today',
      callback: (condition: any) => setMessage(`Today, the weather is ${condition}`)
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1: any, sport2: any) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    },
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }: any) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true
    },
    {
      command: 'Beijing',
      callback: (command: any, spokenPhrase: any, similarityRatio: number) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: ['eat', 'sleep', 'leave'],
      callback: (command: any) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }:any) => resetTranscript()
    }
  ]
  return (
    <TheButton commands={commands}/>
  )
}

export default TranslateButton