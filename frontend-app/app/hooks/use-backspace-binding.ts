import useCurrentGuessUpdater from "./use-current-guess-updater";
import useIsCurrentGuessIncorrectUpdater from "./use-is-current-guess-incorrect-updater";
import useWordle from "./use-wordle";

export const useBackspaceBinding = (): (() => void) => {
  const { isGameOver } = useWordle();
  const setCurrentGuess = useCurrentGuessUpdater();
  const setIsCurrentGuessIncorrect = useIsCurrentGuessIncorrectUpdater();

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
