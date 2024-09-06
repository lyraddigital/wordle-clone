import { wordExists } from "../data/words";

import useStatisticsUpdater from "./use-statistics-updater";
import useWordle from "./use-wordle";

const useEnterBinding = (): (() => void) => {
  const {
    isGameOver,
    numberOfTurns,
    currentGuess,
    history,
    setIsGameOver,
    setCurrentGuess,
    setGuesses,
    setHistory,
    setIsCorrect,
    setNumberOfTurns,
    setUsedKeys,
    setIsCurrentGuessIncorrect,
    solution,
  } = useWordle();
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
      updateStatisticsByGameResult(true);
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
    }

    setCurrentGuess("");
  };

  const handleEnter = () => {
    if (isGameOver) {
      return;
    }

    // do not allow duplicate words
    if (history.includes(currentGuess)) {
      console.log("You have already tried that word");
      setIsCurrentGuessIncorrect(true);
      return;
    }

    // check word is 5 chars long
    if (currentGuess.length !== 5) {
      console.log("Word must be 5 charas long");
      setIsCurrentGuessIncorrect(true);
      return;
    }

    if (!wordExists(currentGuess)) {
      console.log("Word does not exist");
      setIsCurrentGuessIncorrect(true);
      return;
    }

    const formatted = formatGuess();
    addNewGuess(formatted);
  };

  return handleEnter;
};

export default useEnterBinding;
