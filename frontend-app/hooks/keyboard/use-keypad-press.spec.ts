jest.mock("@/hooks/bindings/use-alphabet-binding");
jest.mock("@/hooks/bindings/use-backspace-binding");
jest.mock("@/hooks/bindings/use-enter-binding");

import useAlphabetBinding from "@/hooks/bindings/use-alphabet-binding";
import useBackspaceBinding from "@/hooks/bindings/use-backspace-binding";
import useEnterBinding from "@/hooks/bindings/use-enter-binding";

import useKeypadPress from "./use-keypad-press";

describe("useKeypadPress", () => {
  it("keyboard button is a letter, calls correct key handler", () => {
    // Arrange
    const keyPressed = "a";
    const mockHandleAlphabetCharacter = jest.fn();
    const mockHandleBackspace = jest.fn();
    const mockHandleEnter = jest.fn();

    (
      useAlphabetBinding as jest.MockedFunction<typeof useAlphabetBinding>
    ).mockImplementationOnce(() => mockHandleAlphabetCharacter);
    (
      useBackspaceBinding as jest.MockedFunction<typeof useBackspaceBinding>
    ).mockImplementationOnce(() => mockHandleBackspace);
    (
      useEnterBinding as jest.MockedFunction<typeof useEnterBinding>
    ).mockImplementationOnce(() => mockHandleEnter);

    const keyPressHandler = useKeypadPress();

    // Action
    keyPressHandler(keyPressed);

    // Assert
    expect(mockHandleAlphabetCharacter).toHaveBeenCalledWith(keyPressed);
    expect(mockHandleBackspace).not.toHaveBeenCalled();
    expect(mockHandleEnter).not.toHaveBeenCalled();
  });

  it("keyboard button is a backspace, calls correct key handler", () => {
    // Arrange
    const keyPressed = "Backspace";
    const mockHandleAlphabetCharacter = jest.fn();
    const mockHandleBackspace = jest.fn();
    const mockHandleEnter = jest.fn();

    (
      useAlphabetBinding as jest.MockedFunction<typeof useAlphabetBinding>
    ).mockImplementationOnce(() => mockHandleAlphabetCharacter);
    (
      useBackspaceBinding as jest.MockedFunction<typeof useBackspaceBinding>
    ).mockImplementationOnce(() => mockHandleBackspace);
    (
      useEnterBinding as jest.MockedFunction<typeof useEnterBinding>
    ).mockImplementationOnce(() => mockHandleEnter);

    const keyPressHandler = useKeypadPress();

    // Action
    keyPressHandler(keyPressed);

    // Assert
    expect(mockHandleAlphabetCharacter).not.toHaveBeenCalled();
    expect(mockHandleBackspace).toHaveBeenCalled();
    expect(mockHandleEnter).not.toHaveBeenCalled();
  });

  it("keyboard button is an enter, calls correct key handler", () => {
    // Arrange
    const keyPressed = "Enter";
    const mockHandleAlphabetCharacter = jest.fn();
    const mockHandleBackspace = jest.fn();
    const mockHandleEnter = jest.fn();

    (
      useAlphabetBinding as jest.MockedFunction<typeof useAlphabetBinding>
    ).mockImplementationOnce(() => mockHandleAlphabetCharacter);
    (
      useBackspaceBinding as jest.MockedFunction<typeof useBackspaceBinding>
    ).mockImplementationOnce(() => mockHandleBackspace);
    (
      useEnterBinding as jest.MockedFunction<typeof useEnterBinding>
    ).mockImplementationOnce(() => mockHandleEnter);

    const keyPressHandler = useKeypadPress();

    // Action
    keyPressHandler(keyPressed);

    // Assert
    expect(mockHandleAlphabetCharacter).not.toHaveBeenCalled();
    expect(mockHandleBackspace).not.toHaveBeenCalled();
    expect(mockHandleEnter).toHaveBeenCalled();
  });
});
