jest.mock("@/hooks/bindings/use-alphabet-binding");

import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useAlphabetBinding from "@/hooks/bindings/use-alphabet-binding";

import useAlphabetKeyboard from "./use-alphabet-keyboard";

describe("useAlphabetKeyboard", () => {
  it("useAlphabetBinding function can be called with all the letters of the alphabet", async () => {
    // Arrange
    const user = userEvent.setup();
    const handleAlphabetCharacterFn = jest.fn();
    (
      useAlphabetBinding as jest.MockedFunction<typeof useAlphabetBinding>
    ).mockImplementationOnce(() => handleAlphabetCharacterFn);

    renderHook(() => useAlphabetKeyboard());

    // Action / Assert
    const letters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];

    for (let i = 0; i < letters.length; i++) {
      // Action
      const letter = letters[i];

      await user.keyboard(letter!);

      // Assert
      expect(handleAlphabetCharacterFn).toHaveBeenCalledWith(letter);
    }
  });

  it("useAlphabetBinding is not when when not using a letters of the alphabet", async () => {
    // Arrange
    const user = userEvent.setup();
    const handleAlphabetCharacterFn = jest.fn();
    (
      useAlphabetBinding as jest.MockedFunction<typeof useAlphabetBinding>
    ).mockImplementationOnce(() => handleAlphabetCharacterFn);

    renderHook(() => useAlphabetKeyboard());

    // Action / Assert
    const letters = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "{\\]}",
      "{\\[}",
      "\\",
      ",",
      ".",
      "/",
      "`",
      "[Enter]",
      "[Backspace]",
    ];

    for (let i = 0; i < letters.length; i++) {
      // Action
      const letter = letters[i];

      await user.keyboard(letter!);

      // Assert
      expect(handleAlphabetCharacterFn).not.toHaveBeenCalled();
    }
  });
});
