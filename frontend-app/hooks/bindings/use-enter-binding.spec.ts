jest.mock("@/hooks/modals/use-modals");
jest.mock("@/hooks/wordle/use-wordle");
jest.mock("@/hooks/statistics/use-statistics-updater");

import { Dispatch, SetStateAction } from "react";

import { ModalsState } from "@/contexts/modals-context";
import { WordleState } from "@/contexts/wordle-context";
import useModals from "@/hooks/modals/use-modals";
import useWordle from "@/hooks/wordle/use-wordle";
import useStatisticsUpdater from "@/hooks/statistics/use-statistics-updater";

import useEnterBinding from "./use-enter-binding";

describe("useEnterBinding", () => {
  it("game is over, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockSetIsCorrect = jest.fn() as Dispatch<SetStateAction<boolean>>;
    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;
    const mockUseStatisticsHelper = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;
    const mockSetIsGameOver = jest.fn() as Dispatch<SetStateAction<boolean>>;
    const mockSetGuesses = jest.fn() as Dispatch<
      SetStateAction<({ key: string; colour: string }[] | undefined)[]>
    >;
    const mockSetHistory = jest.fn() as Dispatch<SetStateAction<string[]>>;
    const mockSetNumberOfTurns = jest.fn() as Dispatch<SetStateAction<number>>;
    const mockSetUsedKeys = jest.fn() as Dispatch<
      SetStateAction<{ [key: string]: string }>
    >;
    const mockSetIsGuessAnimationFiring = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;
    const mockSetCurrentGuess = jest.fn() as Dispatch<SetStateAction<string>>;

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "test",
      history: [] as string[],
      numberOfTurns: 0,
      isGameOver: true,
      isGuessAnimationFiring: false,
      setCurrentGuess: mockSetCurrentGuess,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
      setGuesses: mockSetGuesses,
      setHistory: mockSetHistory,
      setIsCorrect: mockSetIsCorrect,
      setIsGameOver: mockSetIsGameOver,
      setIsGuessAnimationFiring: mockSetIsGuessAnimationFiring,
      setNumberOfTurns: mockSetNumberOfTurns,
      setUsedKeys: mockSetUsedKeys,
    } as WordleState);

    (
      useStatisticsUpdater as jest.MockedFunction<typeof useStatisticsUpdater>
    ).mockReturnValue(mockUseStatisticsHelper);

    // Action
    const bindingFn = useEnterBinding();
    bindingFn();

    // Assert
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
  });

  // it("game animation is firing, does not update state", () => {
  //   (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
  //     showStatisticsModal: false,
  //     showHelpModal: false,
  //     setShowStatisticsModal: jest.fn(),
  //     setShowHelpModal: jest.fn(),
  //   });

  //   const mockSetCurrentGuessFn = jest.fn();
  //   const mockSetIsCurrentGuessIncorrect = jest.fn();

  //   (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
  //     currentGuess: "test",
  //     guesses: [],
  //     history: [],
  //     isCorrect: false,
  //     isCurrentGuessIncorrect: false,
  //     isGameOver: false,
  //     isGuessAnimationFiring: true,
  //     numberOfTurns: 0,
  //     solution: "passe",
  //     usedKeys: {},
  //     setCurrentGuess: mockSetCurrentGuessFn,
  //     setGuesses: jest.fn(),
  //     setHistory: jest.fn(),
  //     setIsCorrect: jest.fn(),
  //     setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
  //     setIsGameOver: jest.fn(),
  //     setIsGuessAnimationFiring: jest.fn(),
  //     setNumberOfTurns: jest.fn(),
  //     setSolution: jest.fn(),
  //     setUsedKeys: jest.fn(),
  //   });

  //   // Action
  //   const bindingFn = useBackspaceBinding();
  //   bindingFn();

  //   // Assert
  //   expect(mockSetCurrentGuessFn.mock.calls.length).toBe(0);
  //   expect(mockSetIsCurrentGuessIncorrect.mock.calls.length).toBe(0);
  // });

  // it("statistic modal is showing, does not update state", () => {
  //   (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
  //     showStatisticsModal: true,
  //     showHelpModal: false,
  //     setShowStatisticsModal: jest.fn(),
  //     setShowHelpModal: jest.fn(),
  //   });

  //   const mockSetCurrentGuessFn = jest.fn();
  //   const mockSetIsCurrentGuessIncorrect = jest.fn();

  //   (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
  //     currentGuess: "test",
  //     guesses: [],
  //     history: [],
  //     isCorrect: false,
  //     isCurrentGuessIncorrect: false,
  //     isGameOver: false,
  //     isGuessAnimationFiring: false,
  //     numberOfTurns: 0,
  //     solution: "passe",
  //     usedKeys: {},
  //     setCurrentGuess: mockSetCurrentGuessFn,
  //     setGuesses: jest.fn(),
  //     setHistory: jest.fn(),
  //     setIsCorrect: jest.fn(),
  //     setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
  //     setIsGameOver: jest.fn(),
  //     setIsGuessAnimationFiring: jest.fn(),
  //     setNumberOfTurns: jest.fn(),
  //     setSolution: jest.fn(),
  //     setUsedKeys: jest.fn(),
  //   });

  //   // Action
  //   const bindingFn = useBackspaceBinding();
  //   bindingFn();

  //   // Assert
  //   expect(mockSetCurrentGuessFn.mock.calls.length).toBe(0);
  //   expect(mockSetIsCurrentGuessIncorrect.mock.calls.length).toBe(0);
  // });

  // it("help modal is showing, does not update state", () => {
  //   (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
  //     showStatisticsModal: false,
  //     showHelpModal: true,
  //     setShowStatisticsModal: jest.fn(),
  //     setShowHelpModal: jest.fn(),
  //   });

  //   const mockSetCurrentGuessFn = jest.fn();
  //   const mockSetIsCurrentGuessIncorrect = jest.fn();

  //   (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
  //     currentGuess: "test",
  //     guesses: [],
  //     history: [],
  //     isCorrect: false,
  //     isCurrentGuessIncorrect: false,
  //     isGameOver: false,
  //     isGuessAnimationFiring: false,
  //     numberOfTurns: 0,
  //     solution: "passe",
  //     usedKeys: {},
  //     setCurrentGuess: mockSetCurrentGuessFn,
  //     setGuesses: jest.fn(),
  //     setHistory: jest.fn(),
  //     setIsCorrect: jest.fn(),
  //     setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
  //     setIsGameOver: jest.fn(),
  //     setIsGuessAnimationFiring: jest.fn(),
  //     setNumberOfTurns: jest.fn(),
  //     setSolution: jest.fn(),
  //     setUsedKeys: jest.fn(),
  //   });

  //   // Action
  //   const bindingFn = useBackspaceBinding();
  //   bindingFn();

  //   // Assert
  //   expect(mockSetCurrentGuessFn.mock.calls.length).toBe(0);
  //   expect(mockSetIsCurrentGuessIncorrect.mock.calls.length).toBe(0);
  // });

  // it("everything is fine, updates the state", () => {
  //   (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
  //     showStatisticsModal: false,
  //     showHelpModal: false,
  //     setShowStatisticsModal: jest.fn(),
  //     setShowHelpModal: jest.fn(),
  //   });

  //   const mockSetCurrentGuessFn = jest.fn();
  //   const mockSetIsCurrentGuessIncorrect = jest.fn();

  //   (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
  //     currentGuess: "test",
  //     guesses: [],
  //     history: [],
  //     isCorrect: false,
  //     isCurrentGuessIncorrect: false,
  //     isGameOver: false,
  //     isGuessAnimationFiring: false,
  //     numberOfTurns: 0,
  //     solution: "passe",
  //     usedKeys: {},
  //     setCurrentGuess: mockSetCurrentGuessFn,
  //     setGuesses: jest.fn(),
  //     setHistory: jest.fn(),
  //     setIsCorrect: jest.fn(),
  //     setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
  //     setIsGameOver: jest.fn(),
  //     setIsGuessAnimationFiring: jest.fn(),
  //     setNumberOfTurns: jest.fn(),
  //     setSolution: jest.fn(),
  //     setUsedKeys: jest.fn(),
  //   });

  //   // Action
  //   const bindingFn = useBackspaceBinding();
  //   bindingFn();

  //   // Assert
  //   expect(mockSetCurrentGuessFn).toHaveBeenCalled();
  //   expect(mockSetIsCurrentGuessIncorrect).toHaveBeenCalled();
  //   expect(mockSetIsCurrentGuessIncorrect.mock.calls[0][0]).toBe(false);
  // });
});
