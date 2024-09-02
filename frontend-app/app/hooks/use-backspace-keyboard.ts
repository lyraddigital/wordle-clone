import { useHotkeys } from "react-hotkeys-hook";

import { useBackspaceBinding } from "./use-backspace-binding";

export const useBackspaceKeyboard = () => {
  const handleBackspace = useBackspaceBinding();

  useHotkeys("Backspace", () => {
    handleBackspace();
  });
};
