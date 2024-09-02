import { useHotkeys } from "react-hotkeys-hook";

import { useEnterBinding } from "./use-enter-binding";

export const useEnterKeyboard = () => {
  const handleEnter = useEnterBinding();

  useHotkeys("enter", () => {
    handleEnter();
  });
};
