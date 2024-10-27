import { act, PropsWithChildren, useState } from "react";
import { renderHook, screen } from "@testing-library/react";

import ModalsContext, { ModalsState } from "@/contexts/modals-context";
import WordleContext, { WordleState } from "@/contexts/wordle-context";

import useBackspaceBinding from "./use-backspace-binding";

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

describe("useBackspaceBinding", () => {
  it("game is over, does not update state", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      true,
      true,
      false,
      false,
      false
    );
    const { result } = renderHook(() => useBackspaceBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const guessElement = screen.getByTestId('current-guess');
    const isCurrentGuessIncorrectElement = screen.getByTestId('is-current-guess-incorrect');

    // Assert    
    expect(guessElement.textContent).toBe('test');
    expect(isCurrentGuessIncorrectElement.textContent).toBe('true');
  });

  it("game animation is firing, does not update state", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      true,
      false,
      true,
      false,
      false
    );
    const { result } = renderHook(() => useBackspaceBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const guessElement = screen.getByTestId('current-guess');
    const isCurrentGuessIncorrectElement = screen.getByTestId('is-current-guess-incorrect');

    // Assert    
    expect(guessElement.textContent).toBe('test');
    expect(isCurrentGuessIncorrectElement.textContent).toBe('true');
  });

  it("statistic modal is showing, does not update state", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      true,
      false,
      false,
      true,
      false
    );
    const { result } = renderHook(() => useBackspaceBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const guessElement = screen.getByTestId('current-guess');
    const isCurrentGuessIncorrectElement = screen.getByTestId('is-current-guess-incorrect');

    // Assert
    expect(guessElement.textContent).toBe('test');
    expect(isCurrentGuessIncorrectElement.textContent).toBe('true');
  });

  it("help modal is showing, does not update state", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      true,
      false,
      false,
      false,
      true
    );
    const { result } = renderHook(() => useBackspaceBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const guessElement = screen.getByTestId('current-guess');
    const isCurrentGuessIncorrectElement = screen.getByTestId('is-current-guess-incorrect');

    // Assert
    expect(guessElement.textContent).toBe('test');
    expect(isCurrentGuessIncorrectElement.textContent).toBe('true');
  });

  it("everything is fine, updates the state", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      'test',
      true,
      false,
      false,
      false,
      false
    );
    const { result } = renderHook(() => useBackspaceBinding(), { wrapper });

    // Action
    act(() => {
      result.current();
    });

    const guessElement = screen.getByTestId('current-guess');
    const isCurrentGuessIncorrectElement = screen.getByTestId('is-current-guess-incorrect');

    // Assert
    expect(guessElement.textContent).toBe('tes');
    expect(isCurrentGuessIncorrectElement.textContent).toBe('false');
  });
});
