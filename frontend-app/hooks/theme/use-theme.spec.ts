jest.mock("react");

import { useContext } from "react";
import ThemeContext from "@/contexts/theme-context";
import useTheme from "./use-theme";

describe("useTheme", () => {
  it("should call useContext with a the parameter being a ThemeContext", () => {
    // Arrange
    const useContextMock = jest.fn();

    (
      useContext as jest.MockedFunction<typeof useContext>
    ).mockImplementationOnce(useContextMock);

    // Action
    useTheme();

    // Assert
    expect(useContextMock).toHaveBeenCalled();
    expect(useContextMock.mock.calls[0][0]).toBe(ThemeContext);
  });
});
