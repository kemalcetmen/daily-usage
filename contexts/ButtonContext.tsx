import React, { useState,createContext } from 'react'

interface IThemeContext {
    disableButton: boolean;
    setDisableButton: (boolean: boolean) => void;
  }

export const ButtonContext = createContext<IThemeContext>({
    disableButton: false,
    setDisableButton: () => {}
})

type Props = {
  children: React.ReactNode,
}
export const ButtonProvider = ({children}: Props) => {
    const [disableButton,setDisableButton] =useState(false)

    return (
        <ButtonContext.Provider
            value={{
                disableButton,
                setDisableButton,
            }}
        >
            {children}
        </ButtonContext.Provider>
    )
}