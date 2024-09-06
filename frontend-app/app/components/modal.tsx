import { useEffect, useState } from "react";

import useWordle from "../hooks/use-wordle";
import useStatistics from "../hooks/use-statistics";

export default function Modal() {
    const { isGameOver } = useWordle();
    const { gamesPlayed, gamesWon, streak, maxStreak, guessDistribution } = useStatistics();
    const [showModal, setShowModal] = useState(false);
    const winPercentage = gamesPlayed === 0 || gamesWon === 0 ? 0 : ((gamesWon / gamesPlayed) * 100).toFixed(0);

    useEffect(() => {
        setTimeout(() => {
            if (isGameOver) {
                setShowModal(true);
            }
        }, 1250);
    }, [isGameOver, setShowModal]);

    const handlePlayAgainClick = () => {
        window.location.reload();
    };

    return (
        showModal && (
            <div className="flex justify-center items-center fixed w-full h-full bg-neutral-800/50 dark:bg-neutral-600/50">
                <div className="w-[90%] max-w-[470px] p-[8px] border-1 bg-white dark:bg-neutral-800 dark:text-white border-neutral-500 rounded-[16px] shadow-inner">
                    <div className="flex justify-end">
                        <span className="mr-2 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path className="fill-neutral-400" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                            </svg>
                        </span>
                    </div>
                    <h2 className="text-center uppercase font-bold">Statistics</h2>
                    <div className="mt-[10px] flex justify-center gap-1 px-24">
                        <div className="flex-1">
                            <div className="text-center text-4xl">{gamesPlayed}</div>
                            <div className="text-center text-xs">Played</div>
                        </div>
                        <div className="flex-1">
                            <div className="text-center text-4xl">{winPercentage}</div>
                            <div className="text-center text-xs">Win %</div>
                        </div>
                        <div className="flex-1">
                            <div className="text-center text-4xl">{streak}</div>
                            <div className="text-center text-xs">Current Streak</div>
                        </div>
                        <div className="flex-1">
                            <div className="text-center text-4xl">{maxStreak}</div>
                            <div className="text-center text-xs">Max Streek</div>
                        </div>
                    </div>
                    <h3 className="my-[20px] text-center uppercase font-bold text-lg">Guess Distribution</h3>
                    <div className="px-16 text-xs">
                        <div className="flex gap-2 items-center mb-1">
                            <div className="basis-[10px]">1</div>
                            <div className="basis-1 flex justify-end px-2 dark:text-white dark:bg-neutral-500 font-bold">{guessDistribution[1]}</div>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <div className="basis-[10px]">2</div>
                            <div className="basis-12 flex justify-end px-2 dark:text-white dark:bg-neutral-500 font-bold">{guessDistribution[2]}</div>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <div className="basis-[10px]">3</div>
                            <div className="basis-1 flex justify-end px-2 dark:text-white dark:bg-neutral-500 font-bold">{guessDistribution[3]}</div>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <div className="basis-[10px]">4</div>
                            <div className="basis-12 flex justify-end px-2 dark:text-white dark:bg-neutral-500 font-bold">{guessDistribution[4]}</div>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <div className="basis-[10px]">5</div>
                            <div className="basis-12 flex justify-end px-2 dark:text-white dark:bg-neutral-500 font-bold">{guessDistribution[5]}</div>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <div className="basis-[10px]">6</div>
                            <div className="basis-1 flex justify-end px-2 dark:text-white dark:bg-neutral-500 font-bold">{guessDistribution[6]}</div>
                        </div>
                    </div>
                    <div className="my-[20px] flex justify-center">
                        <button className="bg-green-500 text-white text-2xl uppercase font-bold px-[10px] py-[4px] rounded-lg" onClick={handlePlayAgainClick}>
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}