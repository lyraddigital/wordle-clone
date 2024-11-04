import { PropsWithChildren, useState } from "react";
import { act, renderHook, screen } from "@testing-library/react";

import StatisticsContext, { StatisticsState } from "@/contexts/statistics-context";
import useStatisticsUpdater from "@/hooks/statistics/use-statistics-updater";

describe("useStatisticsUpdater", () => {
  const createWrapperComponent = (
    defaultGamesPlayed: number,
    defaultGamesWon: number,
    defaultStreak: number,
    defaultMaxStreak: number,
    defaultGuessDistribution: { [key: number]: number }
  ): React.FC<PropsWithChildren> => {
    return function WrapperComponent({
      children,
    }: PropsWithChildren): React.ReactNode {
      const [gamesPlayed, setGamesPlayed] = useState<number>(defaultGamesPlayed);
      const [gamesWon, setGamesWon] = useState<number>(defaultGamesWon);
      const [streak, setStreak] = useState<number>(defaultStreak);
      const [maxStreak, setMaxStreak] = useState<number>(defaultMaxStreak);
      const [guessDistribution, setGuessDistribution] = useState<{ [key: number]: number }>(defaultGuessDistribution);

      const statisticsState: StatisticsState = {
        gamesPlayed,
        gamesWon,
        guessDistribution,
        streak,
        maxStreak,
        setGamesPlayed,
        setGamesWon,
        setGuessDistribution,
        setStreak,
        setMaxStreak
      };

      return (
        <StatisticsContext.Provider value={statisticsState}>
          {children}
          <div data-testid="games-played">{gamesPlayed.toString()}</div>
          <div data-testid="games-won">{gamesWon.toString()}</div>
          <div data-testid="guess-distribution">{JSON.stringify(guessDistribution)}</div>
          <div data-testid="streak">{streak.toString()}</div>
          <div data-testid="max-streak">{maxStreak.toString()}</div>
        </StatisticsContext.Provider>
      );
    };
  };

  it("hasWon is false, calls the correct dispatchers", () => {
    // Arrange
    const gamesPlayed = 2;
    const gamesWon = 1;
    const guessDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const streak = 1;
    const maxStreak = 1;
    const hasWon = false;
    const wrapper = createWrapperComponent(
      gamesPlayed,
      gamesWon,
      streak,
      maxStreak,
      guessDistribution
    );

    const { result } = renderHook(() => useStatisticsUpdater(), { wrapper });

    // Action
    act(() => {
      result.current(hasWon);
    });

    const gamesPlayedDiv = screen.getByTestId('games-played');
    const gamesWonDiv = screen.getByTestId('games-won');
    const guessDistributionDiv = screen.getByTestId('guess-distribution');
    const streakDiv = screen.getByTestId('streak');
    const maxStreakDiv = screen.getByTestId('max-streak');

    // Assert
    expect(gamesPlayedDiv.textContent).toBe((3).toString());
    expect(gamesWonDiv.textContent).toBe((1).toString());
    expect(guessDistributionDiv.textContent).toBe(JSON.stringify({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }));
    expect(streakDiv.textContent).toBe((0).toString());
    expect(maxStreakDiv.textContent).toBe((1).toString());
  });

  it("hasWon is true and current turn is undefined, calls the correct dispatchers", () => {
    // Arrange
    const gamesPlayed = 2;
    const gamesWon = 1;
    const guessDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const streak = 1;
    const maxStreak = 1;
    const hasWon = true;
    const wrapper = createWrapperComponent(
      gamesPlayed,
      gamesWon,
      streak,
      maxStreak,
      guessDistribution
    );

    const { result } = renderHook(() => useStatisticsUpdater(), { wrapper });

    // Action
    act(() => {
      result.current(hasWon);
    });

    const gamesPlayedDiv = screen.getByTestId('games-played');
    const gamesWonDiv = screen.getByTestId('games-won');
    const guessDistributionDiv = screen.getByTestId('guess-distribution');
    const streakDiv = screen.getByTestId('streak');
    const maxStreakDiv = screen.getByTestId('max-streak');

    // Assert
    expect(gamesPlayedDiv.textContent).toBe((3).toString());
    expect(gamesWonDiv.textContent).toBe((2).toString());
    expect(guessDistributionDiv.textContent).toBe(JSON.stringify({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }));
    expect(streakDiv.textContent).toBe((2).toString());
    expect(maxStreakDiv.textContent).toBe((2).toString());
  });

  it("hasWon is true and current turn is set, calls the correct dispatchers", () => {
    // Arrange
    const gamesPlayed = 2;
    const gamesWon = 1;
    const guessDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const streak = 1;
    const maxStreak = 1;
    const hasWon = true;
    const currentTurn = 0;
    const wrapper = createWrapperComponent(
      gamesPlayed,
      gamesWon,
      streak,
      maxStreak,
      guessDistribution
    );

    const { result } = renderHook(() => useStatisticsUpdater(), { wrapper });

    // Action
    act(() => {
      result.current(hasWon, currentTurn);
    });

    const gamesPlayedDiv = screen.getByTestId('games-played');
    const gamesWonDiv = screen.getByTestId('games-won');
    const guessDistributionDiv = screen.getByTestId('guess-distribution');
    const streakDiv = screen.getByTestId('streak');
    const maxStreakDiv = screen.getByTestId('max-streak');

    // Assert
    expect(gamesPlayedDiv.textContent).toBe((3).toString());
    expect(gamesWonDiv.textContent).toBe((2).toString());
    expect(guessDistributionDiv.textContent).toBe(JSON.stringify({ 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }));
    expect(streakDiv.textContent).toBe((2).toString());
    expect(maxStreakDiv.textContent).toBe((2).toString());
  });

  it("hasWon is true and current turn changes 6 times. Distirubtion is updated correctly.", () => {
    // Arrange
    const gamesPlayed = 0;
    const gamesWon = 0;
    const guessDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const streak = 0;
    const maxStreak = 0;
    const hasWon = true;
    const wrapper = createWrapperComponent(
      gamesPlayed,
      gamesWon,
      streak,
      maxStreak,
      guessDistribution
    );

    const { result } = renderHook(() => useStatisticsUpdater(), { wrapper });

    // Action / Assert
    for (let i = 0; i < 27; i++) {
      const currentTurn = i % 6;

      act(() => {
        result.current(hasWon, currentTurn);
      });
    }

    const guessDistributionDiv = screen.getByTestId('guess-distribution');
    expect(guessDistributionDiv.textContent).toBe(JSON.stringify({ 1: 5, 2: 5, 3: 5, 4: 4, 5: 4, 6: 4 }));
  });

  it("hasWon is true and streak is lower than current max streak, keep max streak the same. ", () => {
    // Arrange
    const gamesPlayed = 8;
    const gamesWon = 5;
    const guessDistribution = { 1: 1, 2: 0, 3: 0, 4: 5, 5: 0, 6: 0 };
    const streak = 1;
    const maxStreak = 3;
    const hasWon = true;
    const currentTurn = 0;
    const wrapper = createWrapperComponent(
      gamesPlayed,
      gamesWon,
      streak,
      maxStreak,
      guessDistribution
    );

    const { result } = renderHook(() => useStatisticsUpdater(), { wrapper });

    // Action
    act(() => {
      result.current(hasWon, currentTurn);
    });

    const gamesPlayedDiv = screen.getByTestId('games-played');
    const gamesWonDiv = screen.getByTestId('games-won');
    const guessDistributionDiv = screen.getByTestId('guess-distribution');
    const streakDiv = screen.getByTestId('streak');
    const maxStreakDiv = screen.getByTestId('max-streak');

    // Assert
    expect(gamesPlayedDiv.textContent).toBe((9).toString());
    expect(gamesWonDiv.textContent).toBe((6).toString());
    expect(guessDistributionDiv.textContent).toBe(JSON.stringify({ 1: 2, 2: 0, 3: 0, 4: 5, 5: 0, 6: 0 }));
    expect(streakDiv.textContent).toBe((2).toString());
    expect(maxStreakDiv.textContent).toBe((3).toString());
  });

  it("hasWon is true and streak is higher than current max streak, sets the new max streak. ", () => {
    // Arrange
    const gamesPlayed = 8;
    const gamesWon = 5;
    const guessDistribution = { 1: 1, 2: 0, 3: 2, 4: 2, 5: 0, 6: 0 };
    const streak = 3;
    const maxStreak = 2;
    const hasWon = true;
    const currentTurn = 0;
    const wrapper = createWrapperComponent(
      gamesPlayed,
      gamesWon,
      streak,
      maxStreak,
      guessDistribution
    );

    const { result } = renderHook(() => useStatisticsUpdater(), { wrapper });

    // Action
    act(() => {
      result.current(hasWon, currentTurn);
    });

    const gamesPlayedDiv = screen.getByTestId('games-played');
    const gamesWonDiv = screen.getByTestId('games-won');
    const guessDistributionDiv = screen.getByTestId('guess-distribution');
    const streakDiv = screen.getByTestId('streak');
    const maxStreakDiv = screen.getByTestId('max-streak');

    // Assert
    expect(gamesPlayedDiv.textContent).toBe((9).toString());
    expect(gamesWonDiv.textContent).toBe((6).toString());
    expect(guessDistributionDiv.textContent).toBe(JSON.stringify({ 1: 2, 2: 0, 3: 2, 4: 2, 5: 0, 6: 0 }));
    expect(streakDiv.textContent).toBe((4).toString());
    expect(maxStreakDiv.textContent).toBe((4).toString());
  });

  it("hasWon is true and streak is same as current max streak, sets the new max streak. ", () => {
    // Arrange
    const gamesPlayed = 8;
    const gamesWon = 5;
    const guessDistribution = { 1: 1, 2: 0, 3: 2, 4: 2, 5: 0, 6: 0 };
    const streak = 2;
    const maxStreak = 2;
    const hasWon = true;
    const currentTurn = 0;
    const wrapper = createWrapperComponent(
      gamesPlayed,
      gamesWon,
      streak,
      maxStreak,
      guessDistribution
    );

    const { result } = renderHook(() => useStatisticsUpdater(), { wrapper });

    // Action
    act(() => {
      result.current(hasWon, currentTurn);
    });

    const gamesPlayedDiv = screen.getByTestId('games-played');
    const gamesWonDiv = screen.getByTestId('games-won');
    const guessDistributionDiv = screen.getByTestId('guess-distribution');
    const streakDiv = screen.getByTestId('streak');
    const maxStreakDiv = screen.getByTestId('max-streak');

    // Assert
    expect(gamesPlayedDiv.textContent).toBe((9).toString());
    expect(gamesWonDiv.textContent).toBe((6).toString());
    expect(guessDistributionDiv.textContent).toBe(JSON.stringify({ 1: 2, 2: 0, 3: 2, 4: 2, 5: 0, 6: 0 }));
    expect(streakDiv.textContent).toBe((3).toString());
    expect(maxStreakDiv.textContent).toBe((3).toString());
  });
});
