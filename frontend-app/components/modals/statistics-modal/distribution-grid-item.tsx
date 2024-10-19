import useStatistics from "@/hooks/statistics/use-statistics";

type DistributionGridItemProps = {
    turn: number;
}

export default function DistributionGridItem({ turn }: DistributionGridItemProps) {
    const { gamesPlayed, gamesWon, guessDistribution } = useStatistics();
    const distributionPercentage = gamesPlayed === 0 || !guessDistribution[turn] ? 0 : ((guessDistribution[turn] / gamesWon) * 100).toFixed(0);

    return (
        <div className="flex gap-2 items-center mb-1">
            <div className="basis-[10px] text-right">{turn}</div>
            <div className="flex justify-end px-2 bg-neutral-300 dark:text-white dark:bg-neutral-500 font-bold" style={{ flexBasis: `calc(${distributionPercentage}% - 20px)` }}>{guessDistribution[turn]}</div>
        </div>
    );
}