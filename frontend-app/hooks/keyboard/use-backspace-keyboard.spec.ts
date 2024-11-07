jest.mock("@/hooks/bindings/use-backspace-binding");

import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useBackspaceBinding from "@/hooks/bindings/use-backspace-binding";

import useBackspaceKeyboard from "./use-backspace-keyboard";

describe("useBackspaceKeyboard", () => {
  it("user presses Backspace, useBackspaceBinding function is called", async () => {
    // Arrange
    const user = userEvent.setup();
    const handleBackspaceFn = jest.fn();
    (
      useBackspaceBinding as jest.MockedFunction<typeof useBackspaceBinding>
    ).mockImplementationOnce(() => handleBackspaceFn);

    renderHook(() => useBackspaceKeyboard());

    // Action
    await user.keyboard("[Backspace]");

    // Assert
    expect(handleBackspaceFn).toHaveBeenCalled();
  });

  it("user does not press Backspace, useBackspaceBinding function is not called", async () => {
    // Arrange
    const user = userEvent.setup();
    const handleBackspaceFn = jest.fn();
    (
      useBackspaceBinding as jest.MockedFunction<typeof useBackspaceBinding>
    ).mockImplementationOnce(() => handleBackspaceFn);

    renderHook(() => useBackspaceKeyboard());

    // Action
    await user.keyboard("a");

    // Assert
    expect(handleBackspaceFn).not.toHaveBeenCalled();
  });
});
