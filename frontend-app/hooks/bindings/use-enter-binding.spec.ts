jest.mock("react-hot-toast");
jest.mock("@/data/words");
jest.mock("@/hooks/modals/use-modals");
jest.mock("@/hooks/wordle/use-wordle");
jest.mock("@/hooks/wordle/use-add-new-guess-handler");
jest.mock("@/hooks/wordle/use-guess-formatter");

import { Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";

import { wordExists } from "@/data/words";
import { ModalsState } from "@/contexts/modals-context";
import { WordleState } from "@/contexts/wordle-context";
import { GuessColour } from "@/lib/enums";
import { GuessLetterResult } from "@/lib/types";
import useModals from "@/hooks/modals/use-modals";
import useWordle from "@/hooks/wordle/use-wordle";
import useAddNewGuessHandler from "@/hooks/wordle/use-add-new-guess-handler";
import useGuessFormatter from "@/hooks/wordle/use-guess-formatter";

import useEnterBinding from "./use-enter-binding";

describe("useEnterBinding", () => {
  it("game is over, does not handle new guess", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockAddNewGuess = jest.fn() as (
      formattedGuess: GuessLetterResult[]
    ) => void;

    const mockGuessFormatter = jest.fn() as () => GuessLetterResult[];

    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockReturnValueOnce(mockAddNewGuess);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockReturnValueOnce(mockGuessFormatter);

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      currentGuess: "test",
      history: [] as string[],
      isGameOver: true,
      isGuessAnimationFiring: false,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useEnterBinding();
    bindingFn();

    // Assert
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
    expect(mockAddNewGuess).not.toHaveBeenCalled();
    expect(mockGuessFormatter).not.toHaveBeenCalled();
    expect(toast).not.toHaveBeenCalled();
  });

  it("guess is animating, does not handle new guess", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockAddNewGuess = jest.fn() as (
      formattedGuess: GuessLetterResult[]
    ) => void;

    const mockGuessFormatter = jest.fn() as () => GuessLetterResult[];

    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockReturnValueOnce(mockAddNewGuess);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockReturnValueOnce(mockGuessFormatter);

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      currentGuess: "test",
      history: [] as string[],
      isGameOver: false,
      isGuessAnimationFiring: true,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useEnterBinding();
    bindingFn();

    // Assert
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
    expect(mockAddNewGuess).not.toHaveBeenCalled();
    expect(mockGuessFormatter).not.toHaveBeenCalled();
    expect(toast).not.toHaveBeenCalled();
  });

  it("statistics modal is showing, does not handle new guess", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: true,
      showHelpModal: false,
    } as ModalsState);

    const mockAddNewGuess = jest.fn() as (
      formattedGuess: GuessLetterResult[]
    ) => void;

    const mockGuessFormatter = jest.fn() as () => GuessLetterResult[];

    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockReturnValueOnce(mockAddNewGuess);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockReturnValueOnce(mockGuessFormatter);

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      currentGuess: "test",
      history: [] as string[],
      isGameOver: false,
      isGuessAnimationFiring: false,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useEnterBinding();
    bindingFn();

    // Assert
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
    expect(mockAddNewGuess).not.toHaveBeenCalled();
    expect(mockGuessFormatter).not.toHaveBeenCalled();
    expect(toast).not.toHaveBeenCalled();
  });

  it("help modal is showing, does not handle new guess", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: false,
      showHelpModal: true,
    } as ModalsState);

    const mockAddNewGuess = jest.fn() as (
      formattedGuess: GuessLetterResult[]
    ) => void;

    const mockGuessFormatter = jest.fn() as () => GuessLetterResult[];

    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockReturnValueOnce(mockAddNewGuess);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockReturnValueOnce(mockGuessFormatter);

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      currentGuess: "test",
      history: [] as string[],
      isGameOver: false,
      isGuessAnimationFiring: false,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useEnterBinding();
    bindingFn();

    // Assert
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
    expect(mockAddNewGuess).not.toHaveBeenCalled();
    expect(mockGuessFormatter).not.toHaveBeenCalled();
    expect(toast).not.toHaveBeenCalled();
  });

  it("word already in history, does not handle new guess", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockAddNewGuess = jest.fn() as (
      formattedGuess: GuessLetterResult[]
    ) => void;

    const mockGuessFormatter = jest.fn() as () => GuessLetterResult[];

    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockReturnValueOnce(mockAddNewGuess);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockReturnValueOnce(mockGuessFormatter);

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      currentGuess: "peach",
      history: ["peach"] as string[],
      isGameOver: false,
      isGuessAnimationFiring: false,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useEnterBinding();
    bindingFn();

    // Assert
    expect(mockSetIsCurrentGuessIncorrect).toHaveBeenCalledWith(true);
    expect(mockAddNewGuess).not.toHaveBeenCalled();
    expect(mockGuessFormatter).not.toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith("You have already tried that word");
  });

  it("word not 5 characters, does not handle new guess", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockAddNewGuess = jest.fn() as (
      formattedGuess: GuessLetterResult[]
    ) => void;

    const mockGuessFormatter = jest.fn() as () => GuessLetterResult[];

    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockReturnValueOnce(mockAddNewGuess);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockReturnValueOnce(mockGuessFormatter);

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      currentGuess: "test",
      history: [] as string[],
      isGameOver: false,
      isGuessAnimationFiring: false,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    // Action
    const bindingFn = useEnterBinding();
    bindingFn();

    // Assert
    expect(mockSetIsCurrentGuessIncorrect).toHaveBeenCalledWith(true);
    expect(toast).toHaveBeenCalledWith("Word must be 5 characters long");
  });

  it("word does not exist, does not handle new guess", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const mockAddNewGuess = jest.fn() as (
      formattedGuess: GuessLetterResult[]
    ) => void;

    const mockGuessFormatter = jest.fn() as () => GuessLetterResult[];

    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockReturnValueOnce(mockAddNewGuess);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockReturnValueOnce(mockGuessFormatter);

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      currentGuess: "peach",
      history: [] as string[],
      isGameOver: false,
      isGuessAnimationFiring: false,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    (wordExists as jest.MockedFunction<typeof wordExists>).mockReturnValueOnce(
      false
    );

    // Action
    const bindingFn = useEnterBinding();
    bindingFn();

    // Assert
    expect(wordExists).toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).toHaveBeenCalledWith(true);
    expect(mockAddNewGuess).not.toHaveBeenCalled();
    expect(mockGuessFormatter).not.toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith("Word does not exist");
  });

  it("everything value, handles new guess", () => {
    (useModals as jest.MockedFunction<typeof useModals>).mockReturnValueOnce({
      showStatisticsModal: false,
      showHelpModal: false,
    } as ModalsState);

    const formattedGuess: GuessLetterResult[] = [
      { letter: "a", colour: GuessColour.green },
    ];
    const mockAddNewGuess = jest.fn() as (
      formattedGuess: GuessLetterResult[]
    ) => void;

    const mockGuessFormatter = jest
      .fn()
      .mockImplementationOnce(
        () => formattedGuess
      ) as () => GuessLetterResult[];

    const mockSetIsCurrentGuessIncorrect = jest.fn() as Dispatch<
      SetStateAction<boolean>
    >;

    (
      useAddNewGuessHandler as jest.MockedFunction<typeof useAddNewGuessHandler>
    ).mockReturnValueOnce(mockAddNewGuess);

    (
      useGuessFormatter as jest.MockedFunction<typeof useGuessFormatter>
    ).mockReturnValueOnce(mockGuessFormatter);

    (useWordle as jest.MockedFunction<typeof useWordle>).mockReturnValueOnce({
      currentGuess: "peach",
      history: [] as string[],
      isGameOver: false,
      isGuessAnimationFiring: false,
      setIsCurrentGuessIncorrect: mockSetIsCurrentGuessIncorrect,
    } as WordleState);

    (wordExists as jest.MockedFunction<typeof wordExists>).mockReturnValueOnce(
      true
    );

    // Action
    const bindingFn = useEnterBinding();
    bindingFn();

    // Assert
    expect(wordExists).toHaveBeenCalled();
    expect(mockSetIsCurrentGuessIncorrect).not.toHaveBeenCalled();
    expect(mockGuessFormatter).toHaveBeenCalled();
    expect(mockAddNewGuess).toHaveBeenCalledWith(formattedGuess);
    expect(toast).not.toHaveBeenCalled();
  });
});
