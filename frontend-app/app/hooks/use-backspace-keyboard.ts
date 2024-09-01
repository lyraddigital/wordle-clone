import { useHotkeys } from "react-hotkeys-hook";

import useCurrentGuessUpdater from "./use-current-guess-updater";

export const useBackspaceKeyboard = () => {
  const setCurrentGuess = useCurrentGuessUpdater();

  useHotkeys("Backspace", () => {
    setCurrentGuess((prevGuess) => prevGuess.slice(0, -1));
  });
};
