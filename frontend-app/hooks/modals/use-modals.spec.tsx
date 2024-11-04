import { PropsWithChildren, useState } from "react";
import { act, renderHook, screen } from "@testing-library/react";

import useModals from "@/hooks/modals/use-modals";
import ModalsContext, { ModalsState } from "@/contexts/modals-context";

const createWrapperComponent = (
  defaultShowStatisticsModal: boolean,
  defaultShowHelpModal: boolean
): React.FC<PropsWithChildren> => {
  return function WrapperComponent({
    children,
  }: PropsWithChildren): React.ReactNode {
    const [showStatisticsModal, setShowStatisticsModal] = useState<boolean>(
      defaultShowStatisticsModal
    );
    const [showHelpModal, setShowHelpModal] =
      useState<boolean>(defaultShowHelpModal);
    const modalsState: ModalsState = {
      showStatisticsModal,
      showHelpModal,
      setShowStatisticsModal,
      setShowHelpModal,
    };

    return (
      <ModalsContext.Provider value={modalsState}>
        {children}
        <div data-testid="show-statistics-modal">{showStatisticsModal.toString()}</div>
        <div data-testid="show-help-modal">{showHelpModal.toString()}</div>
      </ModalsContext.Provider>
    );
  };
};

describe("useModals", () => {
  it("All Modals context data is returned from the hook correctly and all state is set correctly", () => {
    // Arrange
    const showStatisticsModal = false;
    const showHelpModal = false;
    const wrapper = createWrapperComponent(
      showStatisticsModal,
      showHelpModal
    );

    // Action
    const { result } = renderHook(() => useModals(), { wrapper });
    const {
      showStatisticsModal: actualShowStatisticsModal,
      showHelpModal: actualShowHelpModal
    } = result.current;

    const showStatisticsModalDiv = screen.getByTestId("show-statistics-modal");
    const showHelpModalDiv = screen.getByTestId("show-help-modal");

    // Assert
    expect(actualShowStatisticsModal).toBe(showStatisticsModal);
    expect(actualShowHelpModal).toBe(showHelpModal);

    expect(showStatisticsModalDiv.textContent).toBe(actualShowStatisticsModal.toString());
    expect(showHelpModalDiv.textContent).toBe(actualShowHelpModal.toString());    
  });

  it("All Modals context data is returned from the hook correctly and all state is set correctly after calling dispatchers", () => {
    // Arrange
    const showStatisticsModal = false;
    const showHelpModal = false;
    const wrapper = createWrapperComponent(
      showStatisticsModal,
      showHelpModal
    );

    const { result } = renderHook(() => useModals(), { wrapper });
    const {
      setShowStatisticsModal,
      setShowHelpModal
    } = result.current;

    // Action
    act(() => {
      setShowStatisticsModal(true);
      setShowHelpModal(true);
    });

    const showStatisticsModalDiv = screen.getByTestId("show-statistics-modal");
    const showHelpModalDiv = screen.getByTestId("show-help-modal");

    const {
      showStatisticsModal: newShowStatisticsModal,
      showHelpModal: newShowHelpModal,
    } = result.current;

    // Assert
    expect(newShowStatisticsModal).toBe(true);
    expect(newShowHelpModal).toBe(true);

    expect(showStatisticsModalDiv.textContent).toBe(newShowStatisticsModal.toString());
    expect(showHelpModalDiv.textContent).toBe(newShowHelpModal.toString());
  });
});
