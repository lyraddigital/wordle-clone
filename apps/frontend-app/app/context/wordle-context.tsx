import { createContext, Dispatch, SetStateAction } from "react";

export interface WordleState {
    solution: string;
    numberOfTurns: number;
    currentGuess: string;
    guesses: ({ key: string, colour: string }[] | undefined)[];
    history: string[];
    isCorrect: boolean;
    usedKeys: { [key: string]: string };
    setSolution: Dispatch<SetStateAction<string>>;
    setNumberOfTurns: Dispatch<SetStateAction<number>>;
    setCurrentGuess: Dispatch<SetStateAction<string>>;
    setGuesses: Dispatch<SetStateAction<({ key: string, colour: string }[] | undefined)[]>>;
    setHistory: Dispatch<SetStateAction<string[]>>;
    setIsCorrect: Dispatch<SetStateAction<boolean>>;
    setUsedKeys: Dispatch<SetStateAction<{ [key: string]: string }>>;
}

const WordleContext = createContext<WordleState>({} as WordleState);

export default WordleContext;