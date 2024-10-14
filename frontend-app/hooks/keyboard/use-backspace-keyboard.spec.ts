jest.mock("react-hotkeys-hook");
jest.mock("@/hooks/bindings/use-backspace-binding");

import { useHotkeys } from "react-hotkeys-hook";

import useBackspaceBinding from "@/hooks/bindings/use-backspace-binding";

import useBackspaceKeyboard from "./use-backspace-keyboard";

describe("useBackspaceKeyboard", () => {
  it("useHostKeys is called with 'Backspace'", () => {
    // Arrange / Action
    useBackspaceKeyboard();

    // Assert
    expect(useHotkeys).toHaveBeenCalled();

    const bindingCharacter = (
      useHotkeys as jest.MockedFunction<typeof useHotkeys>
    ).mock.calls[0][0];

    expect(bindingCharacter).toBe("Backspace");
  });

  it("useBackspaceBinding function is called", () => {
    // Arrange
    const useBackspaceBindingFn = jest.fn();
    (
      useBackspaceBinding as jest.MockedFunction<typeof useBackspaceBinding>
    ).mockImplementationOnce(() => useBackspaceBindingFn);

    useBackspaceKeyboard();

    const callback = (useHotkeys as jest.MockedFunction<typeof useHotkeys>).mock
      .calls[0][1];

    // Action
    callback({} as KeyboardEvent, {});

    // Assert
    expect(useBackspaceBindingFn).toHaveBeenCalled();
  });
});
