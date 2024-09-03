'use client';

import WordleProvider from "./wordle-provider";
import Grid from "./grid";
import KeyPad from "./keypad";
import Modal from "./modal";

export default function GameBoard() {
    return (
        <WordleProvider>
            <Grid />
            <KeyPad />
            <Modal />
        </WordleProvider>
    );
}