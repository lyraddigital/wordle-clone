import { act, PropsWithChildren, useState } from "react";
import { renderHook, screen } from "@testing-library/react";

import ModalsContext, { ModalsState } from "@/contexts/modals-context";
import WordleContext, { WordleState } from "@/contexts/wordle-context";

import useAlphabetBinding from "./use-alphabet-binding";

const createWrapperComponent = (
  defaultCurrentGuess: string,
  defaultIsCurrentGuessIncorrect: boolean,
  defaultIsGameOver: boolean,
  defaultIsGuessAnimationFiring: boolean,
  defaultShowStatisticsModal: boolean,
  defaultShowHelpModal: boolean
): React.FC<PropsWithChildren> => {
  return function WrapperComponent({ children }: PropsWithChildren): React.ReactNode {
    const [currentGuess, setCurrentGuess] = useState<string>(defaultCurrentGuess);
    const [isCurrentGuessIncorrect, setIsCurrentGuessIncorrect] = useState<boolean>(defaultIsCurrentGuessIncorrect);
    const [isGameOver] = useState<boolean>(defaultIsGameOver);
    const [isGuessAnimationFiring] = useState<boolean>(defaultIsGuessAnimationFiring);
    const [showStatisticsModal] = useState<boolean>(defaultShowStatisticsModal);
    const [showHelpModal] = useState<boolean>(defaultShowHelpModal);

    const wordleState = {
      isGameOver,
      isGuessAnimationFiring,
      currentGuess,
      setCurrentGuess,
      setIsCurrentGuessIncorrect
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
          <div data-testid="is-current-guess-incorrect">{isCurrentGuessIncorrect.toString()}</div>
        </ModalsContext.Provider>
      </WordleContext.Provider>
    )
  };
}

describe("useAlphabetBinding", () => {
  it("current guess is less than 5 characters, but game is over, does not update state", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      true,
      true,
      false,
      false,
      false
    );
    const { result } = renderHook(() => useAlphabetBinding(), { wrapper });

    // Action
    act(() => {
      result.current('a');
    });

    const guessElement = screen.getByTestId('current-guess');
    const isCurrentGuessIncorrectElement = screen.getByTestId('is-current-guess-incorrect');

    // Assert    
    expect(guessElement.textContent).toBe('test');
    expect(isCurrentGuessIncorrectElement.textContent).toBe('true');
  });

  it("current guess is less than 5 characters, but guess animation is firing, does not update state", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      true,
      false,
      true,
      false,
      false
    );
    const { result } = renderHook(() => useAlphabetBinding(), { wrapper });

    // Action
    act(() => {
      result.current('a');
    });

    const guessElement = screen.getByTestId('current-guess');
    const isCurrentGuessIncorrectElement = screen.getByTestId('is-current-guess-incorrect');

    // Assert    
    expect(guessElement.textContent).toBe('test');
    expect(isCurrentGuessIncorrectElement.textContent).toBe('true');
  });

  it("current guess is less than 5 characters, but statistic modal is showing, does not update state", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      true,
      false,
      false,
      true,
      false
    );
    const { result } = renderHook(() => useAlphabetBinding(), { wrapper });

    // Action
    act(() => {
      result.current('a');
    });

    const guessElement = screen.getByTestId('current-guess');
    const isCurrentGuessIncorrectElement = screen.getByTestId('is-current-guess-incorrect');

    // Assert    
    expect(guessElement.textContent).toBe('test');
    expect(isCurrentGuessIncorrectElement.textContent).toBe('true');
  });

  it("current guess is less than 5 characters, but help modal is showing, does not update state", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      true,
      false,
      false,
      false,
      true
    );
    const { result } = renderHook(() => useAlphabetBinding(), { wrapper });

    // Action
    act(() => {
      result.current('a');
    });

    const guessElement = screen.getByTestId('current-guess');
    const isCurrentGuessIncorrectElement = screen.getByTestId('is-current-guess-incorrect');

    // Assert    
    expect(guessElement.textContent).toBe('test');
    expect(isCurrentGuessIncorrectElement.textContent).toBe('true');
  });

  it("current guess is less than 5 characters, and everything is fine, updates the state", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      true,
      false,
      false,
      false,
      false
    );
    const { result } = renderHook(() => useAlphabetBinding(), { wrapper });

    // Action
    act(() => {
      result.current('a');
    });

    const guessElement = screen.getByTestId('current-guess');
    const isCurrentGuessIncorrectElement = screen.getByTestId('is-current-guess-incorrect');

    // Assert    
    expect(guessElement.textContent).toBe('testa');
    expect(isCurrentGuessIncorrectElement.textContent).toBe('false');
  });

  it("current guess is 5 characters, does not update state", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'tests',
      true,
      false,
      false,
      false,
      false
    );
    const { result } = renderHook(() => useAlphabetBinding(), { wrapper });

    // Action
    act(() => {
      result.current('a');
    });

    const guessElement = screen.getByTestId('current-guess');
    const isCurrentGuessIncorrectElement = screen.getByTestId('is-current-guess-incorrect');

    // Assert    
    expect(guessElement.textContent).toBe('tests');
    expect(isCurrentGuessIncorrectElement.textContent).toBe('true');
  });
});
