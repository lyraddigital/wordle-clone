jest.mock("@/hooks/modals/use-modals");
jest.mock("@/hooks/wordle/use-wordle");

import useModals from "@/hooks/modals/use-modals";
import useWordle from "@/hooks/wordle/use-wordle";

import useAlphabetBinding from "./use-alphabet-binding";

describe("useAlphabetBinding", () => {
  it("current guess is less than 5 characters, but game is over, does not update state", () => {
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
    const bindingFn = useAlphabetBinding();
    bindingFn("a");

    expect(mockSetCurrentGuessFn.mock.calls.length).toBe(0);
    expect(mockSetIsCurrentGuessIncorrect.mock.calls.length).toBe(0);
  });

  it("current guess is less than 5 characters, but guess animation is firing, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: false,
      setShowStatisticsModal: jest.fn(),
      setShowHelpModal: jest.fn(),
    });

    const mockSetCurrentGuessFn = jest.fn();
    const mockSetIsCurrentGuessIncorrect = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "game",
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
    const bindingFn = useAlphabetBinding();
    bindingFn("a");

    expect(mockSetCurrentGuessFn.mock.calls.length).toBe(0);
    expect(mockSetIsCurrentGuessIncorrect.mock.calls.length).toBe(0);
  });

  it("current guess is less than 5 characters, but statistic modal is showing, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: true,
      showHelpModal: false,
      setShowStatisticsModal: jest.fn(),
      setShowHelpModal: jest.fn(),
    });

    const mockSetCurrentGuessFn = jest.fn();
    const mockSetIsCurrentGuessIncorrect = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "game",
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
    const bindingFn = useAlphabetBinding();
    bindingFn("a");

    expect(mockSetCurrentGuessFn.mock.calls.length).toBe(0);
    expect(mockSetIsCurrentGuessIncorrect.mock.calls.length).toBe(0);
  });

  it("current guess is less than 5 characters, but help modal is showing, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: true,
      setShowStatisticsModal: jest.fn(),
      setShowHelpModal: jest.fn(),
    });

    const mockSetCurrentGuessFn = jest.fn();
    const mockSetIsCurrentGuessIncorrect = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "game",
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
    const bindingFn = useAlphabetBinding();
    bindingFn("a");

    expect(mockSetCurrentGuessFn.mock.calls.length).toBe(0);
    expect(mockSetIsCurrentGuessIncorrect.mock.calls.length).toBe(0);
  });

  it("current guess is less than 5 characters, and everything is fine, updates the state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: false,
      setShowStatisticsModal: jest.fn(),
      setShowHelpModal: jest.fn(),
    });

    const mockSetCurrentGuessFn = jest.fn();
    const mockSetIsCurrentGuessIncorrect = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "game",
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
    const bindingFn = useAlphabetBinding();
    bindingFn("a");

    expect(mockSetCurrentGuessFn).toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect.mock.calls[0][0]).toBe(false);
  });

  it("current guess is 5 characters, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: false,
      setShowStatisticsModal: jest.fn(),
      setShowHelpModal: jest.fn(),
    });

    const mockSetCurrentGuessFn = jest.fn();
    const mockSetIsCurrentGuessIncorrect = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "games",
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
    const bindingFn = useAlphabetBinding();
    bindingFn("a");

    expect(mockSetCurrentGuessFn.mock.calls.length).toBe(0);
    expect(mockSetIsCurrentGuessIncorrect.mock.calls.length).toBe(0);
  });
});
