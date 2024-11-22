import { PropsWithChildren, useState } from "react";

import { GuessColour } from "@/lib/enums";
import { GuessLetterResult } from "@/lib/types";
import WordleContext, { WordleState } from "@/contexts/wordle-context";
import getRandomWord from "@/data/words";

export default function WordleProvider({ children }: PropsWithChildren) {
    const [solution, setSolution] = useState<string>(getRandomWord());
    const [numberOfTurns, setNumberOfTurns] = useState<number>(0);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [guesses, setGuesses] = useState<(GuessLetterResult[] | undefined)[]>([...Array(6)]); // each guess is an array
    const [history, setHistory] = useState<string[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: GuessColour }>({});
    const [isCurrentGuessIncorrect, setIsCurrentGuessIncorrect] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isGuessAnimationFiring, setIsGuessAnimationFiring] = useState<boolean>(false);

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
        isGuessAnimationFiring,
        setSolution,
        setNumberOfTurns,
        setCurrentGuess,
        setGuesses,
        setHistory,
        setIsCorrect,
        setUsedKeys,
        setIsCurrentGuessIncorrect,
        setIsGameOver,
        setIsGuessAnimationFiring
    };

    return (
        <WordleContext.Provider value={wordleState}>
            {children}
        </WordleContext.Provider>
    );
}