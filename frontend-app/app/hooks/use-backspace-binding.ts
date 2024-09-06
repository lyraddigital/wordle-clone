import useWordle from "./use-wordle";

const useBackspaceBinding = (): (() => void) => {
  const { isGameOver, setCurrentGuess, setIsCurrentGuessIncorrect } =
    useWordle();

  const handleBackspace = () => {
    if (isGameOver) {
      return;
    }

    setIsCurrentGuessIncorrect(false);
    setCurrentGuess((prevGuess) => {
      return prevGuess.slice(0, -1);
    });
  };

  return handleBackspace;
};

export default useBackspaceBinding;
