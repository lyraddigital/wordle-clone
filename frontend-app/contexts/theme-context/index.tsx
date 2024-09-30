import { createContext, Dispatch, SetStateAction } from "react";

export interface ThemeState {
    isDarkMode: boolean;
    setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeState>({} as ThemeState);

export default ThemeContext;