import useAlphabetBinding from "@/hooks/bindings/use-alphabet-binding";
import useBackspaceBinding from "@/hooks/bindings/use-backspace-binding";
import useEnterBinding from "@/hooks/bindings/use-enter-binding";

const useKeypadPress = (): ((keyPressed: string) => void) => {
  const handleAlphabetCharacter = useAlphabetBinding();
  const handleBackspace = useBackspaceBinding();
  const handleEnter = useEnterBinding();

  const handleKeypadPressed = (keyPressed: string) => {
    if (keyPressed === "Enter") {
      handleEnter();
    } else if (keyPressed === "Backspace") {
      handleBackspace();
    } else {
      handleAlphabetCharacter(keyPressed);
    }
  };

  return handleKeypadPressed;
};

export default useKeypadPress;
