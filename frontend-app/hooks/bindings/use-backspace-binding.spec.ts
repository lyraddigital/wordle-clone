jest.mock("@/hooks/modals/use-modals");
jest.mock("@/hooks/wordle/use-wordle");

import useModals from "@/hooks/modals/use-modals";
import useWordle from "@/hooks/wordle/use-wordle";

import useBackspaceBinding from "./use-backspace-binding";

describe("useBackspaceBinding", () => {
  it("game is over, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: false,
      setShowStatisticsModal: jest.fn(),
      setShowHelpModal: jest.fn(),
    });

    const mockSetCurrentGuessFn = jest.fn();
    const mockSetIsCurrentGuessIncorrect = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "test",
      guesses: [],
      history: [],
      isCorrect: false,
      isCurrentGuessIncorrect: false,
      isGameOver: true,
      isGuessAnimationFiring: false,
      numberOfTurns: 0,
      solution: "passe",
      usedKeys: {},
      setCurrentGuess: mockSetCurrentGuessFn,
      setGuesses: jest.fn(),
      setHistory: jest.fn(),
      setIsCorrect: jest.fn(),
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
      setIsGameOver: jest.fn(),
      setIsGuessAnimationFiring: jest.fn(),
      setNumberOfTurns: jest.fn(),
      setSolution: jest.fn(),
      setUsedKeys: jest.fn(),
    });

    // Action
    const bindingFn = useBackspaceBinding();
    bindingFn();

    // Assert
    expect(mockSetCurrentGuessFn.mock.calls.length).toBe(0);
    expect(mockSetIsCurrentGuessIncorrect.mock.calls.length).toBe(0);
  });

  it("game animation is firing, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: false,
      setShowStatisticsModal: jest.fn(),
      setShowHelpModal: jest.fn(),
    });

    const mockSetCurrentGuessFn = jest.fn();
    const mockSetIsCurrentGuessIncorrect = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "test",
      guesses: [],
      history: [],
      isCorrect: false,
      isCurrentGuessIncorrect: false,
      isGameOver: false,
      isGuessAnimationFiring: true,
      numberOfTurns: 0,
      solution: "passe",
      usedKeys: {},
      setCurrentGuess: mockSetCurrentGuessFn,
      setGuesses: jest.fn(),
      setHistory: jest.fn(),
      setIsCorrect: jest.fn(),
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
      setIsGameOver: jest.fn(),
      setIsGuessAnimationFiring: jest.fn(),
      setNumberOfTurns: jest.fn(),
      setSolution: jest.fn(),
      setUsedKeys: jest.fn(),
    });

    // Action
    const bindingFn = useBackspaceBinding();
    bindingFn();

    // Assert
    expect(mockSetCurrentGuessFn.mock.calls.length).toBe(0);
    expect(mockSetIsCurrentGuessIncorrect.mock.calls.length).toBe(0);
  });

  it("statistic modal is showing, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: true,
      showHelpModal: false,
      setShowStatisticsModal: jest.fn(),
      setShowHelpModal: jest.fn(),
    });

    const mockSetCurrentGuessFn = jest.fn();
    const mockSetIsCurrentGuessIncorrect = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "test",
      guesses: [],
      history: [],
      isCorrect: false,
      isCurrentGuessIncorrect: false,
      isGameOver: false,
      isGuessAnimationFiring: false,
      numberOfTurns: 0,
      solution: "passe",
      usedKeys: {},
      setCurrentGuess: mockSetCurrentGuessFn,
      setGuesses: jest.fn(),
      setHistory: jest.fn(),
      setIsCorrect: jest.fn(),
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
      setIsGameOver: jest.fn(),
      setIsGuessAnimationFiring: jest.fn(),
      setNumberOfTurns: jest.fn(),
      setSolution: jest.fn(),
      setUsedKeys: jest.fn(),
    });

    // Action
    const bindingFn = useBackspaceBinding();
    bindingFn();

    // Assert
    expect(mockSetCurrentGuessFn.mock.calls.length).toBe(0);
    expect(mockSetIsCurrentGuessIncorrect.mock.calls.length).toBe(0);
  });

  it("help modal is showing, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: true,
      setShowStatisticsModal: jest.fn(),
      setShowHelpModal: jest.fn(),
    });

    const mockSetCurrentGuessFn = jest.fn();
    const mockSetIsCurrentGuessIncorrect = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "test",
      guesses: [],
      history: [],
      isCorrect: false,
      isCurrentGuessIncorrect: false,
      isGameOver: false,
      isGuessAnimationFiring: false,
      numberOfTurns: 0,
      solution: "passe",
      usedKeys: {},
      setCurrentGuess: mockSetCurrentGuessFn,
      setGuesses: jest.fn(),
      setHistory: jest.fn(),
      setIsCorrect: jest.fn(),
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
      setIsGameOver: jest.fn(),
      setIsGuessAnimationFiring: jest.fn(),
      setNumberOfTurns: jest.fn(),
      setSolution: jest.fn(),
      setUsedKeys: jest.fn(),
    });

    // Action
    const bindingFn = useBackspaceBinding();
    bindingFn();

    // Assert
    expect(mockSetCurrentGuessFn.mock.calls.length).toBe(0);
    expect(mockSetIsCurrentGuessIncorrect.mock.calls.length).toBe(0);
  });

  it("everything is fine, updates the state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: false,
      setShowStatisticsModal: jest.fn(),
      setShowHelpModal: jest.fn(),
    });

    const mockSetCurrentGuessFn = jest.fn();
    const mockSetIsCurrentGuessIncorrect = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "test",
      guesses: [],
      history: [],
      isCorrect: false,
      isCurrentGuessIncorrect: false,
      isGameOver: false,
      isGuessAnimationFiring: false,
      numberOfTurns: 0,
      solution: "passe",
      usedKeys: {},
      setCurrentGuess: mockSetCurrentGuessFn,
      setGuesses: jest.fn(),
      setHistory: jest.fn(),
      setIsCorrect: jest.fn(),
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
      setIsGameOver: jest.fn(),
      setIsGuessAnimationFiring: jest.fn(),
      setNumberOfTurns: jest.fn(),
      setSolution: jest.fn(),
      setUsedKeys: jest.fn(),
    });

    // Action
    const bindingFn = useBackspaceBinding();
    bindingFn();

    // Assert
    expect(mockSetCurrentGuessFn).toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect.mock.calls[0][0]).toBe(false);
  });
});
