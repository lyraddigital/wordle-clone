jest.mock("@/hooks/modals/use-modals");
jest.mock("@/hooks/wordle/use-wordle");

import { Dispatch, SetStateAction } from "react";

import { ModalsState } from "@/contexts/modals-context";
import { WordleState } from "@/contexts/wordle-context";
import useModals from "@/hooks/modals/use-modals";
import useWordle from "@/hooks/wordle/use-wordle";

import useBackspaceBinding from "./use-backspace-binding";

describe("useBackspaceBinding", () => {
  it("game is over, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockSetCurrentGuessFn = jest.fn() as Dispatch<SetStateAction<string>>;
    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      isGameOver: true,
      isGuessAnimationFiring: false,
      setCurrentGuess: mockSetCurrentGuessFn,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useBackspaceBinding();
    bindingFn();

    // Assert
    expect(mockSetCurrentGuessFn).not.toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
  });

  it("game animation is firing, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockSetCurrentGuessFn = jest.fn() as Dispatch<SetStateAction<string>>;
    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      isGameOver: false,
      isGuessAnimationFiring: true,
      setCurrentGuess: mockSetCurrentGuessFn,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useBackspaceBinding();
    bindingFn();

    // Assert
    expect(mockSetCurrentGuessFn).not.toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
  });

  it("statistic modal is showing, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: true,
      showHelpModal: false,
    } as ModalsState);

    const mockSetCurrentGuessFn = jest.fn() as Dispatch<SetStateAction<string>>;
    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      isGameOver: false,
      isGuessAnimationFiring: false,
      setCurrentGuess: mockSetCurrentGuessFn,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useBackspaceBinding();
    bindingFn();

    // Assert
    expect(mockSetCurrentGuessFn).not.toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
  });

  it("help modal is showing, does not update state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: false,
      showHelpModal: true,
    } as ModalsState);

    const mockSetCurrentGuessFn = jest.fn() as Dispatch<SetStateAction<string>>;
    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      isGameOver: false,
      isGuessAnimationFiring: false,
      setCurrentGuess: mockSetCurrentGuessFn,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useBackspaceBinding();
    bindingFn();

    // Assert
    expect(mockSetCurrentGuessFn).not.toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
  });

  it("everything is fine, updates the state", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockSetCurrentGuessFn = jest.fn();
    const mockSetIsCurrentGuessIncorrect = jest.fn();

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      isGameOver: false,
      isGuessAnimationFiring: false,
      setCurrentGuess: mockSetCurrentGuessFn as Dispatch<
        SetStateAction<string>
      >,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect as Dispatch<
        SetStateAction<boolean>
      >,
    } as WordleState);

    // Action
    const bindingFn = useBackspaceBinding();
    bindingFn();

    // Assert
    expect(mockSetCurrentGuessFn).toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).toHaveBeenCalledWith(false);

    const setMockSetCurrentGuessCallback = mockSetCurrentGuessFn.mock
      .calls[0][0] as (value: string) => string;
    const returnValue = setMockSetCurrentGuessCallback("test");

    expect(returnValue).toBe("tes");
  });
});
