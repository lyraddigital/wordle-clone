import { useContext } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ModalsContext, { ModalsState } from "@/contexts/modals-context";

import ModalsProvider from "./modals-provider";
import WordleProvider from "./wordle-provider";
import WordleContext, { WordleState } from "@/contexts/wordle-context";

function ChildComponent(): React.ReactNode {
  const { showStatisticsModal, setShowStatisticsModal, showHelpModal, setShowHelpModal } = useContext<ModalsState>(ModalsContext);
  const { setIsGameOver } = useContext<WordleState>(WordleContext);

  return (
    <>
      <div data-testid="show-statistics-modal">{showStatisticsModal.toString()}</div>
      <div data-testid="show-help-modal">{showHelpModal.toString()}</div>
      <button onClick={() => setShowStatisticsModal(prevShowStatisticsModal => !prevShowStatisticsModal)}>Toggle Statistics Modal</button>
      <button onClick={() => setShowHelpModal(prevShowHelpModal => !prevShowHelpModal)}>Toggle Help Modal</button>
      <button onClick={() => setIsGameOver(prevIsGameOver => !prevIsGameOver)}>Toggle Is Game Over</button>
    </>
  )
}

describe("ModalsProvider component", () => {
  it("by default sets the correct state", () => {
    // Arrange / Action
    render((
      <ModalsProvider>
        <ChildComponent />
      </ModalsProvider>
    ));

    // Assert
    const showStatisticsModalEl = screen.getByTestId('show-statistics-modal');
    const showHelpModalEl = screen.getByTestId('show-help-modal');

    expect(showStatisticsModalEl.textContent).toBe('false');
    expect(showHelpModalEl.textContent).toBe('false');
  });

  it("showStatisticsModal is true when toggling using the setShowStatisticsModal function from the context", async () => {
    // Arrange / Action
    const user = userEvent.setup();

    render((
      <ModalsProvider>
        <ChildComponent />
      </ModalsProvider>
    ));

    const toggleShowStatisticsModalEl = screen.getByRole('button', { name: /Toggle Statistics Modal/i });

    // Action
    await user.click(toggleShowStatisticsModalEl);

    // Assert
    const showStatisticsModalEl = screen.getByTestId('show-statistics-modal');

    expect(showStatisticsModalEl.textContent).toBe('true');
  });

  it("showHelpModal is true when toggling using the setShowHelpModal function from the context", async () => {
    // Arrange / Action
    const user = userEvent.setup();

    render((
      <ModalsProvider>
        <ChildComponent />
      </ModalsProvider>
    ));

    const toggleShowHelpModalEl = screen.getByRole('button', { name: /Toggle Help Modal/i });

    // Action
    await user.click(toggleShowHelpModalEl);

    // Assert
    const showHelpModalEl = screen.getByTestId('show-help-modal');

    expect(showHelpModalEl.textContent).toBe('true');
  });

  it("showStatisticsModal remains false when using the setIsGameOver function from the context", async () => {
    // Arrange / Action
    const user = userEvent.setup();

    render((
      <WordleProvider>
        <ModalsProvider>
          <ChildComponent />
        </ModalsProvider>
      </WordleProvider>
    ));

    const toggleIsGameOverEl = screen.getByRole('button', { name: /Toggle Is Game Over/i });

    // Action
    await user.click(toggleIsGameOverEl);

    // Assert
    const showStatisticsModalEl = screen.getByTestId('show-statistics-modal');

    expect(showStatisticsModalEl.textContent).toBe('false');
  });

  it("showStatisticsModal becomes true when using the setIsGameOver after setTimeout function has fired", async () => {
    // Arrange / Action
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });

    render((
      <WordleProvider>
        <ModalsProvider>
          <ChildComponent />
        </ModalsProvider>
      </WordleProvider>
    ));

    const toggleStatisticsModalEl = screen.getByRole('button', { name: /Toggle Is Game Over/i });

    // Action
    await user.click(toggleStatisticsModalEl);

    act(() => {
      jest.runAllTimers();
    });

    // Assert
    const showStatisticsModalEl = screen.getByTestId('show-statistics-modal');

    expect(showStatisticsModalEl.textContent).toBe('true');
  });
});
