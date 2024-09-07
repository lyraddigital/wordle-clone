import { PropsWithChildren, useEffect } from "react";

import ThemeContext, { ThemeState } from "../../context/theme-context";
import useLocalStorage from "../../hooks/use-local-storage";
import { isDarkModeKey } from "../../utility/utilities";

export default function ThemeProvider({ children }: PropsWithChildren) {
    const [isDarkMode, setIsDarkMode] = useLocalStorage(isDarkModeKey, false);

    useEffect(() => {
        const htmlElement = document.getElementsByTagName("html")[0];

        if (isDarkMode) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const wordleState: ThemeState = {
        isDarkMode,
        setIsDarkMode
    };

    return (
        <ThemeContext.Provider value={wordleState}>
            {children}
        </ThemeContext.Provider>
    );
}