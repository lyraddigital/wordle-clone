import { PropsWithChildren, useState } from "react";

import { GuessColour } from "@/lib/enums";
import { GuessLetterResult } from "@/lib/types";
import WordleContext, { WordleState } from "@/contexts/wordle-context";

export default function WordleProvider({ children }: PropsWithChildren) {
    const [numberOfTurns, setNumberOfTurns] = useState<number>(0);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [guesses, setGuesses] = useState<(GuessLetterResult[] | undefined)[]>([...Array(6)]); // each guess is an array    
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: GuessColour }>({});
    const [isCurrentGuessIncorrect, setIsCurrentGuessIncorrect] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isGuessAnimationFiring, setIsGuessAnimationFiring] = useState<boolean>(false);

    const wordleState: WordleState = {
        numberOfTurns,
        currentGuess,
        guesses,
        usedKeys,
        isCurrentGuessIncorrect,
        isGameOver,
        isGuessAnimationFiring,
        setNumberOfTurns,
        setCurrentGuess,
        setGuesses,
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