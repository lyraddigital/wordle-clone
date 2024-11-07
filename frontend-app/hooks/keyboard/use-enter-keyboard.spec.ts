jest.mock("@/hooks/bindings/use-enter-binding");

import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useEnterBinding from "@/hooks/bindings/use-enter-binding";

import useEnterKeyboard from "./use-enter-keyboard";

describe("useEnterKeyboard", () => {
  it("user presses Enter, useEnterBinding function is called", async () => {
    // Arrange
    const user = userEvent.setup();
    const handleEnterFn = jest.fn();
    (
      useEnterBinding as jest.MockedFunction<typeof useEnterBinding>
    ).mockImplementationOnce(() => handleEnterFn);

    renderHook(() => useEnterKeyboard());

    // Action
    await user.keyboard("[Enter]");

    // Assert
    expect(handleEnterFn).toHaveBeenCalled();
  });

  it("user does not press Enter, handleEnterFn function is not called", async () => {
    // Arrange
    const user = userEvent.setup();
    const handleEnterFn = jest.fn();
    (
      useEnterBinding as jest.MockedFunction<typeof useEnterBinding>
    ).mockImplementationOnce(() => handleEnterFn);

    renderHook(() => useEnterKeyboard());

    // Action
    await user.keyboard("a");

    // Assert
    expect(handleEnterFn).not.toHaveBeenCalled();
  });
});
