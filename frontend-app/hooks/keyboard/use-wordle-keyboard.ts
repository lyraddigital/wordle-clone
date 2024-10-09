import useAlphabetKeyboard from "@/hooks/keyboard/use-alphabet-keyboard";
import useBackspaceKeyboard from "@/hooks/keyboard/use-backspace-keyboard";
import useEnterKeyboard from "@/hooks/keyboard/use-enter-keyboard";

const useWordleKeyboard = () => {
  useAlphabetKeyboard();
  useEnterKeyboard();
  useBackspaceKeyboard();
};

export default useWordleKeyboard;
