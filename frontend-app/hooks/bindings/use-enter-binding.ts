import toast from "react-hot-toast";
import { wordExists } from "@/data/words";

import useStatisticsUpdater from "@/hooks/statistics/use-statistics-updater";
import useWordle from "@/hooks/wordle/use-wordle";
import useModals from "@/hooks/modals/use-modals";

const useEnterBinding = (): (() => void) => {
  const {
    isGameOver,
    numberOfTurns,
    currentGuess,
    isGuessAnimationFiring,
    history,
    setIsGameOver,
    setCurrentGuess,
    setGuesses,
    setHistory,
    setIsCorrect,
    setNumberOfTurns,
    setUsedKeys,
    setIsCurrentGuessIncorrect,
    setIsGuessAnimationFiring,
    solution,
  } = useWordle();
  const { showStatisticsModal, showHelpModal } = useModals();
  const updateStatisticsByGameResult = useStatisticsUpdater();

  const formatGuess = () => {
    let solutionArray: (string | null)[] = [...solution.split("")];
    let formattedGuess = [...currentGuess.split("")].map((l) => {
      return { key: l, colour: "grey" };
    });

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].colour = "green";
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.colour !== "green") {
        formattedGuess[i].colour = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess: { key: string; colour: string }[]) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
      setIsGameOver(true);
      updateStatisticsByGameResult(true, numberOfTurns);
    }

    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[numberOfTurns] = formattedGuess;

      return newGuesses;
    });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });

    setNumberOfTurns((prevTurn) => prevTurn + 1);

    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      formattedGuess.forEach((l) => {
        const currentColour = newKeys[l.key];

        if (l.colour === "green") {
          newKeys[l.key] = "green";
          return;
        }

        if (l.colour === "yellow" && currentColour !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }

        if (
          l.colour === "grey" &&
          currentColour !== "green" &&
          currentColour !== "yellow"
        ) {
          newKeys[l.key] = "grey";
          return;
        }
      });

      return newKeys;
    });

    if (numberOfTurns === 5) {
      setIsGameOver(true);
      updateStatisticsByGameResult(false);
    } else {
      setIsGuessAnimationFiring(true);
      setTimeout(() => {
        setIsGuessAnimationFiring(false);
      }, 750);
    }

    setCurrentGuess("");
  };

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
