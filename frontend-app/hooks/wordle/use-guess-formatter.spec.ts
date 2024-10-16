jest.mock("@/hooks/wordle/use-wordle");

import { WordleState } from "@/contexts/wordle-context";
import { GuessColour } from "@/lib/enums";
import useWordle from "@/hooks/wordle/use-wordle";

import useGuessFormatter from "./use-guess-formatter";

describe("useGuessFormatter", () => {
  it("first turn and guess is not the solution, calls correct wordle dispatchers", () => {
    // Arrange
    const currentGuess = "chair";
    const solution = "peach";

    (useWordle as jest.MockedFunction<typeof useWordle>).mockImplementationOnce(
      () =>
        ({
          currentGuess,
          solution,
        } as WordleState)
    );

    const formatGuess = useGuessFormatter();

    // Action
    const formattedGuess = formatGuess();

    // Assert
    expect(formattedGuess[0].letter).toBe("c");
    expect(formattedGuess[0].colour).toBe(GuessColour.yellow);
    expect(formattedGuess[1].letter).toBe("h");
    expect(formattedGuess[1].colour).toBe(GuessColour.yellow);
    expect(formattedGuess[2].letter).toBe("a");
    expect(formattedGuess[2].colour).toBe(GuessColour.green);
    expect(formattedGuess[3].letter).toBe("i");
    expect(formattedGuess[3].colour).toBe(GuessColour.grey);
    expect(formattedGuess[4].letter).toBe("r");
    expect(formattedGuess[4].colour).toBe(GuessColour.grey);
  });
});
