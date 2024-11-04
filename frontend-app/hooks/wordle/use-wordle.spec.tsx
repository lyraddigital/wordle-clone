import { PropsWithChildren, useState } from "react";
import { act, renderHook, screen } from "@testing-library/react";

import WordleContext, { WordleState } from "@/contexts/wordle-context";
import { GuessLetterResult } from "@/lib/types";
import { GuessColour } from "@/lib/enums";

import useWordle from "./use-wordle";

const createWrapperComponent = (
  defaultNumberOfTurns: number,
  defaultCurrentGuess: string,
  defaultIsGameOver: boolean,
  defaultGuesses: (GuessLetterResult[] | undefined)[],
  defaultHistory: string[],
  defaultIsCorrect: boolean,
  defaultIsCurrentGuessIncorrect: boolean,
  defaultUsedKeys: { [key: string]: GuessColour },
  defaultIsGuessAnimating: boolean,
  defaultSolution: string
): React.FC<PropsWithChildren> => {
  return function WrapperComponent({
    children,
  }: PropsWithChildren): React.ReactNode {
    const [numberOfTurns, setNumberOfTurns] = useState<number>(defaultNumberOfTurns);
    const [currentGuess, setCurrentGuess] = useState<string>(defaultCurrentGuess);
    const [isGameOver, setIsGameOver] = useState<boolean>(defaultIsGameOver);
    const [guesses, setGuesses] = useState<(GuessLetterResult[] | undefined)[]>(defaultGuesses);
    const [history, setHistory] = useState<string[]>(defaultHistory);
    const [isCorrect, setIsCorrect] = useState<boolean>(defaultIsCorrect);
    const [isCurrentGuessIncorrect, setIsCurrentGuessIncorrect] = useState<boolean>(defaultIsCurrentGuessIncorrect);
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: GuessColour }>(defaultUsedKeys);
    const [isGuessAnimationFiring, setIsGuessAnimationFiring] = useState<boolean>(defaultIsGuessAnimating);
    const [solution, setSolution] = useState<string>(defaultSolution);
    const wordleState: WordleState = {
      numberOfTurns,
      currentGuess,
      isGameOver,
      guesses,
      history,
      isCorrect,
      isCurrentGuessIncorrect,
      usedKeys,
      isGuessAnimationFiring,
      solution,
      setNumberOfTurns,
      setCurrentGuess,
      setIsGameOver,
      setGuesses,
      setHistory,
      setIsCorrect,
      setIsCurrentGuessIncorrect,
      setUsedKeys,
      setIsGuessAnimationFiring,
      setSolution
    };

    return (
      <WordleContext.Provider value={wordleState}>
        {children}
        <div data-testid="number-of-turns">{numberOfTurns.toString()}</div>
        <div data-testid="current-guess">{currentGuess}</div>
        <div data-testid="is-game-over">{isGameOver.toString()}</div>
        <div data-testid="guesses">{JSON.stringify(guesses)}</div>
        <div data-testid="history">{JSON.stringify(history)}</div>
        <div data-testid="is-correct">{isCorrect.toString()}</div>
        <div data-testid="is-current-guess-incorrect">{isCurrentGuessIncorrect.toString()}</div>        
        <div data-testid="used-keys">{JSON.stringify(usedKeys)}</div>
        <div data-testid="is-guess-animation-firing">{isGuessAnimationFiring.toString()}</div>
        <div data-testid="solution">{solution}</div>
      </WordleContext.Provider>
    );
  };
};

describe("useWordle", () => {
  it("All Wordle context data is returned from the hook correctly and all state is set correctly", () => {
    // Arrange
    const numberOfTurns = 0;
    const currentGuess = "abecd";
    const isGameOver = false;
    const guesses: (GuessLetterResult[])[] = [];
    const history: string[] = [];
    const isCorrect = false;
    const isCurrentGuessIncorrect = false;
    const usedKeys = {};
    const isGuessAnimationFiring = false;
    const solution = "peach";

    const wrapper = createWrapperComponent(
      numberOfTurns,
      currentGuess,
      isGameOver,
      guesses,
      history,
      isCorrect,
      isCurrentGuessIncorrect,
      usedKeys,
      isGuessAnimationFiring,
      solution
    );

    // Action
    const { result } = renderHook(() => useWordle(), { wrapper });    

    // Assert
    const {
      numberOfTurns: actualNumberOfTurns,
      currentGuess: actualCurrentGuess,
      isGameOver: actualIsGameOver,
      guesses: actualGuesses,
      history: actualHistory,
      isCorrect: actualIsCorrect,
      isCurrentGuessIncorrect: actualIsCurrentGuessIncorrect,
      usedKeys: actualUsedKeys,
      isGuessAnimationFiring: actualIsGuessAnimationFiring,
      solution: actualSolution,
    } = result.current;

    const numberOfTurnsDiv = screen.getByTestId('number-of-turns');
    const currentGuessDiv = screen.getByTestId('current-guess');
    const isGameOverDiv = screen.getByTestId('is-game-over');
    const isCurrentGuessIncorrectDiv = screen.getByTestId('is-current-guess-incorrect');
    const guessesDiv = screen.getByTestId('guesses');
    const historyDiv = screen.getByTestId('history');
    const isCorrectDiv = screen.getByTestId('is-correct');
    const usedKeysDiv = screen.getByTestId('used-keys');
    const isGuessAnimationFiringDiv = screen.getByTestId('is-guess-animation-firing');
    const solutionDiv = screen.getByTestId('solution');

    expect(actualNumberOfTurns).toBe(numberOfTurns);
    expect(actualCurrentGuess).toBe(currentGuess);
    expect(actualIsGameOver).toBe(isGameOver);
    expect(actualGuesses).toStrictEqual(guesses);
    expect(actualHistory).toStrictEqual(history);
    expect(actualIsCorrect).toBe(isCorrect);
    expect(actualIsCurrentGuessIncorrect).toBe(isCurrentGuessIncorrect);
    expect(actualUsedKeys).toStrictEqual(usedKeys);
    expect(actualIsGuessAnimationFiring).toBe(isGuessAnimationFiring);
    expect(actualSolution).toBe(solution);

    expect(numberOfTurnsDiv.textContent).toBe((numberOfTurns).toString());
    expect(currentGuessDiv.textContent).toBe(currentGuess);
    expect(isGameOverDiv.textContent).toBe(isGameOver.toString());
    expect(isCurrentGuessIncorrectDiv.textContent).toBe(isCurrentGuessIncorrect.toString());
    expect(guessesDiv.textContent).toBe(JSON.stringify(guesses));
    expect(historyDiv.textContent).toBe(JSON.stringify(history));
    expect(isCorrectDiv.textContent).toBe(isCorrect.toString());
    expect(usedKeysDiv.textContent).toBe(JSON.stringify(usedKeys));
    expect(isGuessAnimationFiringDiv.textContent).toBe(isGuessAnimationFiring.toString());
    expect(solutionDiv.textContent).toBe(solution);
  });

  it("All Wordle context data is returned from the hook correctly and all state is set correctly after calling dispatchers", () => {
    // Arrange
    const numberOfTurns = 0;
    const currentGuess = "abecd";
    const isGameOver = false;
    const guesses: (GuessLetterResult[])[] = [];
    const history: string[] = [];
    const isCorrect = false;
    const isCurrentGuessIncorrect = false;
    const usedKeys = {};
    const isGuessAnimationFiring = false;
    const solution = "peach";

    const wrapper = createWrapperComponent(
      numberOfTurns,
      currentGuess,
      isGameOver,
      guesses,
      history,
      isCorrect,
      isCurrentGuessIncorrect,
      usedKeys,
      isGuessAnimationFiring,
      solution
    );
    
    const { result } = renderHook(() => useWordle(), { wrapper });    

    const {
      setNumberOfTurns,
      setCurrentGuess,
      setIsGameOver,
      setGuesses,
      setHistory,
      setIsCorrect,
      setIsCurrentGuessIncorrect,
      setUsedKeys,
      setIsGuessAnimationFiring,
      setSolution
    } = result.current;

    // Action
    act(() => {
      setNumberOfTurns(1);
      setCurrentGuess('peach');
      setIsGameOver(true);
      setGuesses([
        [
          { letter: 'a', colour: GuessColour.yellow },
          { letter: 'b', colour: GuessColour.grey },
          { letter: 'e', colour: GuessColour.yellow },
          { letter: 'c', colour: GuessColour.green },
          { letter: 'd', colour: GuessColour.grey }
        ]
      ]);
      setHistory(['abecd']);
      setIsCorrect(true);
      setIsCurrentGuessIncorrect(true);
      setUsedKeys({
        'a': GuessColour.yellow,
        'b': GuessColour.grey,
        'e': GuessColour.yellow,
        'c': GuessColour.green,
        'd': GuessColour.grey
      });
      setIsGuessAnimationFiring(true);
      setSolution('newsl');
    });

    const {
      numberOfTurns: newNumberOfTurns,
      currentGuess: newCurrentGuess,
      isGameOver: newGameOver,
      guesses: newGuesses,
      history: newHistory,
      isCorrect: newIsCorrect,
      isCurrentGuessIncorrect: newIsCurrentGuessIncorrect,
      usedKeys: newUsedKeys,
      isGuessAnimationFiring: newIsGuessAnimationFiring,
      solution: newSolution
    } = result.current;

    const numberOfTurnsDiv = screen.getByTestId('number-of-turns');
    const currentGuessDiv = screen.getByTestId('current-guess');
    const isGameOverDiv = screen.getByTestId('is-game-over');
    const guessesDiv = screen.getByTestId('guesses');
    const historyDiv = screen.getByTestId('history');
    const isCorrectDiv = screen.getByTestId('is-correct');
    const isCurrentGuessIncorrectDiv = screen.getByTestId('is-current-guess-incorrect');
    const usedKeysDiv = screen.getByTestId('used-keys');
    const isGuessAnimationFiringDiv = screen.getByTestId('is-guess-animation-firing');
    const solutionDiv = screen.getByTestId('solution');

    expect(newNumberOfTurns).toBe(1);
    expect(newCurrentGuess).toBe('peach');
    expect(newGameOver).toBe(true);
    expect(newGuesses).toStrictEqual(
      [
        [
          { letter: 'a', colour: GuessColour.yellow },
          { letter: 'b', colour: GuessColour.grey },
          { letter: 'e', colour: GuessColour.yellow },
          { letter: 'c', colour: GuessColour.green },
          { letter: 'd', colour: GuessColour.grey }
        ]
      ]
    );
    expect(newHistory).toStrictEqual(['abecd']);
    expect(newIsCorrect).toBe(true);
    expect(newIsCurrentGuessIncorrect).toBe(true);
    expect(newUsedKeys).toStrictEqual({
      'a': GuessColour.yellow,
      'b': GuessColour.grey,
      'e': GuessColour.yellow,
      'c': GuessColour.green,
      'd': GuessColour.grey
    });
    expect(newIsGuessAnimationFiring).toBe(true);
    expect(newSolution).toBe('newsl');

    expect(numberOfTurnsDiv.textContent).toBe((newNumberOfTurns).toString());
    expect(currentGuessDiv.textContent).toBe(newCurrentGuess);
    expect(isGameOverDiv.textContent).toBe(newGameOver.toString());
    expect(guessesDiv.textContent).toBe(JSON.stringify(newGuesses));
    expect(historyDiv.textContent).toBe(JSON.stringify(newHistory));
    expect(isCorrectDiv.textContent).toBe(newIsCorrect.toString());
    expect(isCurrentGuessIncorrectDiv.textContent).toBe(newIsCurrentGuessIncorrect.toString());
    expect(usedKeysDiv.textContent).toBe(JSON.stringify(newUsedKeys));
    expect(isGuessAnimationFiringDiv.textContent).toBe(newIsGuessAnimationFiring.toString());
    expect(solutionDiv.textContent).toBe(newSolution);
  });
});
