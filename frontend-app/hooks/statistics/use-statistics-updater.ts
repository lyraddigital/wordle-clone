import useStatistics from "@/hooks/statistics/use-statistics";

const useStatisticsUpdater = (): ((
  hasWon: boolean,
  currentTurn?: number
) => void) => {
  const {
    setGamesPlayed,
    setGamesWon,
    setGuessDistribution,
    setStreak,
    setMaxStreak,
    streak,
  } = useStatistics();
  const updateStatisticsByGameResult = (
    hasWon: boolean,
    currentTurn?: number
  ) => {
    setGamesPlayed((prevGamesPlayed) => prevGamesPlayed + 1);
    setStreak((prevStreak) => (hasWon ? prevStreak + 1 : 0));

    if (hasWon) {
      setGamesWon((prevGamesWon) => prevGamesWon + 1);

      setMaxStreak((prevMaxStreak) => {
        const newStreak = streak + 1;
        const newMaxStreak =
          newStreak > prevMaxStreak ? newStreak : prevMaxStreak;

        return newMaxStreak;
      });

      if (currentTurn !== undefined) {
        setGuessDistribution((prevGuessDistribution) => {
          const newGuessDistribution = { ...prevGuessDistribution };

          if (newGuessDistribution[currentTurn + 1] !== undefined) {
            newGuessDistribution[currentTurn + 1]! += 1;
          }

          return newGuessDistribution;
        });
      }
    }
  };

  return updateStatisticsByGameResult;
};

export default useStatisticsUpdater;
