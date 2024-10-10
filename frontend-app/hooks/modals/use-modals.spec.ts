jest.mock("react");

import { useContext } from "react";
import useModals from "@/hooks/modals/use-modals";
import ModalsContext from "@/contexts/modals-context";

describe("useModals", () => {
  it("should call useContext with a the parameter being a ModalContext", () => {
    // Arrange
    const useContextMock = jest.fn();

    (
      useContext as jest.MockedFunction<typeof useContext>
    ).mockImplementationOnce(useContextMock);

    // Action
    useModals();

    // Assert
    expect(useContextMock).toHaveBeenCalled();
    expect(useContextMock.mock.calls[0][0]).toBe(ModalsContext);
  });
});
