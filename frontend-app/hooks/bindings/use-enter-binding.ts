import toast from "react-hot-toast";

import { wordExists } from "@/data/words";
import useWordle from "@/hooks/wordle/use-wordle";
import useModals from "@/hooks/modals/use-modals";
import useGuessFormatter from "@/hooks/wordle/use-guess-formatter";
import useAddNewGuessHandler from "@/hooks/wordle/use-add-new-guess-handler";

const useEnterBinding = (): (() => void) => {
  const {
    isGameOver,
    currentGuess,
    isGuessAnimationFiring,
    history,
    setIsCurrentGuessIncorrect,
  } = useWordle();
  const { showStatisticsModal, showHelpModal } = useModals();
  const formatGuess = useGuessFormatter();
  const addNewGuess = useAddNewGuessHandler();

  const handleEnter = () => {
    if (
      isGameOver ||
      isGuessAnimationFiring ||
      showStatisticsModal ||
      showHelpModal
    ) {
      return;
    }

    // do not allow duplicate words
    if (history.includes(currentGuess)) {
      toast("You have already tried that word");
      setIsCurrentGuessIncorrect(true);
      return;
    }

    // check word is 5 chars long
    if (currentGuess.length !== 5) {
      toast("Word must be 5 characters long");
      setIsCurrentGuessIncorrect(true);
      return;
    }

    if (!wordExists(currentGuess)) {
      toast("Word does not exist");
      setIsCurrentGuessIncorrect(true);
      return;
    }

    const formatted = formatGuess();
    addNewGuess(formatted);
  };

  return handleEnter;
};

export default useEnterBinding;
