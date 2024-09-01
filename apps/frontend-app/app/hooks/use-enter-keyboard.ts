import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import useWordle from "./use-wordle";

export const useEnterKeyboard = () => {
  const {
    numberOfTurns,
    currentGuess,
    history,
    setCurrentGuess,
    setGuesses,
    setHistory,
    setIsCorrect,
    setNumberOfTurns,
    setUsedKeys,
    solution,
  } = useWordle();

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

    setCurrentGuess("");
  };

  useHotkeys("enter", () => {
    if (numberOfTurns > 5) {
      console.log("You used all your guesses");
      return;
    }

    // do not allow duplicate words
    if (history.includes(currentGuess)) {
      console.log("You have already tried that word");
      return;
    }

    // check word is 5 chars long
    if (currentGuess.length !== 5) {
      console.log("Word must be 5 charas long");
      return;
    }

    const formatted = formatGuess();
    addNewGuess(formatted);
  });
};
