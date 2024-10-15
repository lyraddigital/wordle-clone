import clsx from "clsx";

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
                    l.colour === 'grey' ? "grey" : null,
                    l.colour === 'green' ? "green" : null,
                    l.colour === 'yellow' ? "yellow" : null
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
