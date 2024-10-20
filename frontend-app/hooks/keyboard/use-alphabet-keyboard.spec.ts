jest.mock("react-hotkeys-hook");
jest.mock("@/hooks/bindings/use-alphabet-binding");

import { useHotkeys } from "react-hotkeys-hook";

import useAlphabetBinding from "@/hooks/bindings/use-alphabet-binding";

import useAlphabetKeyboard from "./use-alphabet-keyboard";

describe("useAlphabetKeyboard", () => {
  it("useHostKeys is called with all the letters of the alphabet", () => {
    // Arrange / Action
    useAlphabetKeyboard();

    // Assert
    expect(useHotkeys).toHaveBeenCalled();

    const useHotkeysCall = (
      useHotkeys as jest.MockedFunction<typeof useHotkeys>
    ).mock.calls[0];
    const lettersArray = useHotkeysCall ? useHotkeysCall[0] : [];

    expect(lettersArray).toStrictEqual([
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
    ]);
  });

  it("useAlphabetBinding function is called with a letter", () => {
    // Arrange
    const handleAlphabetCharacterFn = jest.fn();
    (
      useAlphabetBinding as jest.MockedFunction<typeof useAlphabetBinding>
    ).mockImplementationOnce(() => handleAlphabetCharacterFn);

    useAlphabetKeyboard();

    const useHotKeysCall = (
      useHotkeys as jest.MockedFunction<typeof useHotkeys>
    ).mock.calls[0];
    const callback =
      useHotKeysCall && useHotKeysCall.length > 1
        ? useHotKeysCall[1]
        : undefined;

    // Action
    callback && callback({} as KeyboardEvent, { keys: ["a"] });

    // Assert
    expect(handleAlphabetCharacterFn).toHaveBeenCalled();
  });

  it("useAlphabetBinding function is called with no key", () => {
    // Arrange
    const handleAlphabetCharacterFn = jest.fn();
    (
      useAlphabetBinding as jest.MockedFunction<typeof useAlphabetBinding>
    ).mockImplementationOnce(() => handleAlphabetCharacterFn);

    useAlphabetKeyboard();

    const useHotKeysCall = (
      useHotkeys as jest.MockedFunction<typeof useHotkeys>
    ).mock.calls[0];
    const callback =
      useHotKeysCall && useHotKeysCall.length > 1
        ? useHotKeysCall[1]
        : undefined;

    // Action
    callback && callback({} as KeyboardEvent, {});

    // Assert
    expect(handleAlphabetCharacterFn).not.toHaveBeenCalled();
  });
});
