import { PropsWithChildren, useState } from "react";

import StatisticsContext, { StatisticsState } from "../../context/statistics-context";
import {
    getGamesPlayedFromLocalStorage,
    getGamesWonFromLocalStorage,
    getStreakFromLocalStorage,
    getMaxStreakFromLocalStorage
} from "../../utility/utilities";

export default function StatisticsProvider({ children }: PropsWithChildren) {
    const [gamesPlayed, setGamesPlayed] = useState<number>(getGamesPlayedFromLocalStorage());
    const [gamesWon, setGamesWon] = useState<number>(getGamesWonFromLocalStorage());
    const [streak, setStreak] = useState<number>(getStreakFromLocalStorage());
    const [maxStreak, setMaxStreak] = useState<number>(getMaxStreakFromLocalStorage());

    const wordleState: StatisticsState = {
        gamesPlayed,
        gamesWon,
        streak,
        maxStreak,
        setGamesPlayed,
        setGamesWon,
        setStreak,
        setMaxStreak
    };

    return (
        <StatisticsContext.Provider value={wordleState}>
            {children}
        </StatisticsContext.Provider>
    );
}