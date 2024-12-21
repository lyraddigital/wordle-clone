import { createContext, Dispatch, SetStateAction } from "react";

import { GuessColour } from "@/lib/enums";
import { GuessLetterResult } from "@/lib/types";

export type WordleState = {
  numberOfTurns: number;
  currentGuess: string;
  guesses: (GuessLetterResult[] | undefined)[];
  usedKeys: { [key: string]: string };
  isCurrentGuessIncorrect: boolean;
  isGameOver: boolean;
  isGuessAnimationFiring: boolean;
  setNumberOfTurns: Dispatch<SetStateAction<number>>;
  setCurrentGuess: Dispatch<SetStateAction<string>>;
  setGuesses: Dispatch<SetStateAction<(GuessLetterResult[] | undefined)[]>>;
  setUsedKeys: Dispatch<SetStateAction<{ [key: string]: GuessColour }>>;
  setIsCurrentGuessIncorrect: Dispatch<SetStateAction<boolean>>;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
  setIsGuessAnimationFiring: Dispatch<SetStateAction<boolean>>;
};

const WordleContext = createContext<WordleState>({} as WordleState);

export default WordleContext;
