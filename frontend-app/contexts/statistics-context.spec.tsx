jest.mock('react');

import { createContext } from "react";

describe("StatisticsContext", () => {
    it("should call createContext with a the parameter being an empty StatisticsContext", () => {
        // Arrange
        const createContextMock = jest.fn();

        (
            createContext as jest.MockedFunction<typeof createContext>
        ).mockImplementationOnce(createContextMock);

        // Action
        require('./statistics-context');

        // Assert
        expect(createContextMock).toHaveBeenCalled();
        expect(createContextMock.mock.calls[0][0]).toStrictEqual({});
    });
});