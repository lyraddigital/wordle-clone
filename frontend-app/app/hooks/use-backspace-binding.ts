import useCurrentGuessUpdater from "./use-current-guess-updater";
import useIsCurrentGuessIncorrectUpdater from "./use-is-current-guess-incorrect-updater";

export const useBackspaceBinding = (): (() => void) => {
  const setCurrentGuess = useCurrentGuessUpdater();
  const setIsCurrentGuessIncorrect = useIsCurrentGuessIncorrectUpdater();

  const handleBackspace = () => {
    setIsCurrentGuessIncorrect(false);
    setCurrentGuess((prevGuess) => {
      return prevGuess.slice(0, -1);
    });
  };

  return handleBackspace;
};
