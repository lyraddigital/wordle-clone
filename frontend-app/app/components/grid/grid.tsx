import useWordle from "../../hooks/use-wordle";
import useWordleKeyboard from "../../hooks/use-wordle-keyboard";

import CurrentRow from "./current-row";
import EmptyRow from "./empty-row";
import ExistingRow from "./existing-row";

export default function Grid() {
    const { guesses, numberOfTurns } = useWordle();

    useWordleKeyboard();

    return (
        <div className="w-[350px] flex flex-col gap-[5px] relative">
            {guesses.map((g, gInd) => {
                if (numberOfTurns === gInd) {
                    return <CurrentRow key={gInd} />;
                }

                if (g) {
                    return <ExistingRow key={gInd} guess={g} />
                }

                return <EmptyRow key={gInd} />
            })}
            {/* <div className="flex flex-col items-center absolute left-0 right-0 top-[-65px]">
                <div className="bg-gree-800 text-white dark:bg-neutral-100 dark:text-neutral-900 px-3 py-2 rounded-sm font-bold">Test Item</div>
            </div> */}
        </div>
    );
}
