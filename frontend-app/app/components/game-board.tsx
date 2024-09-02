'use client';

import WordleProvider from "./wordle-provider";
import Grid from "./grid";
import KeyPad from "./keypad";

export default function GameBoard() {
    return (
        <WordleProvider>
            <Grid />
            <KeyPad />
        </WordleProvider>
    );
}