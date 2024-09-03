'use client';

import WordleProvider from "./wordle-provider";
import Grid from "./grid";
import KeyPad from "./keypad";
import Modal from "./modal";
import ThemeProvider from "./theme-provider";

export default function GameBoard() {
    return (
        <ThemeProvider>
            <WordleProvider>
                <Grid />
                <KeyPad />
                <Modal />
            </WordleProvider>
        </ThemeProvider>
    );
}