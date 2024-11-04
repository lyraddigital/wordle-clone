import { PropsWithChildren, useState } from "react";
import { act, renderHook, screen } from "@testing-library/react";

import ThemeContext, { ThemeState } from "@/contexts/theme-context";

import useTheme from "./use-theme";

const createWrapperComponent = (
  defaultIsDarkMode: boolean
): React.FC<PropsWithChildren> => {
  return function WrapperComponent({
    children,
  }: PropsWithChildren): React.ReactNode {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(defaultIsDarkMode);    
    const themeState: ThemeState = {
      isDarkMode,
      setIsDarkMode,
    };

    return (
      <ThemeContext.Provider value={themeState}>
        {children}        
        <div data-testid="is-dark-mode">{isDarkMode.toString()}</div>        
      </ThemeContext.Provider>
    );
  };
};

describe("useTheme", () => {
  it("All Theme context data is returned from the hook correctly and all state is set correctly", () => {
    // Arrange
    const isDarkMode = false;
    const wrapper = createWrapperComponent(isDarkMode);

    // Action
    const { result } = renderHook(() => useTheme(), { wrapper });
    const {
      isDarkMode: actualIsDarkMode
    } = result.current;

    const isDarkModeDiv = screen.getByTestId('is-dark-mode');

    // Assert
    expect(actualIsDarkMode).toBe(isDarkMode);
    expect(isDarkModeDiv.textContent).toBe(actualIsDarkMode.toString());
  });

  it("All Theme context data is returned from the hook correctly and all state is set correctly after calling dispatchers", () => {
    // Arrange
    const isDarkMode = false;
    const wrapper = createWrapperComponent(isDarkMode);
    
    const { result } = renderHook(() => useTheme(), { wrapper });
    const {
      setIsDarkMode
    } = result.current;

    // Action
    act(() => {
      setIsDarkMode(true);
    });

    const isDarkModeDiv = screen.getByTestId('is-dark-mode');
    const { isDarkMode: newIsDarkMode } = result.current;

    // Assert
    expect(newIsDarkMode).toBe(true);
    expect(isDarkModeDiv.textContent).toBe(newIsDarkMode.toString());
  });
});
