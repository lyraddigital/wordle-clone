import useTheme from "@/hooks/theme/use-theme";

import MoonIcon from "@/components/icons/moon-icon";
import SunIcon from "@/components/icons/sun-icon";

export default function Switch() {
    const { isDarkMode, setIsDarkMode } = useTheme();

    return (
        <div
            className="w-[70px] h-[30px] top-[21px] right-[8px] sm:right-[40px] rounded-3xl bg-neutral-900 text-white dark:bg-neutral-400 absolute cursor-pointer"
            onClick={() => setIsDarkMode(prevIsDarkMode => !prevIsDarkMode)}
        >
            <span className="absolute transition-transform w-[22px] h-[22px] bg-neutral-400 block rounded-full translate-x-[3px] translate-y-[4px] dark:bg-neutral-800 dark:translate-x-[45px]" />
            {isDarkMode && <SunIcon />}
            {!isDarkMode && <MoonIcon />}
        </div>
    );
}