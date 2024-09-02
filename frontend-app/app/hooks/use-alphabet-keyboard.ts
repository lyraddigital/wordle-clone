import { useHotkeys } from "react-hotkeys-hook";
import { HotkeysEvent } from "react-hotkeys-hook/dist/types";

import { useAlphabetBinding } from "./use-alphabet-binding";

export const useAlphabetKeyboard = () => {
  const handleAlphabetCharacter = useAlphabetBinding();

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
        handleAlphabetCharacter(keyPressed);
      }
    }
  );
};
