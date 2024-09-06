import { createContext, Dispatch, SetStateAction } from "react";

export interface StatisticsState {
    gamesPlayed: number;
    gamesWon: number;
    streak: number;
    maxStreak: number;
    setGamesPlayed: Dispatch<SetStateAction<number>>;
    setGamesWon: Dispatch<SetStateAction<number>>;
    setStreak: Dispatch<SetStateAction<number>>;
    setMaxStreak: Dispatch<SetStateAction<number>>;
}

const StatisticsContext = createContext<StatisticsState>({} as StatisticsState);

export default StatisticsContext;