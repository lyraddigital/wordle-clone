import { useContext } from "react";
import { renderHook } from "@testing-library/react";

import WordleContext, { WordleState } from "./wordle-context";

describe("WordleContext", () => {
    it("should have all state fields set to undefined by default", () => {
        // Arrange / Action
        const { result } = renderHook(() => useContext(WordleContext));
        const wordleState: WordleState = result.current;

        // Assert
        expect(wordleState).toBeDefined();
        expect(wordleState.currentGuess).toBeUndefined();
        expect(wordleState.guesses).toBeUndefined();
        expect(wordleState.history).toBeUndefined();
        expect(wordleState.isCorrect).toBeUndefined();
        expect(wordleState.isCurrentGuessIncorrect).toBeUndefined();
        expect(wordleState.isGameOver).toBeUndefined();
        expect(wordleState.isGuessAnimationFiring).toBeUndefined();
        expect(wordleState.numberOfTurns).toBeUndefined();
        expect(wordleState.setCurrentGuess).toBeUndefined();
        expect(wordleState.setGuesses).toBeUndefined();
        expect(wordleState.setHistory).toBeUndefined();
        expect(wordleState.setIsCorrect).toBeUndefined();
        expect(wordleState.setIsCurrentGuessIncorrect).toBeUndefined();
        expect(wordleState.setIsGameOver).toBeUndefined();
        expect(wordleState.setIsGuessAnimationFiring).toBeUndefined();
        expect(wordleState.setNumberOfTurns).toBeUndefined();
    });
});