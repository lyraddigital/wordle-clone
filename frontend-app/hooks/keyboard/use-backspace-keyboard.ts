import { useHotkeys } from "react-hotkeys-hook";

import useBackspaceBinding from "@/hooks/bindings/use-backspace-binding";

const useBackspaceKeyboard = () => {
  const handleBackspace = useBackspaceBinding();

  useHotkeys("Backspace", () => {
    handleBackspace();
  });
};

export default useBackspaceKeyboard;
