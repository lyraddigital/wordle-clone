jest.mock('react');

import { createContext } from "react";

describe("ThemeContext", () => {
    it("should call createContext with a the parameter being an empty ThemeContext", () => {
        // Arrange
        const createContextMock = jest.fn();

        (
            createContext as jest.MockedFunction<typeof createContext>
        ).mockImplementationOnce(createContextMock);

        // Action
        require('./theme-context');

        // Assert
        expect(createContextMock).toHaveBeenCalled();
        expect(createContextMock.mock.calls[0][0]).toStrictEqual({});
    });
});