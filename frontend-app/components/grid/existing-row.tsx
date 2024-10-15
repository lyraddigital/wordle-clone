import clsx from "clsx";

import { GuessColour } from "@/lib/enums";
import { GuessLetterResult } from "@/lib/types";
import RowContainer from "@/components/grid/row-container";
import Tile from "@/components/grid/tile";

export type ExistingRowProps = {
    guess: GuessLetterResult[];
}

export default function ExistingRow({ guess }: ExistingRowProps) {
    return (
        <RowContainer classes="validated">
            {guess.map((l, i) => {
                const filledTileClasses = clsx(
                    l.colour === GuessColour.grey ? "grey" : null,
                    l.colour === GuessColour.green ? "green" : null,
                    l.colour === GuessColour.yellow ? "yellow" : null
                );

                return (
                    <Tile key={i} classes={filledTileClasses}>
                        {l.letter}
                    </Tile>
                );
            })}
        </RowContainer>
    );
}
