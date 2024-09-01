import { PropsWithChildren, useState } from "react";

import WordleContext from "../context/wordle-context";

export default function WordleProvider({ children }: PropsWithChildren) {
    const [solution, setSolution] = useState<string>("daryl");
    const [numberOfTurns, setNumberOfTurns] = useState<number>(0);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [guesses, setGuesses] = useState<({ key: string, colour: string }[] | undefined)[]>([...Array(6)]); // each guess is an array
    const [history, setHistory] = useState<string[]>([]); // each guess is a string
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: string }>({});

    const wordleState = {
        solution,
        numberOfTurns,
        currentGuess,
        guesses,
        history,
        isCorrect,
        usedKeys,
        setSolution,
        setNumberOfTurns,
        setCurrentGuess,
        setGuesses,
        setHistory,
        setIsCorrect,
        setUsedKeys
    };

    return (
        <WordleContext.Provider value={wordleState}>
            {children}
        </WordleContext.Provider>
    );
}