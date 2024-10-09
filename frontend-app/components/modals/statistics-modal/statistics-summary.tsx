import useStatistics from "@/hooks/statistics/use-statistics";

export default function StatisticsSummary() {
    const { gamesPlayed, gamesWon, streak, maxStreak } = useStatistics();
    const winPercentage = gamesPlayed === 0 || gamesWon === 0 ? 0 : ((gamesWon / gamesPlayed) * 100).toFixed(0);

    return (
        <div className="mt-[10px] flex justify-center gap-[15px]">
            <div>
                <div className="text-center text-4xl">{gamesPlayed}</div>
                <div className="text-center text-xs">Played</div>
            </div>
            <div>
                <div className="text-center text-4xl">{winPercentage}</div>
                <div className="text-center text-xs">Win %</div>
            </div>
            <div>
                <div className="text-center text-4xl">{streak}</div>
                <div className="text-center text-xs">Current <br /> Streak</div>
            </div>
            <div>
                <div className="text-center text-4xl">{maxStreak}</div>
                <div className="text-center text-xs">Max <br /> Streek</div>
            </div>
        </div>
    );
}