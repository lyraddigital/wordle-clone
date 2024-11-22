jest.mock("@/data/words");

import { useContext } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import WordleContext, { WordleState } from "@/contexts/wordle-context";
import { GuessColour } from "@/lib/enums";
import { GuessLetterResult } from "@/lib/types";
import getRandomWord from "@/data/words";

import WordleProvider from "./wordle-provider";

type ChildComponentProps = {
  changedCurrentGuess?: string,
  aGuess?: GuessLetterResult,
  newHistoryItem?: string,
  usedKeyEntry?: { key: string, value: GuessColour }
}

function ChildComponent({ aGuess, changedCurrentGuess, newHistoryItem, usedKeyEntry }: ChildComponentProps): React.ReactNode {
  const {
    currentGuess,
    guesses,
    history,
    isCorrect,
    isCurrentGuessIncorrect,
    isGameOver,
    isGuessAnimationFiring,
    numberOfTurns,
    solution,
    usedKeys,
    setCurrentGuess,
    setGuesses,
    setHistory,
    setIsCorrect,
    setIsCurrentGuessIncorrect,
    setIsGameOver,
    setIsGuessAnimationFiring,
    setNumberOfTurns,
    setSolution,
    setUsedKeys
  } = useContext<WordleState>(WordleContext);

  const updateUsedKeys = (usedKeyEntry: { key: string, value: GuessColour }) => {
    setUsedKeys((prevUsedKeys: { [key: string]: GuessColour }) => {
      const newUsedKeys = { ...prevUsedKeys };
      const { key, value } = usedKeyEntry;

      newUsedKeys[key] = value;

      return newUsedKeys;
    });
  };

  const updateGuesses = (newGuess: GuessLetterResult) => {
    setGuesses((prevGuesses: (GuessLetterResult[] | undefined)[]) => {
      const newGuesses = prevGuesses ? [...prevGuesses] : [];
      const newGuessRow: GuessLetterResult[] = [];
      newGuessRow[0] = newGuess;
      newGuesses[numberOfTurns] = newGuessRow;

      return newGuesses;
    });
  };

  const updateHistory = (newItem: string) => {
    setHistory((prevHistory: string[]) => {
      return [...prevHistory, newItem];
    });
  };

  return (
    <>
      <div data-testid="current-guess">{currentGuess}</div>
      <div data-testid="guesses">{JSON.stringify(guesses)}</div>
      <div data-testid="history">{JSON.stringify(history)}</div>
      <div data-testid="is-correct">{isCorrect.toString()}</div>
      <div data-testid="is-current-guess-incorrect">{isCurrentGuessIncorrect.toString()}</div>
      <div data-testid="is-game-over">{isGameOver.toString()}</div>
      <div data-testid="is-guess-animation-firing">{isGuessAnimationFiring.toString()}</div>
      <div data-testid="number-of-turns">{numberOfTurns.toString()}</div>
      <div data-testid="solution">{solution}</div>
      <div data-testid="used-keys">{JSON.stringify(usedKeys)}</div>
      <button onClick={() => setCurrentGuess(changedCurrentGuess!)}>Change Current Guess</button>
      <button onClick={() => updateGuesses(aGuess!)}>Update Guesses</button>
      <button onClick={() => updateHistory(newHistoryItem!)}>Update History</button>
      <button onClick={() => setIsCorrect(prevIsCorrect => !prevIsCorrect)}>Change Is Correct</button>
      <button onClick={() => setIsCurrentGuessIncorrect(prevIsCurrentGuessIncorrect => !prevIsCurrentGuessIncorrect!)}>Change Is Current Guess Incorrect</button>
      <button onClick={() => setIsGameOver(prevIsGameOver => !prevIsGameOver)}>Change Is Game Over</button>
      <button onClick={() => setIsGuessAnimationFiring(prevIsGuessAnimationFiring => !prevIsGuessAnimationFiring)}>Change Is Guess Animation Firing</button>
      <button onClick={() => setNumberOfTurns(prevNumberOfTurns => prevNumberOfTurns + 1)}>Increment Number Of Turns</button>
      <button onClick={() => setSolution(solution)}>Update Solution</button>
      <button onClick={() => updateUsedKeys(usedKeyEntry!)}>Update Used Keys</button>
    </>
  )
}

describe("WordleProvider component", () => {
  it("by default sets the correct state", () => {
    // Arrange 
    const solution = 'atest';
    (getRandomWord as jest.MockedFunction<typeof getRandomWord>).mockReturnValueOnce(solution);

    // Action
    render((
      <WordleProvider>
        <ChildComponent />
      </WordleProvider>
    ));

    // Assert
    const currentGuessEl = screen.getByTestId('current-guess');
    const guessesEl = screen.getByTestId('guesses');
    const historyEl = screen.getByTestId('history');
    const isCorrectEl = screen.getByTestId('is-correct');
    const isCurrentGuessIncorrectEl = screen.getByTestId('is-current-guess-incorrect');
    const isGameOverEl = screen.getByTestId('is-game-over');
    const isGuessAnimationFiringEl = screen.getByTestId('is-guess-animation-firing');
    const numberOfTurnsEl = screen.getByTestId('number-of-turns');
    const solutionEl = screen.getByTestId('solution');
    const usedKeysEl = screen.getByTestId('used-keys');

    expect(currentGuessEl.textContent).toBe('');
    expect(guessesEl.textContent).toBe('[null,null,null,null,null,null]');
    expect(historyEl.textContent).toBe('[]');
    expect(isCorrectEl.textContent).toBe('false');
    expect(isCurrentGuessIncorrectEl.textContent).toBe('false');
    expect(isGameOverEl.textContent).toBe('false');
    expect(isGuessAnimationFiringEl.textContent).toBe('false');
    expect(numberOfTurnsEl.textContent).toBe('0');
    expect(solutionEl.textContent).toBe(solution);
    expect(usedKeysEl.textContent).toBe('{}');
    expect(getRandomWord).toHaveBeenCalled();
  });

  it("currentGuess is updated when using the setCurrentGuess function from the context", async () => {
    // Arrange
    const user = userEvent.setup();
    const solution = 'atest';
    const newGuess = 'peach';
    (getRandomWord as jest.MockedFunction<typeof getRandomWord>).mockReturnValueOnce(solution);

    render((
      <WordleProvider>
        <ChildComponent changedCurrentGuess={newGuess} />
      </WordleProvider>
    ));

    const toggleCurrentGuessModalEl = screen.getByRole('button', { name: /Change Current Guess/i });

    // Action
    await user.click(toggleCurrentGuessModalEl);

    // Assert
    const currentGuessEl = screen.getByTestId('current-guess');

    expect(currentGuessEl.textContent).toBe(newGuess);
  });

  it("guesses is updated when using the setGuesses function from the context", async () => {
    // Arrange
    const user = userEvent.setup();
    const solution = 'atest';
    const newGuess: GuessLetterResult = { letter: 'p', colour: GuessColour.yellow };
    (getRandomWord as jest.MockedFunction<typeof getRandomWord>).mockReturnValueOnce(solution);

    render((
      <WordleProvider>
        <ChildComponent aGuess={newGuess} />
      </WordleProvider>
    ));

    const toggleGuessesEl = screen.getByRole('button', { name: /Update Guesses/i });

    // Action
    await user.click(toggleGuessesEl);

    // Assert
    const guessesEl = screen.getByTestId('guesses');

    expect(guessesEl.textContent).toBe('[[{\"letter\":\"p\",\"colour\":\"yellow\"}],null,null,null,null,null]');
  });

  it("history is updated when using the setHistory function from the context", async () => {
    // Arrange
    const user = userEvent.setup();
    const solution = 'atest';
    const newHistoryItem = "peach";
    (getRandomWord as jest.MockedFunction<typeof getRandomWord>).mockReturnValueOnce(solution);

    render((
      <WordleProvider>
        <ChildComponent newHistoryItem={newHistoryItem} />
      </WordleProvider>
    ));

    const toggleHistoryEl = screen.getByRole('button', { name: /Update History/i });

    // Action
    await user.click(toggleHistoryEl);

    // Assert
    const historyEl = screen.getByTestId('history');

    expect(historyEl.textContent).toBe('[\"peach\"]');
  });

  it("isCorrect value is updated when using the setIsCorrect function from the context", async () => {
    // Arrange
    const user = userEvent.setup();
    const solution = 'atest';
    (getRandomWord as jest.MockedFunction<typeof getRandomWord>).mockReturnValueOnce(solution);

    render((
      <WordleProvider>
        <ChildComponent />
      </WordleProvider>
    ));

    const toggleIsCorrectEl = screen.getByRole('button', { name: /Change Is Correct/i });

    // Action
    await user.click(toggleIsCorrectEl);

    // Assert
    const isCorrectEl = screen.getByTestId('is-correct');

    expect(isCorrectEl.textContent).toBe('true');
  });

  it("isCurrentGuessIncorrect value is updated when using the setIsCurrentGuessIncorrect function from the context", async () => {
    // Arrange
    const user = userEvent.setup();
    const solution = 'atest';
    (getRandomWord as jest.MockedFunction<typeof getRandomWord>).mockReturnValueOnce(solution);

    render((
      <WordleProvider>
        <ChildComponent />
      </WordleProvider>
    ));

    const toggleIsCurrentGuessIncorrectEl = screen.getByRole('button', { name: /Change Is Current Guess Incorrect/i });

    // Action
    await user.click(toggleIsCurrentGuessIncorrectEl);

    // Assert
    const isCurrentGuessIncorrectEl = screen.getByTestId('is-current-guess-incorrect');

    expect(isCurrentGuessIncorrectEl.textContent).toBe('true');
  });

  it("isGameOver value is updated when using the setIsGameOver function from the context", async () => {
    // Arrange
    const user = userEvent.setup();
    const solution = 'atest';
    (getRandomWord as jest.MockedFunction<typeof getRandomWord>).mockReturnValueOnce(solution);

    render((
      <WordleProvider>
        <ChildComponent />
      </WordleProvider>
    ));

    const toggleIsGameOverEl = screen.getByRole('button', { name: /Change Is Game Over/i });

    // Action
    await user.click(toggleIsGameOverEl);

    // Assert
    const isCurrentGuessIncorrectEl = screen.getByTestId('is-game-over');

    expect(isCurrentGuessIncorrectEl.textContent).toBe('true');
  });

  it("isGuessAnimationFiring value is updated when using the setIsGuessAnimationFiring function from the context", async () => {
    // Arrange
    const user = userEvent.setup();
    const solution = 'atest';
    (getRandomWord as jest.MockedFunction<typeof getRandomWord>).mockReturnValueOnce(solution);

    render((
      <WordleProvider>
        <ChildComponent />
      </WordleProvider>
    ));

    const toggleIsGuessAnimationFiringEl = screen.getByRole('button', { name: /Change Is Guess Animation Firing/i });

    // Action
    await user.click(toggleIsGuessAnimationFiringEl);

    // Assert
    const isGuessAnimationFiringEl = screen.getByTestId('is-guess-animation-firing');

    expect(isGuessAnimationFiringEl.textContent).toBe('true');
  });

  it("numberOfTurns value is updated when using the setNumberOfTurns function from the context", async () => {
    // Arrange
    const user = userEvent.setup();
    const solution = 'atest';
    (getRandomWord as jest.MockedFunction<typeof getRandomWord>).mockReturnValueOnce(solution);

    render((
      <WordleProvider>
        <ChildComponent />
      </WordleProvider>
    ));

    const toggleNumberOfTurnsEl = screen.getByRole('button', { name: /Increment Number Of Turns/i });

    // Action
    await user.click(toggleNumberOfTurnsEl);

    // Assert
    const isGuessAnimationFiringEl = screen.getByTestId('number-of-turns');

    expect(isGuessAnimationFiringEl.textContent).toBe('1');
  });

  it("solution value is updated when using the setSolution function from the context", async () => {
    // Arrange
    const user = userEvent.setup();
    const solution = 'atest';
    (getRandomWord as jest.MockedFunction<typeof getRandomWord>).mockReturnValueOnce(solution);

    render((
      <WordleProvider>
        <ChildComponent />
      </WordleProvider>
    ));

    const toggleSolutionEl = screen.getByRole('button', { name: /Update Solution/i });

    // Action
    await user.click(toggleSolutionEl);

    // Assert
    const solutionEl = screen.getByTestId('solution');

    expect(solutionEl.textContent).toBe(solution);
  });

  it("usedKeys value is updated when using the setUsedKeys function from the context", async () => {
    // Arrange
    const user = userEvent.setup();
    const solution = 'atest';
    const usedKeyEntry = { key: 'a', value: GuessColour.green };
    (getRandomWord as jest.MockedFunction<typeof getRandomWord>).mockReturnValueOnce(solution);

    render((
      <WordleProvider>
        <ChildComponent usedKeyEntry={usedKeyEntry} />
      </WordleProvider>
    ));

    const toggleUsedKeysEl = screen.getByRole('button', { name: /Update Used Keys/i });

    // Action
    await user.click(toggleUsedKeysEl);

    // Assert
    const usedKeysEl = screen.getByTestId('used-keys');

    expect(usedKeysEl.textContent).toBe('{\"a\":\"green\"}');
  });
});
