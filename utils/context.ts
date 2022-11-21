import { createContext } from "react";



export interface AppData {
    theme: "light" | "dark",
    lang: string,
}

export interface ContextType {
    appData: AppData,
    setAppData: (data: AppData) => void
}


export const defaultContext: ContextType = {
    appData: {
        theme: "light",
        lang: "fr"
    },
    setAppData: (data) => {},
}

export const GlobalContext = createContext(defaultContext)