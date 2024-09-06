import { PropsWithChildren, useState } from "react";

import StatisticsContext, { StatisticsState } from "../../context/statistics-context";
import {
    getGamesPlayedFromLocalStorage,
    getGamesWonFromLocalStorage,
    getStreakFromLocalStorage,
    getMaxStreakFromLocalStorage,
    getGuessDistributionFromLocalStorage
} from "../../utility/utilities";

export default function StatisticsProvider({ children }: PropsWithChildren) {
    const [gamesPlayed, setGamesPlayed] = useState<number>(getGamesPlayedFromLocalStorage());
    const [gamesWon, setGamesWon] = useState<number>(getGamesWonFromLocalStorage());
    const [streak, setStreak] = useState<number>(getStreakFromLocalStorage());
    const [maxStreak, setMaxStreak] = useState<number>(getMaxStreakFromLocalStorage());
    const [guessDistribution, setGuessDistribution] = useState<{ [key: number]: number }>(getGuessDistributionFromLocalStorage());

    const wordleState: StatisticsState = {
        gamesPlayed,
        gamesWon,
        streak,
        maxStreak,
        guessDistribution,
        setGamesPlayed,
        setGamesWon,
        setStreak,
        setMaxStreak,
        setGuessDistribution
    };

    return (
        <StatisticsContext.Provider value={wordleState}>
            {children}
        </StatisticsContext.Provider>
    );
}