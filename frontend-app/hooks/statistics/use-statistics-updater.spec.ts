jest.mock("@/hooks/statistics/use-statistics");

import { Dispatch, SetStateAction } from "react";
import { StatisticsState } from "@/contexts/statistics-context";
import useStatistics from "@/hooks/statistics/use-statistics";
import useStatisticsUpdater from "@/hooks/statistics/use-statistics-updater";

describe("useStatisticsUpdater", () => {
  it("hasWon is false, calls the correct dispatchers", () => {
    // Arrange
    const setGamesPlayedFn = jest.fn();
    const setGamesWonFn = jest.fn();
    const setGuessDistributionFn = jest.fn();
    const setStreakFn = jest.fn();
    const setMaxStreakFn = jest.fn();
    const hasWon = false;

    (
      useStatistics as jest.MockedFunction<typeof useStatistics>
    ).mockImplementationOnce(
      () =>
        ({
          setGamesPlayed: setGamesPlayedFn as Dispatch<SetStateAction<number>>,
          setGamesWon: setGamesWonFn as Dispatch<SetStateAction<number>>,
          setGuessDistribution: setGuessDistributionFn as Dispatch<
            SetStateAction<{ [key: number]: number }>
          >,
          setStreak: setStreakFn as Dispatch<SetStateAction<number>>,
          setMaxStreak: setMaxStreakFn as Dispatch<SetStateAction<number>>,
        } as StatisticsState)
    );

    // Action
    const updateStatisticsByGameResult = useStatisticsUpdater();

    updateStatisticsByGameResult(hasWon);

    // Assert
    expect(setGamesPlayedFn).toHaveBeenCalled();
    expect(setStreakFn).toHaveBeenCalled();
    expect(setGamesWonFn).not.toHaveBeenCalled();
    expect(setGuessDistributionFn).not.toHaveBeenCalled();
    expect(setMaxStreakFn).not.toHaveBeenCalled();

    const gamesPlayedCallback = setGamesPlayedFn.mock.calls[0][0] as (
      num: number
    ) => number;
    const streakCallback = setStreakFn.mock.calls[0][0] as (
      num: number
    ) => number;

    const newGamesPlayed = gamesPlayedCallback(1);
    const newStreak = streakCallback(1);

    expect(newGamesPlayed).toBe(2);
    expect(newStreak).toBe(0);
  });

  it("hasWon is true and current turn is undefined, calls the correct dispatchers", () => {
    // Arrange
    const setGamesPlayedFn = jest.fn();
    const setGamesWonFn = jest.fn();
    const setGuessDistributionFn = jest.fn();
    const setStreakFn = jest.fn();
    const setMaxStreakFn = jest.fn();
    const streak = 3;
    const hasWon = true;

    (
      useStatistics as jest.MockedFunction<typeof useStatistics>
    ).mockImplementationOnce(
      () =>
        ({
          setGamesPlayed: setGamesPlayedFn as Dispatch<SetStateAction<number>>,
          setGamesWon: setGamesWonFn as Dispatch<SetStateAction<number>>,
          setGuessDistribution: setGuessDistributionFn as Dispatch<
            SetStateAction<{ [key: number]: number }>
          >,
          setStreak: setStreakFn as Dispatch<SetStateAction<number>>,
          setMaxStreak: setMaxStreakFn as Dispatch<SetStateAction<number>>,
          streak,
        } as StatisticsState)
    );

    // Action
    const updateStatisticsByGameResult = useStatisticsUpdater();

    updateStatisticsByGameResult(hasWon);

    // Assert
    expect(setGamesPlayedFn).toHaveBeenCalled();
    expect(setStreakFn).toHaveBeenCalled();
    expect(setGamesWonFn).toHaveBeenCalled();
    expect(setGuessDistributionFn).not.toHaveBeenCalled();
    expect(setMaxStreakFn).toHaveBeenCalled();

    const gamesPlayedCallback = setGamesPlayedFn.mock.calls[0][0] as (
      num: number
    ) => number;
    const streakCallback = setStreakFn.mock.calls[0][0] as (
      num: number
    ) => number;
    const gamesWonCallback = setStreakFn.mock.calls[0][0] as (
      num: number
    ) => number;

    const newGamesPlayed = gamesPlayedCallback(1);
    const newStreak = streakCallback(1);
    const newGamesWon = gamesWonCallback(1);

    expect(newGamesPlayed).toBe(2);
    expect(newStreak).toBe(2);
    expect(newGamesWon).toBe(2);
  });

  it("hasWon is true and current turn is set, calls the correct dispatchers", () => {
    // Arrange
    const setGamesPlayedFn = jest.fn();
    const setGamesWonFn = jest.fn();
    const setGuessDistributionFn = jest.fn();
    const setStreakFn = jest.fn();
    const setMaxStreakFn = jest.fn();
    const streak = 3;
    const currentTurn = 0;
    const hasWon = true;

    (
      useStatistics as jest.MockedFunction<typeof useStatistics>
    ).mockImplementationOnce(
      () =>
        ({
          setGamesPlayed: setGamesPlayedFn as Dispatch<SetStateAction<number>>,
          setGamesWon: setGamesWonFn as Dispatch<SetStateAction<number>>,
          setGuessDistribution: setGuessDistributionFn as Dispatch<
            SetStateAction<{ [key: number]: number }>
          >,
          setStreak: setStreakFn as Dispatch<SetStateAction<number>>,
          setMaxStreak: setMaxStreakFn as Dispatch<SetStateAction<number>>,
          streak,
        } as StatisticsState)
    );

    // Action
    const updateStatisticsByGameResult = useStatisticsUpdater();

    updateStatisticsByGameResult(hasWon, currentTurn);

    // Assert
    expect(setGamesPlayedFn).toHaveBeenCalled();
    expect(setStreakFn).toHaveBeenCalled();
    expect(setGamesWonFn).toHaveBeenCalled();
    expect(setGuessDistributionFn).toHaveBeenCalled();
    expect(setMaxStreakFn).toHaveBeenCalled();

    const gamesPlayedCallback = setGamesPlayedFn.mock.calls[0][0] as (
      num: number
    ) => number;
    const streakCallback = setStreakFn.mock.calls[0][0] as (
      num: number
    ) => number;
    const gamesWonCallback = setStreakFn.mock.calls[0][0] as (
      num: number
    ) => number;
    const setGuessDistributionCallback = setStreakFn.mock.calls[0][0] as (
      num: number
    ) => number;

    const newGamesPlayed = gamesPlayedCallback(1);
    const newStreak = streakCallback(1);
    const newGamesWon = gamesWonCallback(1);

    expect(newGamesPlayed).toBe(2);
    expect(newStreak).toBe(2);
    expect(newGamesWon).toBe(2);
  });
});
