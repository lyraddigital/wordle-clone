import useModals from "@/hooks/modals/use-modals";
import useWordle from "@/hooks/wordle/use-wordle";

const useAlphabetBinding = (): ((keyPressed: string) => void) => {
  const {
    currentGuess,
    isGameOver,
    isGuessAnimationFiring,
    setCurrentGuess,
    setIsCurrentGuessIncorrect,
  } = useWordle();
  const { showStatisticsModal, showHelpModal } = useModals();

  const handleAlphabetCharacter = (keyPressed: string) => {
    if (
      isGameOver ||
      isGuessAnimationFiring ||
      showStatisticsModal ||
      showHelpModal
    ) {
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
