jest.mock("react");

import { useContext } from "react";
import useStatistics from "@/hooks/statistics/use-statistics";
import StatisticsContext from "@/contexts/statistics-context";

describe("useStatistics", () => {
  it("should call useContext with a the parameter being a StatisticsContext", () => {
    // Arrange
    const useContextMock = jest.fn();

    (
      useContext as jest.MockedFunction<typeof useContext>
    ).mockImplementationOnce(useContextMock);

    // Action
    useStatistics();

    // Assert
    expect(useContextMock).toHaveBeenCalled();
    expect(useContextMock.mock.calls[0][0]).toBe(StatisticsContext);
  });
});
