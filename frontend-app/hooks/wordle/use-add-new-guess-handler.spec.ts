jest.mock("@/hooks/statistics/use-statistics-updater");
jest.mock("@/hooks/wordle/use-wordle");

import { Dispatch, SetStateAction } from "react";

import { WordleState } from "@/contexts/wordle-context";
import { GuessColour } from "@/lib/enums";
import { GuessLetterResult } from "@/lib/types";
import useStatisticsUpdater from "@/hooks/statistics/use-statistics-updater";
import useWordle from "@/hooks/wordle/use-wordle";

import useAddNewGuessHandler from "./use-add-new-guess-handler";

describe("useAddNewGuessHandler", () => {
  jest.useFakeTimers();

  it("first turn and guess is not the solution, calls correct wordle dispatchers", () => {
    // Arrange
    const numberOfTurns = 0;
    const currentGuess = "a";
    const solution = "peach";
    const formattedGuess: GuessLetterResult[] = [
      {
        letter: "a",
        colour: GuessColour.green,
      },
      {
        letter: "b",
        colour: GuessColour.grey,
      },
      {
        letter: "c",
        colour: GuessColour.yellow,
      },
      {
        letter: "d",
        colour: GuessColour.grey,
      },
      {
        letter: "e",
        colour: GuessColour.grey,
      },
    ];

    const setIsGameOverFn = jest.fn();
    const setCurrentGuessFn = jest.fn();
    const setGuessesFn = jest.fn();
    const setHistoryFn = jest.fn();
    const setIsCorrectFn = jest.fn();
    const setNumberOfTurnsFn = jest.fn();
    const setUsedKeysFn = jest.fn();
    const setIsGuessAnimationFiringFn = jest.fn();
    const updateStatisticsByGameResultFn = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockImplementationOnce(
      () =>
        ({
          numberOfTurns,
          currentGuess,
          solution,
          setIsGameOver: setIsGameOverFn as Dispatch<SetStateAction<boolean>>,
          setCurrentGuess: setCurrentGuessFn as Dispatch<
            SetStateAction<string>
          >,
          setGuesses: setGuessesFn as Dispatch<
            SetStateAction<(GuessLetterResult[] | undefined)[]>
          >,
          setHistory: setHistoryFn as Dispatch<SetStateAction<string[]>>,
          setIsCorrect: setIsCorrectFn as Dispatch<SetStateAction<boolean>>,
          setNumberOfTurns: setNumberOfTurnsFn as Dispatch<
            SetStateAction<number>
          >,
          setUsedKeys: setUsedKeysFn as Dispatch<
            SetStateAction<{ [key: string]: string }>
          >,
          setIsGuessAnimationFiring: setIsGuessAnimationFiringFn as Dispatch<
            SetStateAction<boolean>
          >,
        } as WordleState)
    );

    (
      useStatisticsUpdater as jest.MockedFunction<typeof useStatisticsUpdater>
    ).mockImplementationOnce(() => updateStatisticsByGameResultFn);

    const addNewGuess = useAddNewGuessHandler();

    // Action
    addNewGuess(formattedGuess);
    jest.runAllTimers();

    // Assert
    expect(setIsCorrectFn).not.toHaveBeenCalled();
    expect(setIsGameOverFn).not.toHaveBeenCalled();
    expect(updateStatisticsByGameResultFn).not.toHaveBeenCalled();
    expect(setGuessesFn).toHaveBeenCalled();
    expect(setHistoryFn).toHaveBeenCalled();
    expect(setNumberOfTurnsFn).toHaveBeenCalled();
    expect(setUsedKeysFn).toHaveBeenCalled();
    expect(setIsGuessAnimationFiringFn).toHaveBeenCalledTimes(2);
    expect(setCurrentGuessFn).toHaveBeenCalled();
  });

  it("first turn and guess is not the solution, setGuesses dispatch returns correct new guesses", () => {
    // Arrange
    const numberOfTurns = 1;
    const currentGuess = "a";
    const solution = "peach";
    const formattedGuess: GuessLetterResult[] = [
      { letter: "a", colour: GuessColour.green },
      { letter: "b", colour: GuessColour.grey },
      { letter: "c", colour: GuessColour.yellow },
      { letter: "d", colour: GuessColour.grey },
      { letter: "e", colour: GuessColour.grey },
    ];
    const currentGuesses: (GuessLetterResult[] | undefined)[] = [
      [
        { letter: "d", colour: GuessColour.grey },
        { letter: "e", colour: GuessColour.grey },
        { letter: "a", colour: GuessColour.yellow },
        { letter: "t", colour: GuessColour.grey },
        { letter: "h", colour: GuessColour.grey },
      ],
    ];

    const setIsGameOverFn = jest.fn();
    const setCurrentGuessFn = jest.fn();
    const setGuessesFn = jest.fn();
    const setHistoryFn = jest.fn();
    const setIsCorrectFn = jest.fn();
    const setNumberOfTurnsFn = jest.fn();
    const setUsedKeysFn = jest.fn();
    const setIsGuessAnimationFiringFn = jest.fn();
    const updateStatisticsByGameResultFn = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockImplementationOnce(
      () =>
        ({
          numberOfTurns,
          currentGuess,
          solution,
          setIsGameOver: setIsGameOverFn as Dispatch<SetStateAction<boolean>>,
          setCurrentGuess: setCurrentGuessFn as Dispatch<
            SetStateAction<string>
          >,
          setGuesses: setGuessesFn as Dispatch<
            SetStateAction<({ key: string; colour: string }[] | undefined)[]>
          >,
          setHistory: setHistoryFn as Dispatch<SetStateAction<string[]>>,
          setIsCorrect: setIsCorrectFn as Dispatch<SetStateAction<boolean>>,
          setNumberOfTurns: setNumberOfTurnsFn as Dispatch<
            SetStateAction<number>
          >,
          setUsedKeys: setUsedKeysFn as Dispatch<
            SetStateAction<{ [key: string]: string }>
          >,
          setIsGuessAnimationFiring: setIsGuessAnimationFiringFn as Dispatch<
            SetStateAction<boolean>
          >,
        } as WordleState)
    );

    (
      useStatisticsUpdater as jest.MockedFunction<typeof useStatisticsUpdater>
    ).mockImplementationOnce(() => updateStatisticsByGameResultFn);

    const addNewGuess = useAddNewGuessHandler();

    // Action
    addNewGuess(formattedGuess);
    jest.runAllTimers();

    // Assert
    expect(setGuessesFn).toHaveBeenCalled();

    const setGuessesCallback = setGuessesFn.mock.calls[0][0] as (
      prevGuesses: (GuessLetterResult[] | undefined)[]
    ) => (GuessLetterResult[] | undefined)[];

    const newGuesses: (GuessLetterResult[] | undefined)[] =
      setGuessesCallback(currentGuesses);

    expect(newGuesses).toStrictEqual([
      [
        { letter: "d", colour: "grey" },
        { letter: "e", colour: "grey" },
        { letter: "a", colour: "yellow" },
        { letter: "t", colour: "grey" },
        { letter: "h", colour: "grey" },
      ],
      [
        { letter: "a", colour: "green" },
        { letter: "b", colour: "grey" },
        { letter: "c", colour: "yellow" },
        { letter: "d", colour: "grey" },
        { letter: "e", colour: "grey" },
      ],
    ]);
  });

  it("first turn and guess is not the solution, setHistory dispatch returns correct new history", () => {
    // Arrange
    const numberOfTurns = 1;
    const currentGuess = "abcde";
    const solution = "peach";
    const formattedGuess: GuessLetterResult[] = [
      { letter: "a", colour: GuessColour.green },
      { letter: "b", colour: GuessColour.grey },
      { letter: "c", colour: GuessColour.yellow },
      { letter: "d", colour: GuessColour.grey },
      { letter: "e", colour: GuessColour.grey },
    ];
    const currentHistory = ["tests"];

    const setIsGameOverFn = jest.fn();
    const setCurrentGuessFn = jest.fn();
    const setGuessesFn = jest.fn();
    const setHistoryFn = jest.fn();
    const setIsCorrectFn = jest.fn();
    const setNumberOfTurnsFn = jest.fn();
    const setUsedKeysFn = jest.fn();
    const setIsGuessAnimationFiringFn = jest.fn();
    const updateStatisticsByGameResultFn = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockImplementationOnce(
      () =>
        ({
          numberOfTurns,
          currentGuess,
          solution,
          setIsGameOver: setIsGameOverFn as Dispatch<SetStateAction<boolean>>,
          setCurrentGuess: setCurrentGuessFn as Dispatch<
            SetStateAction<string>
          >,
          setGuesses: setGuessesFn as Dispatch<
            SetStateAction<({ key: string; colour: string }[] | undefined)[]>
          >,
          setHistory: setHistoryFn as Dispatch<SetStateAction<string[]>>,
          setIsCorrect: setIsCorrectFn as Dispatch<SetStateAction<boolean>>,
          setNumberOfTurns: setNumberOfTurnsFn as Dispatch<
            SetStateAction<number>
          >,
          setUsedKeys: setUsedKeysFn as Dispatch<
            SetStateAction<{ [key: string]: string }>
          >,
          setIsGuessAnimationFiring: setIsGuessAnimationFiringFn as Dispatch<
            SetStateAction<boolean>
          >,
        } as WordleState)
    );

    (
      useStatisticsUpdater as jest.MockedFunction<typeof useStatisticsUpdater>
    ).mockImplementationOnce(() => updateStatisticsByGameResultFn);

    const addNewGuess = useAddNewGuessHandler();

    // Action
    addNewGuess(formattedGuess);
    jest.runAllTimers();

    // Assert
    expect(setHistoryFn).toHaveBeenCalled();

    const setHistoryCallback = setHistoryFn.mock.calls[0][0] as (
      prevHistory: string[]
    ) => string[];

    const newHistory: string[] = setHistoryCallback(currentHistory);

    expect(newHistory).toStrictEqual(["tests", currentGuess]);
  });

  it("first turn and guess is not the solution, setNumberOTurns dispatch returns correct new number of turns", () => {
    // Arrange
    const numberOfTurns = 1;
    const currentGuess = "abcde";
    const solution = "peach";
    const formattedGuess: GuessLetterResult[] = [
      { letter: "a", colour: GuessColour.green },
      { letter: "b", colour: GuessColour.grey },
      { letter: "c", colour: GuessColour.yellow },
      { letter: "d", colour: GuessColour.grey },
      { letter: "e", colour: GuessColour.grey },
    ];

    const setIsGameOverFn = jest.fn();
    const setCurrentGuessFn = jest.fn();
    const setGuessesFn = jest.fn();
    const setHistoryFn = jest.fn();
    const setIsCorrectFn = jest.fn();
    const setNumberOfTurnsFn = jest.fn();
    const setUsedKeysFn = jest.fn();
    const setIsGuessAnimationFiringFn = jest.fn();
    const updateStatisticsByGameResultFn = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockImplementationOnce(
      () =>
        ({
          numberOfTurns,
          currentGuess,
          solution,
          setIsGameOver: setIsGameOverFn as Dispatch<SetStateAction<boolean>>,
          setCurrentGuess: setCurrentGuessFn as Dispatch<
            SetStateAction<string>
          >,
          setGuesses: setGuessesFn as Dispatch<
            SetStateAction<({ key: string; colour: string }[] | undefined)[]>
          >,
          setHistory: setHistoryFn as Dispatch<SetStateAction<string[]>>,
          setIsCorrect: setIsCorrectFn as Dispatch<SetStateAction<boolean>>,
          setNumberOfTurns: setNumberOfTurnsFn as Dispatch<
            SetStateAction<number>
          >,
          setUsedKeys: setUsedKeysFn as Dispatch<
            SetStateAction<{ [key: string]: string }>
          >,
          setIsGuessAnimationFiring: setIsGuessAnimationFiringFn as Dispatch<
            SetStateAction<boolean>
          >,
        } as WordleState)
    );

    (
      useStatisticsUpdater as jest.MockedFunction<typeof useStatisticsUpdater>
    ).mockImplementationOnce(() => updateStatisticsByGameResultFn);

    const addNewGuess = useAddNewGuessHandler();

    // Action
    addNewGuess(formattedGuess);
    jest.runAllTimers();

    // Assert
    expect(setNumberOfTurnsFn).toHaveBeenCalled();

    const setNumberOfTurnsCallback = setNumberOfTurnsFn.mock.calls[0][0] as (
      prevNumberOfTurns: number
    ) => number;

    const newNumberOfTurns = setNumberOfTurnsCallback(numberOfTurns);

    expect(newNumberOfTurns).toBe(2);
  });
});
