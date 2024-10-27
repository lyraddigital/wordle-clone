jest.mock("react-hot-toast");
jest.mock("@/data/words");
jest.mock("@/hooks/wordle/use-guess-formatter")
jest.mock("@/hooks/wordle/use-add-new-guess-handler");

import { renderHook, screen } from "@testing-library/react";
import { act, PropsWithChildren, useState } from "react";
import { toast } from "react-hot-toast";

import ModalsContext, { ModalsState } from "@/contexts/modals-context";
import WordleContext, { WordleState } from "@/contexts/wordle-context";
import { wordExists } from "@/data/words";
import useGuessFormatter from "@/hooks/wordle/use-guess-formatter";
import useAddNewGuessHandler from "@/hooks/wordle/use-add-new-guess-handler";
import { GuessColour } from "@/lib/enums";
import { GuessLetterResult } from "@/lib/types";

import useEnterBinding from "./use-enter-binding";

const createWrapperComponent = (
  defaultCurrentGuess: string,
  defaultGuesses: (GuessLetterResult[] | undefined)[],
  defaultHistory: string[],
  defaultIsCorrect: boolean,
  defaultIsCurrentGuessIncorrect: boolean,
  defaultIsGameOver: boolean,
  defaultIsGuessAnimationFiring: boolean,
  defaultNumberOfTurns: number,
  defaultShowStatisticsModal: boolean,
  defaultShowHelpModal: boolean,
  defaultSolution: string
): React.FC<PropsWithChildren> => {
  return function WrapperComponent({ children }: PropsWithChildren): React.ReactNode {
    const [currentGuess, setCurrentGuess] = useState<string>(defaultCurrentGuess);
    const [guesses, setGuesses] = useState<(GuessLetterResult[] | undefined)[]>(defaultGuesses);
    const [history, setHistory] = useState<string[]>(defaultHistory);
    const [isCorrect, setIsCorrect] = useState<boolean>(defaultIsCorrect);
    const [isCurrentGuessIncorrect, setIsCurrentGuessIncorrect] = useState<boolean>(defaultIsCurrentGuessIncorrect);
    const [isGameOver, setIsGameOver] = useState<boolean>(defaultIsGameOver);
    const [isGuessAnimationFiring, setIsGuessAnimationFiring] = useState<boolean>(defaultIsGuessAnimationFiring);
    const [numberOfTurns, setNumberOfTurns] = useState<number>(defaultNumberOfTurns);
    const [showStatisticsModal] = useState<boolean>(defaultShowStatisticsModal);
    const [showHelpModal] = useState<boolean>(defaultShowHelpModal);
    const [solution] = useState<string>(defaultSolution);

    const wordleState = {
      currentGuess,
      guesses,
      history,
      isCorrect,
      isCurrentGuessIncorrect,
      isGameOver,
      isGuessAnimationFiring,
      numberOfTurns,
      solution,
      setCurrentGuess,
      setGuesses,
      setHistory,
      setIsCorrect,
      setIsCurrentGuessIncorrect,
      setIsGameOver,
      setIsGuessAnimationFiring,
      setNumberOfTurns
    } as WordleState;
    const modalState = {
      showStatisticsModal,
      showHelpModal
    } as ModalsState;

    return (
      <WordleContext.Provider value={wordleState}>
        <ModalsContext.Provider value={modalState}>
          {children}
          <div data-testid="current-guess">{currentGuess}</div>
          <div data-testid="guesses">{JSON.stringify(guesses)}</div>
          <div data-testid="history">{JSON.stringify(history)}</div>
          <div data-testid="is-correct">{isCorrect.toString()}</div>
          <div data-testid="is-current-guess-incorrect">{isCurrentGuessIncorrect.toString()}</div>
          <div data-testid="is-game-over">{isGameOver.toString()}</div>
          <div data-testid="is-guess-animation-firing">{isGuessAnimationFiring.toString()}</div>
          <div data-testid="number-of-turns">{numberOfTurns}</div>
          <div data-testid="solution">{solution}</div>
        </ModalsContext.Provider>
      </WordleContext.Provider>
    )
  };
}

describe("useEnterBinding", () => {
  it("game is over, does not handle new guess", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      new Array(5),
      [],
      false,
      false,
      true,
      false,
      1,
      false,
      false,
      'peach'
    );
    const addNewGuessFn = jest.fn();
    const formatGuessFn = jest.fn();

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockImplementationOnce(() => addNewGuessFn);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockImplementationOnce(() => formatGuessFn);

    const { result } = renderHook(() => useEnterBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const currentGuess = screen.getByTestId("current-guess");
    const guesses = screen.getByTestId("guesses");
    const history = screen.getByTestId("history");
    const isCorrect = screen.getByTestId("is-correct");
    const isGameOver = screen.getByTestId("is-game-over");
    const isGuessAnimationFiring = screen.getByTestId("is-guess-animation-firing");
    const numberOfTurns = screen.getByTestId("number-of-turns");
    const solution = screen.getByTestId("solution");

    // Assert
    expect(currentGuess.textContent).toBe('test');
    expect(guesses.textContent).toBe('[null,null,null,null,null]');
    expect(history.textContent).toBe('[]');
    expect(isCorrect.textContent).toBe('false');
    expect(isGameOver.textContent).toBe('true');
    expect(isGuessAnimationFiring.textContent).toBe('false');
    expect(numberOfTurns.textContent).toBe('1');
    expect(solution.textContent).toBe('peach');
    expect(toast).not.toHaveBeenCalled();
    expect(addNewGuessFn).not.toHaveBeenCalled();
    expect(formatGuessFn).not.toHaveBeenCalled();
  });

  it("guess is animating, does not handle new guess", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      new Array(5),
      [],
      false,
      false,
      false,
      true,
      1,
      false,
      false,
      'peach'
    );
    const addNewGuessFn = jest.fn();
    const formatGuessFn = jest.fn();

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockImplementationOnce(() => addNewGuessFn);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockImplementationOnce(() => formatGuessFn);

    const { result } = renderHook(() => useEnterBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const currentGuess = screen.getByTestId("current-guess");
    const guesses = screen.getByTestId("guesses");
    const history = screen.getByTestId("history");
    const isCorrect = screen.getByTestId("is-correct");
    const isGameOver = screen.getByTestId("is-game-over");
    const isGuessAnimationFiring = screen.getByTestId("is-guess-animation-firing");
    const numberOfTurns = screen.getByTestId("number-of-turns");
    const solution = screen.getByTestId("solution");

    // Assert
    expect(currentGuess.textContent).toBe('test');
    expect(guesses.textContent).toBe('[null,null,null,null,null]');
    expect(history.textContent).toBe('[]');
    expect(isCorrect.textContent).toBe('false');
    expect(isGameOver.textContent).toBe('false');
    expect(isGuessAnimationFiring.textContent).toBe('true');
    expect(numberOfTurns.textContent).toBe('1');
    expect(solution.textContent).toBe('peach');
    expect(toast).not.toHaveBeenCalled();
    expect(addNewGuessFn).not.toHaveBeenCalled();
    expect(formatGuessFn).not.toHaveBeenCalled();
  });

  it("statistics modal is showing, does not handle new guess", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      new Array(5),
      [],
      false,
      false,
      false,
      false,
      1,
      true,
      false,
      'peach'
    );
    const addNewGuessFn = jest.fn();
    const formatGuessFn = jest.fn();

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockImplementationOnce(() => addNewGuessFn);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockImplementationOnce(() => formatGuessFn);

    const { result } = renderHook(() => useEnterBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const currentGuess = screen.getByTestId("current-guess");
    const guesses = screen.getByTestId("guesses");
    const history = screen.getByTestId("history");
    const isCorrect = screen.getByTestId("is-correct");
    const isGameOver = screen.getByTestId("is-game-over");
    const isGuessAnimationFiring = screen.getByTestId("is-guess-animation-firing");
    const numberOfTurns = screen.getByTestId("number-of-turns");
    const solution = screen.getByTestId("solution");

    // Assert
    expect(currentGuess.textContent).toBe('test');
    expect(guesses.textContent).toBe('[null,null,null,null,null]');
    expect(history.textContent).toBe('[]');
    expect(isCorrect.textContent).toBe('false');
    expect(isGameOver.textContent).toBe('false');
    expect(isGuessAnimationFiring.textContent).toBe('false');
    expect(numberOfTurns.textContent).toBe('1');
    expect(solution.textContent).toBe('peach');
    expect(toast).not.toHaveBeenCalled();
    expect(addNewGuessFn).not.toHaveBeenCalled();
    expect(formatGuessFn).not.toHaveBeenCalled();
  });

  it("help modal is showing, does not handle new guess", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      new Array(5),
      [],
      false,
      false,
      false,
      false,
      1,
      false,
      true,
      'peach'
    );
    const addNewGuessFn = jest.fn();
    const formatGuessFn = jest.fn();

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockImplementationOnce(() => addNewGuessFn);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockImplementationOnce(() => formatGuessFn);

    const { result } = renderHook(() => useEnterBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const currentGuess = screen.getByTestId("current-guess");
    const guesses = screen.getByTestId("guesses");
    const history = screen.getByTestId("history");
    const isCorrect = screen.getByTestId("is-correct");
    const isGameOver = screen.getByTestId("is-game-over");
    const isGuessAnimationFiring = screen.getByTestId("is-guess-animation-firing");
    const numberOfTurns = screen.getByTestId("number-of-turns");
    const solution = screen.getByTestId("solution");

    // Assert
    expect(currentGuess.textContent).toBe('test');
    expect(guesses.textContent).toBe('[null,null,null,null,null]');
    expect(history.textContent).toBe('[]');
    expect(isCorrect.textContent).toBe('false');
    expect(isGameOver.textContent).toBe('false');
    expect(isGuessAnimationFiring.textContent).toBe('false');
    expect(numberOfTurns.textContent).toBe('1');
    expect(solution.textContent).toBe('peach');
    expect(toast).not.toHaveBeenCalled();
    expect(addNewGuessFn).not.toHaveBeenCalled();
    expect(formatGuessFn).not.toHaveBeenCalled();
  });

  it("word already in history, does not handle new guess", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      new Array(5),
      ['test'],
      false,
      false,
      false,
      false,
      1,
      false,
      false,
      'peach'
    );
    const addNewGuessFn = jest.fn();
    const formatGuessFn = jest.fn();

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockImplementationOnce(() => addNewGuessFn);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockImplementationOnce(() => formatGuessFn);

    const { result } = renderHook(() => useEnterBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const currentGuess = screen.getByTestId("current-guess");
    const guesses = screen.getByTestId("guesses");
    const history = screen.getByTestId("history");
    const isCorrect = screen.getByTestId("is-correct");
    const isGameOver = screen.getByTestId("is-game-over");
    const isGuessAnimationFiring = screen.getByTestId("is-guess-animation-firing");
    const numberOfTurns = screen.getByTestId("number-of-turns");
    const solution = screen.getByTestId("solution");

    // Assert
    expect(currentGuess.textContent).toBe('test');
    expect(guesses.textContent).toBe('[null,null,null,null,null]');
    expect(history.textContent).toBe('[\"test\"]');
    expect(isCorrect.textContent).toBe('false');
    expect(isGameOver.textContent).toBe('false');
    expect(isGuessAnimationFiring.textContent).toBe('false');
    expect(numberOfTurns.textContent).toBe('1');
    expect(solution.textContent).toBe('peach');
    expect(toast).toHaveBeenCalledWith("You have already tried that word");
    expect(addNewGuessFn).not.toHaveBeenCalled();
    expect(formatGuessFn).not.toHaveBeenCalled();
  });

  it("word not 5 characters, does not handle new guess", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      new Array(5),
      [],
      false,
      false,
      false,
      false,
      1,
      false,
      false,
      'peach'
    );
    const addNewGuessFn = jest.fn();
    const formatGuessFn = jest.fn();

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockImplementationOnce(() => addNewGuessFn);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockImplementationOnce(() => formatGuessFn);

    const { result } = renderHook(() => useEnterBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const currentGuess = screen.getByTestId("current-guess");
    const guesses = screen.getByTestId("guesses");
    const history = screen.getByTestId("history");
    const isCorrect = screen.getByTestId("is-correct");
    const isGameOver = screen.getByTestId("is-game-over");
    const isGuessAnimationFiring = screen.getByTestId("is-guess-animation-firing");
    const numberOfTurns = screen.getByTestId("number-of-turns");
    const solution = screen.getByTestId("solution");

    // Assert
    expect(currentGuess.textContent).toBe('test');
    expect(guesses.textContent).toBe('[null,null,null,null,null]');
    expect(history.textContent).toBe('[]');
    expect(isCorrect.textContent).toBe('false');
    expect(isGameOver.textContent).toBe('false');
    expect(isGuessAnimationFiring.textContent).toBe('false');
    expect(numberOfTurns.textContent).toBe('1');
    expect(solution.textContent).toBe('peach');
    expect(toast).toHaveBeenCalledWith("Word must be 5 characters long");
    expect(addNewGuessFn).not.toHaveBeenCalled();
    expect(formatGuessFn).not.toHaveBeenCalled();
  });

  it("word does not exist, does not handle new guess", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'tests',
      new Array(5),
      [],
      false,
      false,
      false,
      false,
      1,
      false,
      false,
      'peach'
    );
    const addNewGuessFn = jest.fn();
    const formatGuessFn = jest.fn();

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockImplementationOnce(() => addNewGuessFn);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockImplementationOnce(() => formatGuessFn);

    (wordExists as jest.MockedFunction<typeof wordExists>).mockReturnValueOnce(
      false
    );

    const { result } = renderHook(() => useEnterBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const currentGuess = screen.getByTestId("current-guess");
    const guesses = screen.getByTestId("guesses");
    const history = screen.getByTestId("history");
    const isCorrect = screen.getByTestId("is-correct");
    const isGameOver = screen.getByTestId("is-game-over");
    const isGuessAnimationFiring = screen.getByTestId("is-guess-animation-firing");
    const numberOfTurns = screen.getByTestId("number-of-turns");
    const solution = screen.getByTestId("solution");

    // Assert
    expect(currentGuess.textContent).toBe('tests');
    expect(guesses.textContent).toBe('[null,null,null,null,null]');
    expect(history.textContent).toBe('[]');
    expect(isCorrect.textContent).toBe('false');
    expect(isGameOver.textContent).toBe('false');
    expect(isGuessAnimationFiring.textContent).toBe('false');
    expect(numberOfTurns.textContent).toBe('1');
    expect(solution.textContent).toBe('peach');
    expect(toast).toHaveBeenCalledWith("Word does not exist");
    expect(addNewGuessFn).not.toHaveBeenCalled();
    expect(formatGuessFn).not.toHaveBeenCalled();
  });

  it("everything value, handles new guess", () => {
    // Arrange
    const expectedFormattedGuess: GuessLetterResult[] = [
      { colour: GuessColour.grey, letter: "t" },
      { colour: GuessColour.green, letter: "e" },
      { colour: GuessColour.grey, letter: "s" },
      { colour: GuessColour.grey, letter: "t" },
      { colour: GuessColour.grey, letter: "s" }
    ];
    const wrapper = createWrapperComponent(
      'tests',
      new Array(5),
      [],
      false,
      false,
      false,
      false,
      1,
      false,
      false,
      'peach'
    );
    const addNewGuessFn = jest.fn();
    const formatGuessFn = jest.fn();

    formatGuessFn.mockImplementationOnce(() => expectedFormattedGuess);

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockImplementationOnce(() => addNewGuessFn);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockImplementationOnce(() => formatGuessFn);

    (wordExists as jest.MockedFunction<typeof wordExists>).mockReturnValueOnce(
      true
    );

    const { result } = renderHook(() => useEnterBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const currentGuess = screen.getByTestId("current-guess");
    const guesses = screen.getByTestId("guesses");
    const history = screen.getByTestId("history");
    const isCorrect = screen.getByTestId("is-correct");
    const isGameOver = screen.getByTestId("is-game-over");
    const isGuessAnimationFiring = screen.getByTestId("is-guess-animation-firing");
    const numberOfTurns = screen.getByTestId("number-of-turns");
    const solution = screen.getByTestId("solution");

    // Assert
    expect(currentGuess.textContent).toBe('tests');
    expect(guesses.textContent).toBe('[null,null,null,null,null]');
    expect(history.textContent).toBe('[]');
    expect(isCorrect.textContent).toBe('false');
    expect(isGameOver.textContent).toBe('false');
    expect(isGuessAnimationFiring.textContent).toBe('false');
    expect(numberOfTurns.textContent).toBe('1');
    expect(solution.textContent).toBe('peach');
    expect(toast).not.toHaveBeenCalled();
    expect(formatGuessFn).toHaveBeenCalled();
    expect(addNewGuessFn).toHaveBeenCalledWith(expectedFormattedGuess);
  });
});
