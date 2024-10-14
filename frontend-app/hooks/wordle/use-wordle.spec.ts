jest.mock("react");

import { useContext } from "react";
import WordleContext from "@/contexts/wordle-context";
import useWordle from "./use-wordle";

describe("useWordle", () => {
  it("should call useContext with a the parameter being a WordleContext", () => {
    // Arrange
    const useContextMock = jest.fn();

    (
      useContext as jest.MockedFunction<typeof useContext>
    ).mockImplementationOnce(useContextMock);

    // Action
    useWordle();

    // Assert
    expect(useContextMock).toHaveBeenCalled();
    expect(useContextMock.mock.calls[0][0]).toBe(WordleContext);
  });
});
