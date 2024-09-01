import clsx from "clsx";

import useCurrentGuess from "../hooks/use-current-guess";
import useIsCurrentGuessIncorrect from "../hooks/use-is-current-guess-incorrect";

import RowContainer from "./row-container";
import Tile from "./tile";

export default function CurrentRow() {
    const currentGuess = useCurrentGuess();
    const guessIsGuessIncorrect = useIsCurrentGuessIncorrect();
    const filledClasses = clsx(
        "filled",
        guessIsGuessIncorrect ? "incorrect" : undefined
    );
    const unfilledClasses = clsx(
        "border-neutral-700",
        guessIsGuessIncorrect ? "incorrect" : undefined
    );
    const letters = currentGuess.split("");

    return (
        <RowContainer classes="current">
            {letters.map((letter, i) => (
                <Tile key={i} classes={filledClasses}>
                    {letter}
                </Tile>
            ))}
            {[...Array(5 - letters.length)].map((_, i) => (
                <Tile key={i} classes={unfilledClasses} />
            ))}
        </RowContainer>
    );
}
