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

    const useHotkeysCall = (
      useHotkeys as jest.MockedFunction<typeof useHotkeys>
    ).mock.calls[0];
    const bindingCharacter = useHotkeysCall ? useHotkeysCall[0] : "";

    expect(bindingCharacter).toBe("Backspace");
  });

  it("useBackspaceBinding function is called", () => {
    // Arrange
    const useBackspaceBindingFn = jest.fn();
    (
      useBackspaceBinding as jest.MockedFunction<typeof useBackspaceBinding>
    ).mockImplementationOnce(() => useBackspaceBindingFn);

    useBackspaceKeyboard();

    const useHotkeysCall = (
      useHotkeys as jest.MockedFunction<typeof useHotkeys>
    ).mock.calls[0];

    const callback = useHotkeysCall ? useHotkeysCall[1] : undefined;

    // Action
    callback && callback!({} as KeyboardEvent, {});

    // Assert
    expect(useBackspaceBindingFn).toHaveBeenCalled();
  });
});
