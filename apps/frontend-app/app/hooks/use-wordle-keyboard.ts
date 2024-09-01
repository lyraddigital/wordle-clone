import { useAlphabetKeyboard } from "./use-alphabet-keyboard";
import { useBackspaceKeyboard } from "./use-backspace-keyboard";
import { useEnterKeyboard } from "./use-enter-keyboard";

const useWordleKeyboard = () => {
  useAlphabetKeyboard();
  useEnterKeyboard();
  useBackspaceKeyboard();
};

export default useWordleKeyboard;
