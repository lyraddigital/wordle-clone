import { useContext } from "react";
import { renderHook } from "@testing-library/react";

import ModalsContext, { ModalsState } from "./modals-context";

describe("ModalsContext", () => {
    it("should have all state fields set to undefined by default", () => {
        // Arrange / Action
        const { result } = renderHook(() => useContext(ModalsContext));
        const modalsState: ModalsState = result.current;

        // Assert
        expect(modalsState).toBeDefined();
        expect(modalsState.showStatisticsModal).toBeUndefined();
        expect(modalsState.showHelpModal).toBeUndefined();
        expect(modalsState.setShowStatisticsModal).toBeUndefined();
        expect(modalsState.setShowHelpModal).toBeUndefined();
    });
});