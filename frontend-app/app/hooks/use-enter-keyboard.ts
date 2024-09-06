import { useHotkeys } from "react-hotkeys-hook";

import useEnterBinding from "./use-enter-binding";

const useEnterKeyboard = () => {
  const handleEnter = useEnterBinding();

  useHotkeys("enter", () => {
    handleEnter();
  });
};

export default useEnterKeyboard;
