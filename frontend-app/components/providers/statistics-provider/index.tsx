import { PropsWithChildren } from "react";

import StatisticsContext, { StatisticsState } from "@/contexts/statistics-context";
import useLocalStorage from "@/hooks/local-storage/use-local-storage";
import {
    gamesPlayedKey,
    gamesWonKey,
    streakKey,
    maxStreakKey,
    guessDistributionKey
} from "@/lib/utils";

export default function StatisticsProvider({ children }: PropsWithChildren) {
    const [gamesPlayed, setGamesPlayed] = useLocalStorage(gamesPlayedKey, 0);
    const [gamesWon, setGamesWon] = useLocalStorage(gamesWonKey, 0);
    const [streak, setStreak] = useLocalStorage(streakKey, 0);
    const [maxStreak, setMaxStreak] = useLocalStorage(maxStreakKey, 0);
    const [guessDistribution, setGuessDistribution] = useLocalStorage(guessDistributionKey, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } as { [key: number]: number });

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