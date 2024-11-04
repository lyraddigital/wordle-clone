import { useContext } from "react";
import { renderHook } from "@testing-library/react";

import ThemeContext, { ThemeState } from "./theme-context";

describe("ThemeContext", () => {
    it("should have all state fields set to undefined by default", () => {
        // Arrange / Action
        const { result } = renderHook(() => useContext(ThemeContext));
        const themeState: ThemeState = result.current;

        // Assert
        expect(themeState).toBeDefined();
        expect(themeState.isDarkMode).toBeUndefined();
        expect(themeState.setIsDarkMode).toBeUndefined();
    });
});