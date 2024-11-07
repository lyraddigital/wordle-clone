import { useContext } from "react";
import { render, screen } from "@testing-library/react";

import ThemeContext, { ThemeState } from "@/contexts/theme-context";
import ThemeProvider from "./theme-provider";
import userEvent from "@testing-library/user-event";

function ChildComponent(): React.ReactNode {
  const {isDarkMode, setIsDarkMode} = useContext<ThemeState>(ThemeContext);

  console.log('isDarkMode', isDarkMode);

  return (
    <>
      <div data-testid="is-dark-mode">{isDarkMode.toString()}</div>
      <button onClick={() => setIsDarkMode(prevIsDarkMode => !prevIsDarkMode)}>Toggle Dark Mode</button>
    </>
  )
}

describe("ThemeProvider component", () => {
  xit("by default the isDarkMode value is false", () => {
    // Arrange / Action
    render((
      <ThemeProvider>
        <ChildComponent />
      </ThemeProvider>
    ));

    // Assert
    const isDarkModeEl = screen.getByTestId('is-dark-mode');
    const htmlEl = document.getElementsByTagName("html")[0];
    
    expect(isDarkModeEl.textContent).toBe('false');
    expect(htmlEl!.className).toBe('');
  });

  it("isDarkMode value is true when toggling using the setIsDarkMode function from the context", async () => {
    // Arrange
    const user = userEvent.setup();
    
    render((
      <ThemeProvider>
        <ChildComponent />
      </ThemeProvider>
    ));

    const toggleButtonEl = screen.getByRole('button');

    // Action
    await user.click(toggleButtonEl);

    // Assert    
    const isDarkModeEl = screen.getByTestId('is-dark-mode');
    const htmlEl = document.getElementsByTagName("html")[0];
    
    expect(isDarkModeEl.textContent).toBe('true');
    expect(htmlEl!.className).toBe('dark');
  });

  it("isDarkMode value is false when toggling twice using the setIsDarkMode function from the context", async () => {
    // Arrange
    const user = userEvent.setup();

    render((
      <ThemeProvider>
        <ChildComponent />
      </ThemeProvider>
    ));

    const toggleButtonEl = screen.getByRole('button');

    // Action
    await user.click(toggleButtonEl);
    await user.click(toggleButtonEl); 

    // Assert    
    const isDarkModeEl = screen.getByTestId('is-dark-mode');
    const htmlEl = document.getElementsByTagName("html")[0];
    
    expect(isDarkModeEl.textContent).toBe('false');
    expect(htmlEl!.className).toBe('');
  });
});
