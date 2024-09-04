import { PropsWithChildren, useEffect, useState } from "react";

import ThemeContext, { ThemeState } from "../context/theme-context";
import { getIsDarkModeFromLocalStorage, setIsDarkModelToLocalStorage } from "../utility/utilities";

export default function ThemeProvider({ children }: PropsWithChildren) {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(getIsDarkModeFromLocalStorage());

    useEffect(() => {
        const htmlElement = document.getElementsByTagName("html")[0];

        if (isDarkMode) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }

        setIsDarkModelToLocalStorage(isDarkMode);
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