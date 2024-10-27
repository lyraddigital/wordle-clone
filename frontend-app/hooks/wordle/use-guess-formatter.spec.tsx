import { PropsWithChildren } from "react";
import { renderHook } from "@testing-library/react";

import WordleContext, { WordleState } from "@/contexts/wordle-context";
import { GuessColour } from "@/lib/enums";

import useGuessFormatter from "./use-guess-formatter";

const createWrapperComponent = (
  currentGuess: string,
  solution: string
): React.FC<PropsWithChildren> => {
  return function WrapperComponent({
    children,
  }: PropsWithChildren): React.ReactNode {
    const wordleState = {
      currentGuess,
      solution,
    } as WordleState;

    return (
      <WordleContext.Provider value={wordleState}>
        {children}
      </WordleContext.Provider>
    );
  };
};

describe("useGuessFormatter", () => {
  it("first turn and guess is not the solution, calls correct wordle dispatchers", () => {
    // Arrange
    const wrapper = createWrapperComponent(
      "chair",
      "peach"
    );

    const { result } = renderHook(() => useGuessFormatter(), { wrapper });

    // Action
    const formattedGuess = result.current();

    // Assert
    expect(formattedGuess[0]).toBeDefined();
    expect(formattedGuess[0]!.letter).toBe("c");
    expect(formattedGuess[0]!.colour).toBe(GuessColour.yellow);
    expect(formattedGuess[1]).toBeDefined();
    expect(formattedGuess[1]!.letter).toBe("h");
    expect(formattedGuess[1]!.colour).toBe(GuessColour.yellow);
    expect(formattedGuess[2]).toBeDefined();
    expect(formattedGuess[2]!.letter).toBe("a");
    expect(formattedGuess[2]!.colour).toBe(GuessColour.green);
    expect(formattedGuess[3]).toBeDefined();
    expect(formattedGuess[3]!.letter).toBe("i");
    expect(formattedGuess[3]!.colour).toBe(GuessColour.grey);
    expect(formattedGuess[4]).toBeDefined();
    expect(formattedGuess[4]!.letter).toBe("r");
    expect(formattedGuess[4]!.colour).toBe(GuessColour.grey);
  });
});
