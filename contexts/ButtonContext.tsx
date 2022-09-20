import React, { useState,createContext } from 'react'

interface IThemeContext {
    micOpen: boolean;
    setMicOpen: (boolean: boolean) => void;
  }

export const ButtonContext = createContext<IThemeContext>({
    micOpen: false,
    setMicOpen: () => {}
})

type Props = {
  children: React.ReactNode,
}
export const ButtonProvider = ({children}: Props) => {
    const [micOpen,setMicOpen] =useState(false)

    return (
        <ButtonContext.Provider
            value={{
                micOpen,
                setMicOpen,
            }}
        >
            {children}
        </ButtonContext.Provider>
    )
}