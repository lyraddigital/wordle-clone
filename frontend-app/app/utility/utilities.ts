const isDarkModeKey = "ld:wordle:isDarkMode";
const gamesPlayedKey = "ld:wordle:gamesPlayed";
const gamesWonKey = "ld:wordle:gamesWon";
const streakKey = "ld:wordle:streak";
const maxStreakKey = "ld:wordle:maxStreak";

const getNumberFromValue = (value: string | null): number => {
  const numberFromString = parseInt(value || "0", 10);
  return isNaN(numberFromString) ? 0 : numberFromString;
};

export const getIsDarkModeFromLocalStorage = () => {
  return localStorage.getItem(isDarkModeKey) == "true";
};

export const setIsDarkModelToLocalStorage = (isDarkMode: boolean) => {
  localStorage.setItem(isDarkModeKey, isDarkMode.toString());
};

export const getGamesPlayedFromLocalStorage = () => {
  return getNumberFromValue(localStorage.getItem(gamesPlayedKey));
};

export const setGamesPlayedToLocalStorage = (gamesPlayed: number) => {
  localStorage.setItem(gamesPlayedKey, gamesPlayed.toString());
};

export const getGamesWonFromLocalStorage = () => {
  return getNumberFromValue(localStorage.getItem(gamesWonKey));
};

export const setGamesWonToLocalStorage = (gamesWon: number) => {
  localStorage.setItem(gamesWonKey, gamesWon.toString());
};

export const getStreakFromLocalStorage = () => {
  return getNumberFromValue(localStorage.getItem(streakKey));
};

export const setStreakToLocalStorage = (streak: number) => {
  localStorage.setItem(streakKey, streak.toString());
};

export const getMaxStreakFromLocalStorage = () => {
  return getNumberFromValue(localStorage.getItem(maxStreakKey));
};

export const setMaxStreakToLocalStorage = (maxStreak: number) => {
  localStorage.setItem(maxStreakKey, maxStreak.toString());
};
