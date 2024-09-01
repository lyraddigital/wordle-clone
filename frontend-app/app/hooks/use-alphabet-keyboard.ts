import { useHotkeys } from "react-hotkeys-hook";
import { HotkeysEvent } from "react-hotkeys-hook/dist/types";

import useCurrentGuess from "./use-current-guess";
import useCurrentGuessUpdater from "./use-current-guess-updater";
import useIsCurrentGuessIncorrectUpdater from "./use-is-current-guess-incorrect-updater";

export const useAlphabetKeyboard = () => {
  const currentGuess = useCurrentGuess();
  const setCurrentGuess = useCurrentGuessUpdater();
  const setIsCurrentGuessIncorrect = useIsCurrentGuessIncorrectUpdater();

  useHotkeys(
    [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
    (_: KeyboardEvent, handler: HotkeysEvent) => {
      const keyPressed = handler.keys ? handler.keys[0] : null;

      if (keyPressed) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prevGuess) => prevGuess + keyPressed);
          setIsCurrentGuessIncorrect(false);
        }
      }
    }
  );
};
