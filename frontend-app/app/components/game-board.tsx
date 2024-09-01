'use client';

import WordleProvider from "./wordle-provider";
import Grid from "./grid";

export default function GameBoard() {
    return (
        <WordleProvider>
            <Grid />
        </WordleProvider>
    );
}