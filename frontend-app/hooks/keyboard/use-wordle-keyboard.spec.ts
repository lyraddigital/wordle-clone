jest.mock("@/hooks/keyboard/use-alphabet-keyboard");
jest.mock("@/hooks/keyboard/use-backspace-keyboard");
jest.mock("@/hooks/keyboard/use-enter-keyboard");

import useAlphabetKeyboard from "@/hooks/keyboard/use-alphabet-keyboard";
import useEnterKeyboard from "@/hooks/keyboard/use-backspace-keyboard";
import useBackspaceKeyboard from "@/hooks/keyboard/use-enter-keyboard";

import useWordleKeyboard from "./use-wordle-keyboard";

describe("useWordleKeyboard", () => {
  it("calls all the correct hooks", () => {
    // Arrange
    const keyPressed = "a";
    const mockUseAlphabetKeyboard = jest.fn();
    const mockUseEnterKeyboard = jest.fn();
    const mockUseBackspaceKeyboard = jest.fn();

    (
      useAlphabetKeyboard as jest.MockedFunction<typeof useAlphabetKeyboard>
    ).mockImplementationOnce(mockUseAlphabetKeyboard);
    (
      useEnterKeyboard as jest.MockedFunction<typeof useEnterKeyboard>
    ).mockImplementationOnce(mockUseEnterKeyboard);
    (
      useBackspaceKeyboard as jest.MockedFunction<typeof useBackspaceKeyboard>
    ).mockImplementationOnce(mockUseBackspaceKeyboard);

    // Action
    useWordleKeyboard();

    // Assert
    expect(mockUseAlphabetKeyboard).toHaveBeenCalled();
    expect(mockUseEnterKeyboard).toHaveBeenCalled();
    expect(mockUseBackspaceKeyboard).toHaveBeenCalled();
  });
});
