const isDarkModeKey = "ld:wordle:isDarkMode";
const gamesPlayedKey = "ld:wordle:gamesPlayed";
const gamesWonKey = "ld:wordle:gamesWon";
const streakKey = "ld:wordle:streak";
const maxStreakKey = "ld:wordle:maxStreak";
const guessDistributionKey = "ld:wordle:guessDistribution";

const getNumberFromValue = (value: string | null): number => {
  const numberFromString = parseInt(value || "0", 10);
  return isNaN(numberFromString) ? 0 : numberFromString;
};

export const getIsDarkModeFromLocalStorage = (): boolean => {
  return localStorage.getItem(isDarkModeKey) == "true";
};

export const setIsDarkModelToLocalStorage = (isDarkMode: boolean) => {
  localStorage.setItem(isDarkModeKey, isDarkMode.toString());
};

export const getGamesPlayedFromLocalStorage = (): number => {
  return getNumberFromValue(localStorage.getItem(gamesPlayedKey));
};

export const setGamesPlayedToLocalStorage = (gamesPlayed: number) => {
  localStorage.setItem(gamesPlayedKey, gamesPlayed.toString());
};

export const getGamesWonFromLocalStorage = (): number => {
  return getNumberFromValue(localStorage.getItem(gamesWonKey));
};

export const setGamesWonToLocalStorage = (gamesWon: number) => {
  localStorage.setItem(gamesWonKey, gamesWon.toString());
};

export const getStreakFromLocalStorage = (): number => {
  return getNumberFromValue(localStorage.getItem(streakKey));
};

export const setStreakToLocalStorage = (streak: number) => {
  localStorage.setItem(streakKey, streak.toString());
};

export const getMaxStreakFromLocalStorage = (): number => {
  return getNumberFromValue(localStorage.getItem(maxStreakKey));
};

export const setMaxStreakToLocalStorage = (maxStreak: number) => {
  localStorage.setItem(maxStreakKey, maxStreak.toString());
};

export const getGuessDistributionFromLocalStorage = (): {
  [key: number]: number;
} => {
  const distributionEntry = localStorage.getItem(guessDistributionKey);

  if (!distributionEntry) {
    return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  }

  return JSON.parse(distributionEntry) as { [key: number]: number };
};

export const setGuessDistributionToLocalStorage = (guessDistribution: {
  [key: number]: number;
}) => {
  const distributionToSave = JSON.stringify(guessDistribution);
  localStorage.setItem(guessDistributionKey, distributionToSave);
};
