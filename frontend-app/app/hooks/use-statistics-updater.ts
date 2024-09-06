import {
  setGamesPlayedToLocalStorage,
  setGamesWonToLocalStorage,
  setStreakToLocalStorage,
  setMaxStreakToLocalStorage,
  setGuessDistributionToLocalStorage,
} from "../utility/utilities";

import useStatistics from "./use-statistics";

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
    setGamesPlayed((prevGamesPlayed) => {
      const newGamesPlayed = prevGamesPlayed + 1;
      setGamesPlayedToLocalStorage(newGamesPlayed);

      return newGamesPlayed;
    });

    setStreak((prevStreak) => {
      const newStreak = hasWon ? prevStreak + 1 : 0;
      setStreakToLocalStorage(newStreak);

      return newStreak;
    });

    if (hasWon) {
      setGamesWon((prevGamesWon) => {
        const newGamesWon = prevGamesWon + 1;
        setGamesWonToLocalStorage(newGamesWon);

        return newGamesWon;
      });

      setMaxStreak((prevMaxStreak) => {
        const newStreak = streak + 1;
        const newMaxStreak =
          newStreak > prevMaxStreak ? newStreak : prevMaxStreak;
        setMaxStreakToLocalStorage(newMaxStreak);

        return newMaxStreak;
      });

      if (currentTurn !== undefined) {
        setGuessDistribution((prevGuessDistribution) => {
          const newGuessDistribution = { ...prevGuessDistribution };
          newGuessDistribution[currentTurn + 1] += 1;

          setGuessDistributionToLocalStorage(newGuessDistribution);

          return newGuessDistribution;
        });
      }
    }
  };

  return updateStatisticsByGameResult;
};

export default useStatisticsUpdater;
