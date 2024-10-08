jest.mock("@/hooks/modals/use-modals");
jest.mock("@/hooks/wordle/use-wordle");

import { Dispatch, SetStateAction } from "react";

import { ModalsState } from "@/contexts/modals-context";
import { WordleState } from "@/contexts/wordle-context";
import useModals from "@/hooks/modals/use-modals";
import useWordle from "@/hooks/wordle/use-wordle";

import useAlphabetBinding from "./use-alphabet-binding";

describe("useAlphabetBinding", () => {
  it("current guess is less than 5 characters, but game is over, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockSetCurrentGuessFn = jest.fn() as Dispatch<SetStateAction<string>>;
    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "test",
      isGameOver: true,
      isGuessAnimationFiring: false,
      setCurrentGuess: mockSetCurrentGuessFn,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useAlphabetBinding();
    bindingFn("a");

    // Assert
    expect(mockSetCurrentGuessFn).not.toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
  });

  it("current guess is less than 5 characters, but guess animation is firing, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockSetCurrentGuessFn = jest.fn() as Dispatch<SetStateAction<string>>;
    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "game",
      isGuessAnimationFiring: true,
      setCurrentGuess: mockSetCurrentGuessFn,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useAlphabetBinding();
    bindingFn("a");

    // Assert
    expect(mockSetCurrentGuessFn).not.toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
  });

  it("current guess is less than 5 characters, but statistic modal is showing, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: true,
      showHelpModal: false,
    } as ModalsState);

    const mockSetCurrentGuessFn = jest.fn() as Dispatch<SetStateAction<string>>;
    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "game",
      isGameOver: false,
      isGuessAnimationFiring: false,
      setCurrentGuess: mockSetCurrentGuessFn,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useAlphabetBinding();
    bindingFn("a");

    // Assert
    expect(mockSetCurrentGuessFn).not.toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
  });

  it("current guess is less than 5 characters, but help modal is showing, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: true,
    } as ModalsState);

    const mockSetCurrentGuessFn = jest.fn() as Dispatch<SetStateAction<string>>;
    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "game",
      isGameOver: false,
      isGuessAnimationFiring: false,
      setCurrentGuess: mockSetCurrentGuessFn,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useAlphabetBinding();
    bindingFn("a");

    // Assert
    expect(mockSetCurrentGuessFn).not.toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
  });

  it("current guess is less than 5 characters, and everything is fine, updates the state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockSetCurrentGuessFn = jest.fn() as Dispatch<SetStateAction<string>>;
    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "game",
      isGameOver: false,
      isGuessAnimationFiring: false,
      setCurrentGuess: mockSetCurrentGuessFn,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useAlphabetBinding();
    bindingFn("a");

    // Assert
    expect(mockSetCurrentGuessFn).toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).toHaveBeenCalledWith(false);
  });

  it("current guess is 5 characters, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValue({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockSetCurrentGuessFn = jest.fn() as Dispatch<SetStateAction<string>>;
    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValue({
      currentGuess: "games",
      isGameOver: false,
      isGuessAnimationFiring: false,
      setCurrentGuess: mockSetCurrentGuessFn,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useAlphabetBinding();
    bindingFn("a");

    // Assert
    expect(mockSetCurrentGuessFn).not.toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
  });
});
