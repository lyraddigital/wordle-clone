import { useHotkeys } from "react-hotkeys-hook";
import { HotkeysEvent } from "react-hotkeys-hook/dist/types";

import useAlphabetBinding from "@/hooks/bindings/use-alphabet-binding";

const useAlphabetKeyboard = () => {
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
      console.log("Inside useHotKeys handler");
      const keyPressed = handler.keys ? handler.keys[0] : null;

      if (keyPressed) {
        handleAlphabetCharacter(keyPressed);
      }
    }
  );
};

export default useAlphabetKeyboard;
