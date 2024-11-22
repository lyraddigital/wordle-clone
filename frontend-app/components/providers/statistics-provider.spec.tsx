import { useContext } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import StatisticsContext, { StatisticsState } from "@/contexts/statistics-context";

import StatisticsProvider from "./statistics-provider";

type ChildComponentProps = {
  distributionRecord?: { key: number, value: number }
}

function ChildComponent({ distributionRecord }: ChildComponentProps): React.ReactNode {
  const { gamesPlayed, gamesWon, streak, maxStreak, guessDistribution, setGamesPlayed, setGamesWon, setGuessDistribution, setStreak, setMaxStreak } = useContext<StatisticsState>(StatisticsContext);

  const updateDistribution = ({ key, value }: { key: number, value: number }) => {
    setGuessDistribution(prevDistribution => {
      const newDistribution = { ...prevDistribution };
      newDistribution[key] = value;

      return newDistribution;
    });
  }

  return (
    <>
      <div data-testid="games-played">{gamesPlayed.toString()}</div>
      <div data-testid="games-won">{gamesWon.toString()}</div>
      <div data-testid="streak">{streak.toString()}</div>
      <div data-testid="max-streak">{maxStreak.toString()}</div>
      <div data-testid="guess-distribution">{JSON.stringify(guessDistribution)}</div>
      <button onClick={() => setGamesPlayed(prevGamesPlayed => prevGamesPlayed + 1)}>Increment Games Played</button>
      <button onClick={() => setGamesWon(prevGamesWon => prevGamesWon + 1)}>Increment Games Won</button>
      <button onClick={() => setStreak(prevStreak => prevStreak + 1)}>Increment Streak</button>
      <button onClick={() => setMaxStreak(prevMaxStreak => prevMaxStreak + 1)}>Increment Max Streak</button>
      <button onClick={() => updateDistribution(distributionRecord!)}>Update Guess Distribution</button>
    </>
  )
}

describe("StatisticsProvider component", () => {
  it("by default sets the correct state", () => {
    // Arrange / Action
    render((
      <StatisticsProvider>
        <ChildComponent />
      </StatisticsProvider>
    ));

    // Assert
    const gamesPlayedEl = screen.getByTestId('games-played');
    const gamesWonEl = screen.getByTestId('games-won');
    const streakEl = screen.getByTestId('streak');
    const maxStreakEl = screen.getByTestId('max-streak');
    const guessDistributionEl = screen.getByTestId('guess-distribution');

    expect(gamesPlayedEl.textContent).toBe('0');
    expect(gamesWonEl.textContent).toBe('0');
    expect(streakEl.textContent).toBe('0');
    expect(maxStreakEl.textContent).toBe('0');
    expect(guessDistributionEl.textContent).toBe('{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0}');
  });

  it("gamesPlayed is 1 when calling setGamesPlayed function with incrementing a previous gamesPlayed value", async () => {
    // Arrange
    const user = userEvent.setup();

    render((
      <StatisticsProvider>
        <ChildComponent />
      </StatisticsProvider>
    ));

    const incrementGamesPlayedEl = screen.getByRole('button', { name: /Increment Games Played/i });

    // Action
    await user.click(incrementGamesPlayedEl);

    // Assert
    const gamesPlayedEl = screen.getByTestId('games-played');

    expect(gamesPlayedEl.textContent).toBe('1');
  });

  it("gamesWon is 1 when calling setGamesWon function with incrementing a previous gamesWon value", async () => {
    // Arrange
    const user = userEvent.setup();

    render((
      <StatisticsProvider>
        <ChildComponent />
      </StatisticsProvider>
    ));

    const incrementGamesWonEl = screen.getByRole('button', { name: /Increment Games Won/i });

    // Action
    await user.click(incrementGamesWonEl);

    // Assert
    const gamesWonEl = screen.getByTestId('games-won');

    expect(gamesWonEl.textContent).toBe('1');
  });

  it("guess distribution has changed correct when calling setGuessDistribution function", async () => {
    // Arrange
    const user = userEvent.setup();

    render((
      <StatisticsProvider>
        <ChildComponent distributionRecord={{ key: 1, value: 2 }} />
      </StatisticsProvider>
    ));

    const incrementGamesWonEl = screen.getByRole('button', { name: /Update Guess Distribution/i });

    // Action
    await user.click(incrementGamesWonEl);

    // Assert
    const guessDistributionEl = screen.getByTestId('guess-distribution');

    expect(guessDistributionEl.textContent).toBe('{\"1\":2,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0}');
  });

  it("streak is 1 when calling setStreak function with incrementing a previous streak value", async () => {
    // Arrange
    const user = userEvent.setup();

    render((
      <StatisticsProvider>
        <ChildComponent />
      </StatisticsProvider>
    ));

    const incrementStreakEl = screen.getByRole('button', { name: /Increment Streak/i });

    // Action
    await user.click(incrementStreakEl);

    // Assert
    const streakEl = screen.getByTestId('streak');

    expect(streakEl.textContent).toBe('1');
  });

  it("maxStreak is 1 when calling setStreak function with incrementing a previous max streak value", async () => {
    // Arrange
    const user = userEvent.setup();

    render((
      <StatisticsProvider>
        <ChildComponent />
      </StatisticsProvider>
    ));

    const incrementMaxStreakEl = screen.getByRole('button', { name: /Increment Max Streak/i });

    // Action
    await user.click(incrementMaxStreakEl);

    // Assert
    const maxStreakEl = screen.getByTestId('max-streak');

    expect(maxStreakEl.textContent).toBe('1');
  });
});
