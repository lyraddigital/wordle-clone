import toast from "react-hot-toast";

import submitGuess from "@/actions/submit-guess.action";
import useWordle from "@/hooks/wordle/use-wordle";
import useModals from "@/hooks/modals/use-modals";
import useUpdateBoardHandler from "@/hooks/wordle/use-update-board-handler";
import { GuessErrorStatusCodes } from "@/lib/enums";

const useEnterBinding = (): (() => void) => {
  const {
    isGameOver,
    currentGuess,
    isGuessAnimationFiring,
    setIsCurrentGuessIncorrect,
  } = useWordle();
  const { showStatisticsModal, showHelpModal } = useModals();

  const updateBoard = useUpdateBoardHandler();

  const handleEnter = async () => {
    if (
      isGameOver ||
      isGuessAnimationFiring ||
      showStatisticsModal ||
      showHelpModal
    ) {
      return;
    }

    if (currentGuess.length !== 5) {
      toast("Word must be 5 characters long");
      setIsCurrentGuessIncorrect(true);
      return;
    }

    const result = await submitGuess(currentGuess);

    if (result.errors) {
      const wordAlreadyTriedError = result.errors.find(
        (e) => e.code === GuessErrorStatusCodes.wordAlreadyTried
      );
      const wordNotFoundError = result.errors.find(
        (e) => e.code === GuessErrorStatusCodes.wordDoesNotExist
      );

      if (wordAlreadyTriedError) {
        toast(wordAlreadyTriedError.message);
        return;
      } else if (wordNotFoundError) {
        toast(wordNotFoundError.message);
        return;
      } else {
        toast("An unknown issue has occurred. Try again later.");
        return;
      }
    }

    updateBoard(
      result.currentGuess!,
      result.allGuesses!,
      result.isCorrect!,
      result.isGameOver!,
      result.numberOfTurns!
    );
  };

  return handleEnter;
};

export default useEnterBinding;
