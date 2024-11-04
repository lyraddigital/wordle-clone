import { useContext } from "react";
import { renderHook } from "@testing-library/react";

import StatisticsContext, { StatisticsState } from "./statistics-context";

describe("StatisticsContext", () => {
    it("should have all state fields set to undefined by default", () => {
        // Arrange / Action
        const { result } = renderHook(() => useContext(StatisticsContext));
        const statisticsState: StatisticsState = result.current;

        // Assert
        expect(statisticsState).toBeDefined();
        expect(statisticsState.gamesPlayed).toBeUndefined();
        expect(statisticsState.gamesWon).toBeUndefined();
        expect(statisticsState.guessDistribution).toBeUndefined();
        expect(statisticsState.streak).toBeUndefined();
        expect(statisticsState.maxStreak).toBeUndefined();
        expect(statisticsState.setGamesPlayed).toBeUndefined();
        expect(statisticsState.setGamesWon).toBeUndefined();
        expect(statisticsState.setGuessDistribution).toBeUndefined();
        expect(statisticsState.setStreak).toBeUndefined();
        expect(statisticsState.setMaxStreak).toBeUndefined();
    });
});