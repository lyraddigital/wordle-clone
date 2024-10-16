jest.mock('react');

import { createContext } from "react";

describe("ModalsContext", () => {
    it("should call createContext with a the parameter being an empty ModalContext", () => {
        // Arrange        
        const createContextMock = jest.fn();

        (
            createContext as jest.MockedFunction<typeof createContext>
        ).mockImplementationOnce(createContextMock);

        // Action
        require('./modals-context');

        // Assert
        expect(createContextMock).toHaveBeenCalled();
        expect(createContextMock.mock.calls[0][0]).toStrictEqual({});
    });
});