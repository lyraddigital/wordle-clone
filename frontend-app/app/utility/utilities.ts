const isDarkModeKey = "ld:wordle:isDarkMode";

export const getIsDarkModeFromLocalStorage = () => {
  return localStorage.getItem(isDarkModeKey) == "true";
};

export const setIsDarkModelToLocalStorage = (isDarkMode: boolean) => {
  localStorage.setItem(isDarkModeKey, isDarkMode.toString());
};
