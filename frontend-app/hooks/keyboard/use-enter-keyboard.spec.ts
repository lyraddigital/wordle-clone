jest.mock("react-hotkeys-hook");
jest.mock("@/hooks/bindings/use-enter-binding");

import { useHotkeys } from "react-hotkeys-hook";

import useEnterBinding from "@/hooks/bindings/use-enter-binding";

import useEnterKeyboard from "./use-enter-keyboard";

describe("useEnterKeyboard", () => {
  it("useHostKeys is called with 'Enter'", () => {
    // Arrange / Action
    useEnterKeyboard();

    // Assert
    expect(useHotkeys).toHaveBeenCalled();

    const bindingCharacter = (
      useHotkeys as jest.MockedFunction<typeof useHotkeys>
    ).mock.calls[0][0];

    expect(bindingCharacter).toBe("enter");
  });

  it("useEnterBinding function is called", () => {
    // Arrange
    const useEnterBindingFn = jest.fn();
    (
      useEnterBinding as jest.MockedFunction<typeof useEnterBinding>
    ).mockImplementationOnce(() => useEnterBindingFn);

    useEnterKeyboard();

    const callback = (useHotkeys as jest.MockedFunction<typeof useHotkeys>).mock
      .calls[0][1];

    // Action
    callback({} as KeyboardEvent, {});

    // Assert
    expect(useEnterBindingFn).toHaveBeenCalled();
  });
});
