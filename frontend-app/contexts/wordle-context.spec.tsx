jest.mock('react');

import { createContext } from "react";

describe("WordleContext", () => {
    it("should call createContext with a the parameter being an empty WordleContext", () => {
        // Arrange
        const createContextMock = jest.fn();

        (
            createContext as jest.MockedFunction<typeof createContext>
        ).mockImplementationOnce(createContextMock);

        // Action
        require('./wordle-context');

        // Assert
        expect(createContextMock).toHaveBeenCalled();
        expect(createContextMock.mock.calls[0][0]).toStrictEqual({});
    });
});