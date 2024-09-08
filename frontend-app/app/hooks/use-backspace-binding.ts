import useModals from "./use-modals";
import useWordle from "./use-wordle";

const useBackspaceBinding = (): (() => void) => {
  const {
    isGameOver,
    isGuessAnimationFiring,
    setCurrentGuess,
    setIsCurrentGuessIncorrect,
  } = useWordle();
  const { showStatisticsModal, showHelpModal } = useModals();

  const handleBackspace = () => {
    if (
      isGameOver ||
      isGuessAnimationFiring ||
      showStatisticsModal ||
      showHelpModal
    ) {
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
