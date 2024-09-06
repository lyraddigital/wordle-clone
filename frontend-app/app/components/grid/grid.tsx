import useWordle from "../../hooks/use-wordle";
import useWordleKeyboard from "../../hooks/use-wordle-keyboard";

import CurrentRow from "./current-row";
import EmptyRow from "./empty-row";
import ExistingRow from "./existing-row";

export default function Grid() {
    const { guesses, numberOfTurns, solution } = useWordle();

    useWordleKeyboard();

    return (
        <>
            <div className="text-lg text-white">Answer is {solution}</div>
            <div className="w-[350px] flex flex-col gap-[5px]">
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
        </>
    );
}
