'use client';

import WordleProvider from "./providers/wordle-provider";
import Grid from "./grid/grid";
import KeyPad from "./key-pad/keypad";
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