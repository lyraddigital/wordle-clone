import {
  setGamesPlayedToLocalStorage,
  setGamesWonToLocalStorage,
  setStreakToLocalStorage,
  setMaxStreakToLocalStorage,
} from "../utility/utilities";

import useStatistics from "./use-statistics";

const useStatisticsUpdater = (): ((hasWon: boolean) => void) => {
  const { setGamesPlayed, setGamesWon, setStreak, setMaxStreak, streak } =
    useStatistics();
  const updateStatisticsByGameResult = (hasWon: boolean) => {
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
    }
  };

  return updateStatisticsByGameResult;
};

export default useStatisticsUpdater;
