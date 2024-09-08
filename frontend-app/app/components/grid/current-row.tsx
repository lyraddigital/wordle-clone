import clsx from "clsx";

import useWordle from "../../hooks/use-wordle";

import RowContainer from "./row-container";
import Tile from "./tile";

export default function CurrentRow() {
    const { currentGuess, isCurrentGuessIncorrect } = useWordle();
    const filledClasses = clsx(
        " ",
        isCurrentGuessIncorrect ? "incorrect" : undefined
    );
    const unfilledClasses = clsx(
        "border-neutral-300 dark:border-neutral-700",
        isCurrentGuessIncorrect ? "incorrect" : undefined
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
