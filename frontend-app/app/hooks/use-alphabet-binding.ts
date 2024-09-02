import useWordle from "./use-wordle";

export const useAlphabetBinding = (): ((keyPressed: string) => void) => {
  const { currentGuess, setCurrentGuess, setIsCurrentGuessIncorrect } =
    useWordle();

  const handleAlphabetCharacter = (keyPressed: string) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prevGuess) => prevGuess + keyPressed);
      setIsCurrentGuessIncorrect(false);
    }
  };

  return handleAlphabetCharacter;
};
