import useWordle from "./use-wordle";

const useAlphabetBinding = (): ((keyPressed: string) => void) => {
  const {
    currentGuess,
    isGameOver,
    isGuessAnimationFiring,
    setCurrentGuess,
    setIsCurrentGuessIncorrect,
  } = useWordle();

  const handleAlphabetCharacter = (keyPressed: string) => {
    if (isGameOver || isGuessAnimationFiring) {
      return;
    }

    if (currentGuess.length < 5) {
      setCurrentGuess((prevGuess) => prevGuess + keyPressed);
      setIsCurrentGuessIncorrect(false);
    }
  };

  return handleAlphabetCharacter;
};

export default useAlphabetBinding;
