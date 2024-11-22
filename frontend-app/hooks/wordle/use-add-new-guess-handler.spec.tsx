jest.mock("@/hooks/statistics/use-statistics-updater");

import { PropsWithChildren, useState } from "react";
import { act, renderHook, screen } from "@testing-library/react";

import WordleContext, { WordleState } from "@/contexts/wordle-context";
import { GuessColour } from "@/lib/enums";
import { GuessLetterResult } from "@/lib/types";
import useStatisticsUpdater from "@/hooks/statistics/use-statistics-updater";

import useAddNewGuessHandler from "./use-add-new-guess-handler";

const createWrapperComponent = (
  defaultNumberOfTurns: number,
  defaultCurrentGuess: string,
  defaultIsGameOver: boolean,
  defaultGuesses: (GuessLetterResult[] | undefined)[],
  defaultHistory: string[],
  defaultIsCorrect: boolean,
  defaultUsedKeys: { [key: string]: GuessColour },
  defaultIsGuessAnimating: boolean,
  solution: string
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
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: GuessColour }>(defaultUsedKeys);
    const [isGuessAnimationFiring, setIsGuessAnimationFiring] = useState<boolean>(defaultIsGuessAnimating);
    const wordleState = {
      numberOfTurns,
      currentGuess,
      isGameOver,
      guesses,
      history,
      isCorrect,
      usedKeys,
      isGuessAnimationFiring,
      solution,
      setNumberOfTurns,
      setCurrentGuess,
      setIsGameOver,
      setGuesses,
      setHistory,
      setIsCorrect,
      setUsedKeys,
      setIsGuessAnimationFiring
    } as WordleState;

    return (
      <WordleContext.Provider value={wordleState}>
        {children}
        <div data-testid="number-of-turns">{numberOfTurns.toString()}</div>
        <div data-testid="current-guess">{currentGuess}</div>
        <div data-testid="is-game-over">{isGameOver.toString()}</div>
        <div data-testid="guesses">{JSON.stringify(guesses)}</div>
        <div data-testid="history">{JSON.stringify(history)}</div>
        <div data-testid="is-correct">{isCorrect.toString()}</div>
        <div data-testid="used-keys">{JSON.stringify(usedKeys)}</div>
        <div data-testid="is-guess-animation-firing">{isGuessAnimationFiring.toString()}</div>
        <div data-testid="solution">{solution}</div>
      </WordleContext.Provider>
    );
  };
};

describe("useAddNewGuessHandler", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("first turn and guess is not the solution, sets correct state", () => {
    // Arrange
    const numberOfTurns = 0;
    const currentGuess = "abecd";
    const isGameOver = false;
    const guesses: (GuessLetterResult[])[] = [];
    const history: string[] = [];
    const isCorrect = false;
    const usedKeys = {};
    const isGuessAnimating = false;
    const solution = "peach";
    const formattedGuess: GuessLetterResult[] = [
      {
        letter: "a",
        colour: GuessColour.yellow,
      },
      {
        letter: "b",
        colour: GuessColour.grey,
      },
      {
        letter: "e",
        colour: GuessColour.yellow,
      },
      {
        letter: "c",
        colour: GuessColour.green,
      },
      {
        letter: "d",
        colour: GuessColour.grey,
      },
    ];

    const wrapper = createWrapperComponent(
      numberOfTurns,
      currentGuess,
      isGameOver,
      guesses,
      history,
      isCorrect,
      usedKeys,
      isGuessAnimating,
      solution
    );
    const updateStatisticsByGameResultFn = jest.fn();

    (
      useStatisticsUpdater as jest.MockedFunction<typeof useStatisticsUpdater>
    ).mockImplementationOnce(() => updateStatisticsByGameResultFn);

    const newGuessHook = renderHook(() => useAddNewGuessHandler(), {
      wrapper
    });

    // Action
    act(() => {
      newGuessHook.result.current(formattedGuess);
    });

    const numberOfTurnsDiv = screen.getByTestId('number-of-turns');
    const currentGuessDiv = screen.getByTestId('current-guess');
    const isGameOverDiv = screen.getByTestId('is-game-over');
    const guessesDiv = screen.getByTestId('guesses');
    const historyDiv = screen.getByTestId('history');
    const isCorrectDiv = screen.getByTestId('is-correct');
    const usedKeysDiv = screen.getByTestId('used-keys');
    const isGuessAnimationFiringDiv = screen.getByTestId('is-guess-animation-firing');

    // Assert
    expect(numberOfTurnsDiv.textContent).toBe((1).toString());
    expect(currentGuessDiv.textContent).toBe('');
    expect(isGameOverDiv.textContent).toBe('false');
    expect(guessesDiv.textContent).toBe('[[{\"letter\":\"a\",\"colour\":\"yellow\"},{\"letter\":\"b\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"yellow\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"d\",\"colour\":\"grey\"}]]');
    expect(historyDiv.textContent).toBe('[\"abecd\"]');
    expect(isCorrectDiv.textContent).toBe('false');
    expect(usedKeysDiv.textContent).toBe('{\"a\":\"yellow\",\"b\":\"grey\",\"e\":\"yellow\",\"c\":\"green\",\"d\":\"grey\"}');
    expect(isGuessAnimationFiringDiv.textContent).toBe('true');

    act(() => {
      jest.runAllTimers();
    });

    expect(isGuessAnimationFiringDiv.textContent).toBe('false');
    expect(updateStatisticsByGameResultFn).not.toHaveBeenCalled();
  });

  it("second turn and guess is not the solution, sets correct state", () => {
    // Arrange
    const numberOfTurns = 1;
    const currentGuess = "death";
    const solution = "peach";
    const isGameOver = false;
    const currentGuesses: (GuessLetterResult[] | undefined)[] = [
      [
        { letter: "a", colour: GuessColour.yellow },
        { letter: "b", colour: GuessColour.grey },
        { letter: "e", colour: GuessColour.yellow },
        { letter: "c", colour: GuessColour.green },
        { letter: "d", colour: GuessColour.grey },
      ],
    ];
    const history: string[] = ['abecd'];
    const isCorrect = false;
    const usedKeys: { [key: string]: GuessColour } = {
      "a": GuessColour.yellow,
      "b": GuessColour.grey,
      "e": GuessColour.yellow,
      "c": GuessColour.green,
      "d": GuessColour.grey,
    };
    const isGuessAnimating = false;
    const formattedGuess: GuessLetterResult[] = [
      { letter: "d", colour: GuessColour.grey },
      { letter: "e", colour: GuessColour.green },
      { letter: "a", colour: GuessColour.green },
      { letter: "t", colour: GuessColour.grey },
      { letter: "h", colour: GuessColour.green },
    ];

    const wrapper = createWrapperComponent(
      numberOfTurns,
      currentGuess,
      isGameOver,
      currentGuesses,
      history,
      isCorrect,
      usedKeys,
      isGuessAnimating,
      solution
    );
    const updateStatisticsByGameResultFn = jest.fn();

    (
      useStatisticsUpdater as jest.MockedFunction<typeof useStatisticsUpdater>
    ).mockImplementationOnce(() => updateStatisticsByGameResultFn);

    const newGuessHook = renderHook(() => useAddNewGuessHandler(), {
      wrapper
    });

    // Action
    act(() => {
      newGuessHook.result.current(formattedGuess);
    });

    const numberOfTurnsDiv = screen.getByTestId('number-of-turns');
    const currentGuessDiv = screen.getByTestId('current-guess');
    const isGameOverDiv = screen.getByTestId('is-game-over');
    const guessesDiv = screen.getByTestId('guesses');
    const historyDiv = screen.getByTestId('history');
    const isCorrectDiv = screen.getByTestId('is-correct');
    const usedKeysDiv = screen.getByTestId('used-keys');
    const isGuessAnimationFiringDiv = screen.getByTestId('is-guess-animation-firing');

    // Assert
    expect(numberOfTurnsDiv.textContent).toBe((2).toString());
    expect(currentGuessDiv.textContent).toBe('');
    expect(isGameOverDiv.textContent).toBe('false');
    expect(guessesDiv.textContent).toBe('[[{\"letter\":\"a\",\"colour\":\"yellow\"},{\"letter\":\"b\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"yellow\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"d\",\"colour\":\"grey\"}],[{\"letter\":\"d\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"green\"},{\"letter\":\"a\",\"colour\":\"green\"},{\"letter\":\"t\",\"colour\":\"grey\"},{\"letter\":\"h\",\"colour\":\"green\"}]]');
    expect(historyDiv.textContent).toBe('[\"abecd\",\"death\"]');
    expect(isCorrectDiv.textContent).toBe('false');
    expect(usedKeysDiv.textContent).toBe('{\"a\":\"green\",\"b\":\"grey\",\"e\":\"green\",\"c\":\"green\",\"d\":\"grey\",\"t\":\"grey\",\"h\":\"green\"}');
    expect(isGuessAnimationFiringDiv.textContent).toBe('true');

    act(() => {
      jest.runAllTimers();
    });

    expect(isGuessAnimationFiringDiv.textContent).toBe('false');
    expect(updateStatisticsByGameResultFn).not.toHaveBeenCalled();
  });

  it("third turn and guess is not the solution, sets correct state", () => {
    // Arrange
    const numberOfTurns = 2;
    const currentGuess = "pizza";
    const solution = "peach";
    const isGameOver = false;
    const currentGuesses: (GuessLetterResult[] | undefined)[] = [
      [
        { letter: "a", colour: GuessColour.yellow },
        { letter: "b", colour: GuessColour.grey },
        { letter: "e", colour: GuessColour.yellow },
        { letter: "c", colour: GuessColour.green },
        { letter: "d", colour: GuessColour.grey },
      ],
      [
        { letter: "d", colour: GuessColour.grey },
        { letter: "e", colour: GuessColour.green },
        { letter: "a", colour: GuessColour.green },
        { letter: "t", colour: GuessColour.grey },
        { letter: "h", colour: GuessColour.green },
      ]
    ];
    const history: string[] = ['abecd', 'death'];
    const isCorrect = false;
    const usedKeys: { [key: string]: GuessColour } = {
      "a": GuessColour.green,
      "b": GuessColour.grey,
      "e": GuessColour.green,
      "c": GuessColour.green,
      "d": GuessColour.grey,
      "t": GuessColour.grey,
      "h": GuessColour.green,
    };
    const isGuessAnimating = false;
    const formattedGuess: GuessLetterResult[] = [
      { letter: "p", colour: GuessColour.green },
      { letter: "i", colour: GuessColour.grey },
      { letter: "z", colour: GuessColour.grey },
      { letter: "z", colour: GuessColour.grey },
      { letter: "a", colour: GuessColour.yellow },
    ];

    const wrapper = createWrapperComponent(
      numberOfTurns,
      currentGuess,
      isGameOver,
      currentGuesses,
      history,
      isCorrect,
      usedKeys,
      isGuessAnimating,
      solution
    );
    const updateStatisticsByGameResultFn = jest.fn();

    (
      useStatisticsUpdater as jest.MockedFunction<typeof useStatisticsUpdater>
    ).mockImplementationOnce(() => updateStatisticsByGameResultFn);

    const newGuessHook = renderHook(() => useAddNewGuessHandler(), {
      wrapper
    });

    // Action
    act(() => {
      newGuessHook.result.current(formattedGuess);
    });

    const numberOfTurnsDiv = screen.getByTestId('number-of-turns');
    const currentGuessDiv = screen.getByTestId('current-guess');
    const isGameOverDiv = screen.getByTestId('is-game-over');
    const guessesDiv = screen.getByTestId('guesses');
    const historyDiv = screen.getByTestId('history');
    const isCorrectDiv = screen.getByTestId('is-correct');
    const usedKeysDiv = screen.getByTestId('used-keys');
    const isGuessAnimationFiringDiv = screen.getByTestId('is-guess-animation-firing');

    // Assert
    expect(numberOfTurnsDiv.textContent).toBe((3).toString());
    expect(currentGuessDiv.textContent).toBe('');
    expect(isGameOverDiv.textContent).toBe('false');
    expect(guessesDiv.textContent).toBe('[[{\"letter\":\"a\",\"colour\":\"yellow\"},{\"letter\":\"b\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"yellow\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"d\",\"colour\":\"grey\"}],[{\"letter\":\"d\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"green\"},{\"letter\":\"a\",\"colour\":\"green\"},{\"letter\":\"t\",\"colour\":\"grey\"},{\"letter\":\"h\",\"colour\":\"green\"}],[{\"letter\":\"p\",\"colour\":\"green\"},{\"letter\":\"i\",\"colour\":\"grey\"},{\"letter\":\"z\",\"colour\":\"grey\"},{\"letter\":\"z\",\"colour\":\"grey\"},{\"letter\":\"a\",\"colour\":\"yellow\"}]]');
    expect(historyDiv.textContent).toBe('[\"abecd\",\"death\",\"pizza\"]');
    expect(isCorrectDiv.textContent).toBe('false');
    expect(usedKeysDiv.textContent).toBe('{\"a\":\"green\",\"b\":\"grey\",\"e\":\"green\",\"c\":\"green\",\"d\":\"grey\",\"t\":\"grey\",\"h\":\"green\",\"p\":\"green\",\"i\":\"grey\",\"z\":\"grey\"}');
    expect(isGuessAnimationFiringDiv.textContent).toBe('true');

    act(() => {
      jest.runAllTimers();
    });

    expect(isGuessAnimationFiringDiv.textContent).toBe('false');
    expect(updateStatisticsByGameResultFn).not.toHaveBeenCalled();
  });

  it("fourth turn and guess is not the solution, sets correct state", () => {
    // Arrange
    const numberOfTurns = 3;
    const currentGuess = "porch";
    const solution = "peach";
    const isGameOver = false;
    const currentGuesses: (GuessLetterResult[] | undefined)[] = [
      [
        { letter: "a", colour: GuessColour.yellow },
        { letter: "b", colour: GuessColour.grey },
        { letter: "e", colour: GuessColour.yellow },
        { letter: "c", colour: GuessColour.green },
        { letter: "d", colour: GuessColour.grey },
      ],
      [
        { letter: "d", colour: GuessColour.grey },
        { letter: "e", colour: GuessColour.green },
        { letter: "a", colour: GuessColour.green },
        { letter: "t", colour: GuessColour.grey },
        { letter: "h", colour: GuessColour.grey },
      ],
      [
        { letter: "p", colour: GuessColour.green },
        { letter: "i", colour: GuessColour.grey },
        { letter: "z", colour: GuessColour.grey },
        { letter: "z", colour: GuessColour.grey },
        { letter: "a", colour: GuessColour.yellow },
      ]
    ];
    const history: string[] = ['abecd', 'death', 'pizza'];
    const isCorrect = false;
    const usedKeys: { [key: string]: GuessColour } = {
      "a": GuessColour.green,
      "b": GuessColour.grey,
      "e": GuessColour.green,
      "c": GuessColour.green,
      "d": GuessColour.grey,
      "t": GuessColour.grey,
      "h": GuessColour.green,
      "i": GuessColour.grey,
      "p": GuessColour.green,
      "z": GuessColour.grey
    };
    const isGuessAnimating = false;
    const formattedGuess: GuessLetterResult[] = [
      { letter: "p", colour: GuessColour.green },
      { letter: "o", colour: GuessColour.grey },
      { letter: "r", colour: GuessColour.grey },
      { letter: "c", colour: GuessColour.green },
      { letter: "h", colour: GuessColour.green },
    ];

    const wrapper = createWrapperComponent(
      numberOfTurns,
      currentGuess,
      isGameOver,
      currentGuesses,
      history,
      isCorrect,
      usedKeys,
      isGuessAnimating,
      solution
    );
    const updateStatisticsByGameResultFn = jest.fn();

    (
      useStatisticsUpdater as jest.MockedFunction<typeof useStatisticsUpdater>
    ).mockImplementationOnce(() => updateStatisticsByGameResultFn);

    const newGuessHook = renderHook(() => useAddNewGuessHandler(), {
      wrapper
    });

    // Action
    act(() => {
      newGuessHook.result.current(formattedGuess);
    });

    const numberOfTurnsDiv = screen.getByTestId('number-of-turns');
    const currentGuessDiv = screen.getByTestId('current-guess');
    const isGameOverDiv = screen.getByTestId('is-game-over');
    const guessesDiv = screen.getByTestId('guesses');
    const historyDiv = screen.getByTestId('history');
    const isCorrectDiv = screen.getByTestId('is-correct');
    const usedKeysDiv = screen.getByTestId('used-keys');
    const isGuessAnimationFiringDiv = screen.getByTestId('is-guess-animation-firing');

    // Assert
    expect(numberOfTurnsDiv.textContent).toBe((4).toString());
    expect(currentGuessDiv.textContent).toBe('');
    expect(isGameOverDiv.textContent).toBe('false');
    expect(guessesDiv.textContent).toBe('[[{\"letter\":\"a\",\"colour\":\"yellow\"},{\"letter\":\"b\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"yellow\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"d\",\"colour\":\"grey\"}],[{\"letter\":\"d\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"green\"},{\"letter\":\"a\",\"colour\":\"green\"},{\"letter\":\"t\",\"colour\":\"grey\"},{\"letter\":\"h\",\"colour\":\"grey\"}],[{\"letter\":\"p\",\"colour\":\"green\"},{\"letter\":\"i\",\"colour\":\"grey\"},{\"letter\":\"z\",\"colour\":\"grey\"},{\"letter\":\"z\",\"colour\":\"grey\"},{\"letter\":\"a\",\"colour\":\"yellow\"}],[{\"letter\":\"p\",\"colour\":\"green\"},{\"letter\":\"o\",\"colour\":\"grey\"},{\"letter\":\"r\",\"colour\":\"grey\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"h\",\"colour\":\"green\"}]]');
    expect(historyDiv.textContent).toBe('[\"abecd\",\"death\",\"pizza\",\"porch\"]');
    expect(isCorrectDiv.textContent).toBe('false');
    expect(usedKeysDiv.textContent).toBe('{\"a\":\"green\",\"b\":\"grey\",\"e\":\"green\",\"c\":\"green\",\"d\":\"grey\",\"t\":\"grey\",\"h\":\"green\",\"i\":\"grey\",\"p\":\"green\",\"z\":\"grey\",\"o\":\"grey\",\"r\":\"grey\"}');
    expect(isGuessAnimationFiringDiv.textContent).toBe('true');

    act(() => {
      jest.runAllTimers();
    });

    expect(isGuessAnimationFiringDiv.textContent).toBe('false');
    expect(updateStatisticsByGameResultFn).not.toHaveBeenCalled();
  });

  it("fifth turn and guess is not the solution, sets correct state", () => {
    // Arrange
    const numberOfTurns = 4;
    const currentGuess = "perch";
    const solution = "peach";
    const isGameOver = false;
    const currentGuesses: (GuessLetterResult[] | undefined)[] = [
      [
        { letter: "a", colour: GuessColour.yellow },
        { letter: "b", colour: GuessColour.grey },
        { letter: "e", colour: GuessColour.yellow },
        { letter: "c", colour: GuessColour.green },
        { letter: "d", colour: GuessColour.grey },
      ],
      [
        { letter: "d", colour: GuessColour.grey },
        { letter: "e", colour: GuessColour.green },
        { letter: "a", colour: GuessColour.green },
        { letter: "t", colour: GuessColour.grey },
        { letter: "h", colour: GuessColour.grey },
      ],
      [
        { letter: "p", colour: GuessColour.green },
        { letter: "i", colour: GuessColour.grey },
        { letter: "z", colour: GuessColour.grey },
        { letter: "z", colour: GuessColour.grey },
        { letter: "a", colour: GuessColour.yellow },
      ],
      [
        { letter: "p", colour: GuessColour.green },
        { letter: "o", colour: GuessColour.grey },
        { letter: "r", colour: GuessColour.grey },
        { letter: "c", colour: GuessColour.green },
        { letter: "h", colour: GuessColour.green },
      ]
    ];
    const history: string[] = ['abecd', 'death', 'pizza', 'parch'];
    const isCorrect = false;
    const usedKeys: { [key: string]: GuessColour } = {
      "a": GuessColour.green,
      "b": GuessColour.grey,
      "e": GuessColour.green,
      "c": GuessColour.green,
      "d": GuessColour.grey,
      "t": GuessColour.grey,
      "h": GuessColour.green,
      "i": GuessColour.grey,
      "p": GuessColour.green,
      "z": GuessColour.grey,
      "r": GuessColour.grey
    };
    const isGuessAnimating = false;
    const formattedGuess: GuessLetterResult[] = [
      { letter: "p", colour: GuessColour.green },
      { letter: "a", colour: GuessColour.yellow },
      { letter: "r", colour: GuessColour.grey },
      { letter: "c", colour: GuessColour.green },
      { letter: "h", colour: GuessColour.green },
    ];

    const wrapper = createWrapperComponent(
      numberOfTurns,
      currentGuess,
      isGameOver,
      currentGuesses,
      history,
      isCorrect,
      usedKeys,
      isGuessAnimating,
      solution
    );
    const updateStatisticsByGameResultFn = jest.fn();

    (
      useStatisticsUpdater as jest.MockedFunction<typeof useStatisticsUpdater>
    ).mockImplementationOnce(() => updateStatisticsByGameResultFn);

    const newGuessHook = renderHook(() => useAddNewGuessHandler(), {
      wrapper
    });

    // Action
    act(() => {
      newGuessHook.result.current(formattedGuess);
    });

    const numberOfTurnsDiv = screen.getByTestId('number-of-turns');
    const currentGuessDiv = screen.getByTestId('current-guess');
    const isGameOverDiv = screen.getByTestId('is-game-over');
    const guessesDiv = screen.getByTestId('guesses');
    const historyDiv = screen.getByTestId('history');
    const isCorrectDiv = screen.getByTestId('is-correct');
    const usedKeysDiv = screen.getByTestId('used-keys');
    const isGuessAnimationFiringDiv = screen.getByTestId('is-guess-animation-firing');

    // Assert
    expect(numberOfTurnsDiv.textContent).toBe((5).toString());
    expect(currentGuessDiv.textContent).toBe('');
    expect(isGameOverDiv.textContent).toBe('false');
    expect(guessesDiv.textContent).toBe('[[{\"letter\":\"a\",\"colour\":\"yellow\"},{\"letter\":\"b\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"yellow\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"d\",\"colour\":\"grey\"}],[{\"letter\":\"d\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"green\"},{\"letter\":\"a\",\"colour\":\"green\"},{\"letter\":\"t\",\"colour\":\"grey\"},{\"letter\":\"h\",\"colour\":\"grey\"}],[{\"letter\":\"p\",\"colour\":\"green\"},{\"letter\":\"i\",\"colour\":\"grey\"},{\"letter\":\"z\",\"colour\":\"grey\"},{\"letter\":\"z\",\"colour\":\"grey\"},{\"letter\":\"a\",\"colour\":\"yellow\"}],[{\"letter\":\"p\",\"colour\":\"green\"},{\"letter\":\"o\",\"colour\":\"grey\"},{\"letter\":\"r\",\"colour\":\"grey\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"h\",\"colour\":\"green\"}],[{\"letter\":\"p\",\"colour\":\"green\"},{\"letter\":\"a\",\"colour\":\"yellow\"},{\"letter\":\"r\",\"colour\":\"grey\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"h\",\"colour\":\"green\"}]]');
    expect(historyDiv.textContent).toBe('[\"abecd\",\"death\",\"pizza\",\"parch\",\"perch\"]');
    expect(isCorrectDiv.textContent).toBe('false');
    expect(usedKeysDiv.textContent).toBe('{\"a\":\"green\",\"b\":\"grey\",\"e\":\"green\",\"c\":\"green\",\"d\":\"grey\",\"t\":\"grey\",\"h\":\"green\",\"i\":\"grey\",\"p\":\"green\",\"z\":\"grey\",\"r\":\"grey\"}');
    expect(isGuessAnimationFiringDiv.textContent).toBe('true');

    act(() => {
      jest.runAllTimers();
    });

    expect(isGuessAnimationFiringDiv.textContent).toBe('false');
    expect(updateStatisticsByGameResultFn).not.toHaveBeenCalled();
  });

  it("sixth turn and guess is not the solution, sets correct state", () => {
    // Arrange
    const numberOfTurns = 5;
    const currentGuess = "piece";
    const solution = "peach";
    const isGameOver = false;
    const currentGuesses: (GuessLetterResult[] | undefined)[] = [
      [
        { letter: "a", colour: GuessColour.yellow },
        { letter: "b", colour: GuessColour.grey },
        { letter: "e", colour: GuessColour.yellow },
        { letter: "c", colour: GuessColour.green },
        { letter: "d", colour: GuessColour.grey },
      ],
      [
        { letter: "d", colour: GuessColour.grey },
        { letter: "e", colour: GuessColour.green },
        { letter: "a", colour: GuessColour.green },
        { letter: "t", colour: GuessColour.grey },
        { letter: "h", colour: GuessColour.grey },
      ],
      [
        { letter: "p", colour: GuessColour.green },
        { letter: "i", colour: GuessColour.grey },
        { letter: "z", colour: GuessColour.grey },
        { letter: "z", colour: GuessColour.grey },
        { letter: "a", colour: GuessColour.yellow },
      ],
      [
        { letter: "p", colour: GuessColour.green },
        { letter: "o", colour: GuessColour.grey },
        { letter: "r", colour: GuessColour.grey },
        { letter: "c", colour: GuessColour.green },
        { letter: "h", colour: GuessColour.green },
      ],
      [
        { letter: "p", colour: GuessColour.green },
        { letter: "a", colour: GuessColour.yellow },
        { letter: "r", colour: GuessColour.grey },
        { letter: "c", colour: GuessColour.green },
        { letter: "h", colour: GuessColour.green },
      ],
      [
        { letter: "p", colour: GuessColour.green },
        { letter: "e", colour: GuessColour.yellow },
        { letter: "r", colour: GuessColour.grey },
        { letter: "c", colour: GuessColour.green },
        { letter: "h", colour: GuessColour.green },
      ]
    ];
    const history: string[] = ['abecd', 'death', 'pizza', 'parch', 'perch'];
    const isCorrect = false;
    const usedKeys: { [key: string]: GuessColour } = {
      "a": GuessColour.green,
      "b": GuessColour.grey,
      "e": GuessColour.green,
      "c": GuessColour.green,
      "d": GuessColour.grey,
      "t": GuessColour.grey,
      "h": GuessColour.green,
      "i": GuessColour.grey,
      "p": GuessColour.green,
      "z": GuessColour.grey,
      "r": GuessColour.grey
    };
    const isGuessAnimating = false;
    const formattedGuess: GuessLetterResult[] = [
      { letter: "p", colour: GuessColour.green },
      { letter: "i", colour: GuessColour.grey },
      { letter: "e", colour: GuessColour.yellow },
      { letter: "c", colour: GuessColour.green },
      { letter: "e", colour: GuessColour.yellow },
    ];

    const wrapper = createWrapperComponent(
      numberOfTurns,
      currentGuess,
      isGameOver,
      currentGuesses,
      history,
      isCorrect,
      usedKeys,
      isGuessAnimating,
      solution
    );
    const updateStatisticsByGameResultFn = jest.fn();

    (
      useStatisticsUpdater as jest.MockedFunction<typeof useStatisticsUpdater>
    ).mockImplementationOnce(() => updateStatisticsByGameResultFn);

    const newGuessHook = renderHook(() => useAddNewGuessHandler(), {
      wrapper
    });

    // Action
    act(() => {
      newGuessHook.result.current(formattedGuess);
    });

    const numberOfTurnsDiv = screen.getByTestId('number-of-turns');
    const currentGuessDiv = screen.getByTestId('current-guess');
    const isGameOverDiv = screen.getByTestId('is-game-over');
    const guessesDiv = screen.getByTestId('guesses');
    const historyDiv = screen.getByTestId('history');
    const isCorrectDiv = screen.getByTestId('is-correct');
    const usedKeysDiv = screen.getByTestId('used-keys');
    const isGuessAnimationFiringDiv = screen.getByTestId('is-guess-animation-firing');

    // Assert
    expect(numberOfTurnsDiv.textContent).toBe((6).toString());
    expect(currentGuessDiv.textContent).toBe('');
    expect(isGameOverDiv.textContent).toBe('true');
    expect(guessesDiv.textContent).toBe('[[{\"letter\":\"a\",\"colour\":\"yellow\"},{\"letter\":\"b\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"yellow\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"d\",\"colour\":\"grey\"}],[{\"letter\":\"d\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"green\"},{\"letter\":\"a\",\"colour\":\"green\"},{\"letter\":\"t\",\"colour\":\"grey\"},{\"letter\":\"h\",\"colour\":\"grey\"}],[{\"letter\":\"p\",\"colour\":\"green\"},{\"letter\":\"i\",\"colour\":\"grey\"},{\"letter\":\"z\",\"colour\":\"grey\"},{\"letter\":\"z\",\"colour\":\"grey\"},{\"letter\":\"a\",\"colour\":\"yellow\"}],[{\"letter\":\"p\",\"colour\":\"green\"},{\"letter\":\"o\",\"colour\":\"grey\"},{\"letter\":\"r\",\"colour\":\"grey\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"h\",\"colour\":\"green\"}],[{\"letter\":\"p\",\"colour\":\"green\"},{\"letter\":\"a\",\"colour\":\"yellow\"},{\"letter\":\"r\",\"colour\":\"grey\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"h\",\"colour\":\"green\"}],[{\"letter\":\"p\",\"colour\":\"green\"},{\"letter\":\"i\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"yellow\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"e\",\"colour\":\"yellow\"}]]');
    expect(historyDiv.textContent).toBe('[\"abecd\",\"death\",\"pizza\",\"parch\",\"perch\",\"piece\"]');
    expect(isCorrectDiv.textContent).toBe('false');
    expect(usedKeysDiv.textContent).toBe('{\"a\":\"green\",\"b\":\"grey\",\"e\":\"green\",\"c\":\"green\",\"d\":\"grey\",\"t\":\"grey\",\"h\":\"green\",\"i\":\"grey\",\"p\":\"green\",\"z\":\"grey\",\"r\":\"grey\"}');
    expect(isGuessAnimationFiringDiv.textContent).toBe('false');
    expect(updateStatisticsByGameResultFn).toHaveBeenCalledWith(false);
  });

  it("guess is the solution, calls correct wordle dispatchers", () => {
    // Arrange
    const numberOfTurns = 1;
    const currentGuess = "peach";
    const solution = "peach";
    const isGameOver = false;
    const currentGuesses: (GuessLetterResult[] | undefined)[] = [
      [
        { letter: "a", colour: GuessColour.yellow },
        { letter: "b", colour: GuessColour.grey },
        { letter: "e", colour: GuessColour.yellow },
        { letter: "c", colour: GuessColour.green },
        { letter: "d", colour: GuessColour.grey },
      ],
    ];
    const history: string[] = ['abecd'];
    const isCorrect = false;
    const usedKeys: { [key: string]: GuessColour } = {
      "a": GuessColour.yellow,
      "b": GuessColour.grey,
      "e": GuessColour.yellow,
      "c": GuessColour.green,
      "d": GuessColour.grey,
    };
    const isGuessAnimating = false;
    const formattedGuess: GuessLetterResult[] = [
      { letter: "p", colour: GuessColour.green },
      { letter: "e", colour: GuessColour.green },
      { letter: "a", colour: GuessColour.green },
      { letter: "c", colour: GuessColour.green },
      { letter: "h", colour: GuessColour.green },
    ];

    const wrapper = createWrapperComponent(
      numberOfTurns,
      currentGuess,
      isGameOver,
      currentGuesses,
      history,
      isCorrect,
      usedKeys,
      isGuessAnimating,
      solution
    );
    const updateStatisticsByGameResultFn = jest.fn();

    (
      useStatisticsUpdater as jest.MockedFunction<typeof useStatisticsUpdater>
    ).mockImplementationOnce(() => updateStatisticsByGameResultFn);

    const newGuessHook = renderHook(() => useAddNewGuessHandler(), {
      wrapper
    });

    // Action
    act(() => {
      newGuessHook.result.current(formattedGuess);
    });

    const numberOfTurnsDiv = screen.getByTestId('number-of-turns');
    const currentGuessDiv = screen.getByTestId('current-guess');
    const isGameOverDiv = screen.getByTestId('is-game-over');
    const guessesDiv = screen.getByTestId('guesses');
    const historyDiv = screen.getByTestId('history');
    const isCorrectDiv = screen.getByTestId('is-correct');
    const usedKeysDiv = screen.getByTestId('used-keys');
    const isGuessAnimationFiringDiv = screen.getByTestId('is-guess-animation-firing');

    // Assert
    expect(numberOfTurnsDiv.textContent).toBe((2).toString());
    expect(currentGuessDiv.textContent).toBe('');
    expect(isGameOverDiv.textContent).toBe('true');
    expect(guessesDiv.textContent).toBe('[[{\"letter\":\"a\",\"colour\":\"yellow\"},{\"letter\":\"b\",\"colour\":\"grey\"},{\"letter\":\"e\",\"colour\":\"yellow\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"d\",\"colour\":\"grey\"}],[{\"letter\":\"p\",\"colour\":\"green\"},{\"letter\":\"e\",\"colour\":\"green\"},{\"letter\":\"a\",\"colour\":\"green\"},{\"letter\":\"c\",\"colour\":\"green\"},{\"letter\":\"h\",\"colour\":\"green\"}]]');
    expect(historyDiv.textContent).toBe('[\"abecd\",\"peach\"]');
    expect(isCorrectDiv.textContent).toBe('true');
    expect(usedKeysDiv.textContent).toBe('{\"a\":\"green\",\"b\":\"grey\",\"e\":\"green\",\"c\":\"green\",\"d\":\"grey\",\"p\":\"green\",\"h\":\"green\"}');
    expect(isGuessAnimationFiringDiv.textContent).toBe('false');
    expect(updateStatisticsByGameResultFn).toHaveBeenCalledWith(true, 1);
  });
});
