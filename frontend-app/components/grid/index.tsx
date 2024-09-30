import { ToastBar, Toaster } from "react-hot-toast";
import colors from 'tailwindcss/colors';

import useTheme from "@/hooks/theme/use-theme";
import useWordle from "@/hooks/wordle/use-wordle";
import useWordleKeyboard from "@/hooks/keyboard/use-wordle-keyboard";

import CurrentRow from "@/components/grid/current-row";
import EmptyRow from "@/components/grid/empty-row";
import ExistingRow from "@/components/grid/existing-row";

export default function Grid() {
    const { guesses, numberOfTurns } = useWordle();
    const { isDarkMode } = useTheme();

    useWordleKeyboard();

    return (
        <div className="w-[350px] flex flex-col gap-[5px] relative">
            <Toaster containerStyle={{ position: 'relative', left: 0, right: 0, top: "-60px" }}>
                {(t) => (
                    <ToastBar
                        toast={t}
                        style={{
                            ...t.style,
                            background: isDarkMode ? colors.white : colors.neutral[800],
                            color: isDarkMode ? colors.black : colors.neutral[50]
                        }}
                    />
                )}
            </Toaster>
            {guesses.map((g, gInd) => {
                if (numberOfTurns === gInd) {
                    return <CurrentRow key={gInd} />;
                }

                if (g) {
                    return <ExistingRow key={gInd} guess={g} />
                }

                return <EmptyRow key={gInd} />
            })}
        </div>
    );
}
