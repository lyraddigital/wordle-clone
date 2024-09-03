import { PropsWithChildren, useState } from "react";

import WordleContext, { WordleState } from "../context/wordle-context";
import getRandomWord from "../data/words";

const randomWord = getRandomWord();

export default function WordleProvider({ children }: PropsWithChildren) {
    const [solution, setSolution] = useState<string>(randomWord);
    const [numberOfTurns, setNumberOfTurns] = useState<number>(0);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [guesses, setGuesses] = useState<({ key: string, colour: string }[] | undefined)[]>([...Array(6)]); // each guess is an array
    const [history, setHistory] = useState<string[]>([]); // each guess is a string
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: string }>({});
    const [isCurrentGuessIncorrect, setIsCurrentGuessIncorrect] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    const wordleState: WordleState = {
        solution,
        numberOfTurns,
        currentGuess,
        guesses,
        history,
        isCorrect,
        usedKeys,
        isCurrentGuessIncorrect,
        isGameOver,
        setSolution,
        setNumberOfTurns,
        setCurrentGuess,
        setGuesses,
        setHistory,
        setIsCorrect,
        setUsedKeys,
        setIsCurrentGuessIncorrect,
        setIsGameOver
    };

    return (
        <WordleContext.Provider value={wordleState}>
            {children}
        </WordleContext.Provider>
    );
}