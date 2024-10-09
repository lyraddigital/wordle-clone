import { useHotkeys } from "react-hotkeys-hook";

import useEnterBinding from "@/hooks/bindings/use-enter-binding";

const useEnterKeyboard = () => {
  const handleEnter = useEnterBinding();

  useHotkeys("enter", () => {
    handleEnter();
  });
};

export default useEnterKeyboard;
