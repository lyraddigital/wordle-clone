import { PropsWithChildren, useState } from "react";
import { act, renderHook, screen } from "@testing-library/react";

import StatisticsContext, { StatisticsState } from "@/contexts/statistics-context";
import useStatistics from "@/hooks/statistics/use-statistics";

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

describe("useStatistics", () => {
  it("All Statistics context data is returned from the hook correctly and all state is set correctly", () => {
    // Arrange
    const gamesPlayed = 1;
    const gamesWon = 1;
    const streak = 1;
    const maxStreak = 1;
    const guessDistribution = { 4: 1 };
    const wrapper = createWrapperComponent(
      gamesPlayed,
      gamesWon,
      streak,
      maxStreak,
      guessDistribution
    );

    // Action
    const { result } = renderHook(() => useStatistics(), { wrapper });
    const {
      gamesPlayed: actualGamesPlayed,
      gamesWon: actualGamesWon,
      guessDistribution: actualGuessDistribution,
      streak: actualStreak,
      maxStreak: actualMaxStreak
    } = result.current;

    const gamesPlayedDiv = screen.getByTestId('games-played');
    const gamesWonDiv = screen.getByTestId('games-won');
    const guessDistributionDiv = screen.getByTestId('guess-distribution');
    const streakDiv = screen.getByTestId('streak');
    const maxStreakDiv = screen.getByTestId('max-streak');

    // Assert
    expect(actualGamesPlayed).toBe(gamesPlayed);
    expect(actualGamesWon).toBe(gamesWon);
    expect(actualGuessDistribution).toStrictEqual(guessDistribution);
    expect(actualStreak).toBe(streak);
    expect(actualMaxStreak).toBe(maxStreak);

    expect(gamesPlayedDiv.textContent).toBe(actualGamesPlayed.toString());
    expect(gamesWonDiv.textContent).toBe(actualGamesWon.toString());
    expect(guessDistributionDiv.textContent).toBe(JSON.stringify(actualGuessDistribution));
    expect(streakDiv.textContent).toBe(actualStreak.toString());
    expect(maxStreakDiv.textContent).toBe(actualMaxStreak.toString());
  });

  it("All Statistics context data is returned from the hook correctly and all state is set correctly after calling dispatchers", () => {
    // Arrange
    const gamesPlayed = 1;
    const gamesWon = 1;
    const streak = 1;
    const maxStreak = 1;
    const guessDistribution = { 4: 1 };
    const wrapper = createWrapperComponent(
      gamesPlayed,
      gamesWon,
      streak,
      maxStreak,
      guessDistribution
    );
    
    const { result } = renderHook(() => useStatistics(), { wrapper });
    const {
      setGamesPlayed,
      setGamesWon,
      setGuessDistribution,
      setStreak,
      setMaxStreak     
    } = result.current;

    // Action
    act(() => {
      setGamesPlayed(3);
      setGamesWon(2);
      setGuessDistribution({ 4: 1, 2: 1, 5: 1 });
      setStreak(2);
      setMaxStreak(2);
    });

    const gamesPlayedDiv = screen.getByTestId('games-played');
    const gamesWonDiv = screen.getByTestId('games-won');
    const guessDistributionDiv = screen.getByTestId('guess-distribution');
    const streakDiv = screen.getByTestId('streak');
    const maxStreakDiv = screen.getByTestId('max-streak');

    const {
      gamesPlayed: newGamesPlayed,
      gamesWon: newGamesWon,
      guessDistribution: newGuessDistribution,
      streak: newStreak,
      maxStreak: newMaxStreak
    } = result.current;

    // Assert
    expect(newGamesPlayed).toBe(3);
    expect(newGamesWon).toBe(2);
    expect(newGuessDistribution).toStrictEqual({ 4: 1, 2: 1, 5: 1 });
    expect(newStreak).toBe(2);
    expect(newMaxStreak).toBe(2);

    expect(gamesPlayedDiv.textContent).toBe(newGamesPlayed.toString());
    expect(gamesWonDiv.textContent).toBe(newGamesWon.toString());
    expect(guessDistributionDiv.textContent).toBe(JSON.stringify(newGuessDistribution));
    expect(streakDiv.textContent).toBe(newStreak.toString());
    expect(maxStreakDiv.textContent).toBe(newMaxStreak.toString());
  });
});
