import { useHotkeys } from "react-hotkeys-hook";

import useCurrentGuessUpdater from "./use-current-guess-updater";
import useIsCurrentGuessIncorrectUpdater from "./use-is-current-guess-incorrect-updater";

export const useBackspaceKeyboard = () => {
  const setCurrentGuess = useCurrentGuessUpdater();
  const setIsCurrentGuessIncorrect = useIsCurrentGuessIncorrectUpdater();

  useHotkeys("Backspace", () => {
    setIsCurrentGuessIncorrect(false);
    setCurrentGuess((prevGuess) => prevGuess.slice(0, -1));
  });
};
