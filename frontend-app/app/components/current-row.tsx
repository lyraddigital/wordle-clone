import useCurrentGuess from "../hooks/use-current-guess";

import RowContainer from "./row-container";
import Tile from "./tile";

export default function CurrentRow() {
    const currentGuess = useCurrentGuess();
    const letters = currentGuess.split("");

    return (
        <RowContainer classes="current">
            {letters.map((letter, i) => (
                <Tile key={i} classes="filled">
                    {letter}
                </Tile>
            ))}
            {[...Array(5 - letters.length)].map((_, i) => (
                <Tile key={i} classes="border-neutral-700" />
            ))}
        </RowContainer>
    );
}
