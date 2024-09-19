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

    const themeState: ThemeState = {
        isDarkMode,
        setIsDarkMode
    };

    return (
        <ThemeContext.Provider value={themeState}>
            {children}
        </ThemeContext.Provider>
    );
}