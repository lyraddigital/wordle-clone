import { GuessLetterResult } from "@/lib/types";
import useStatisticsUpdater from "@/hooks/statistics/use-statistics-updater";
import useWordle from "@/hooks/wordle/use-wordle";

export default function useAddNewGuessHandler(): (
  formattedGuess: GuessLetterResult[]
) => void {
  const {
    numberOfTurns,
    currentGuess,
    setIsGameOver,
    setCurrentGuess,
    setGuesses,
    setHistory,
    setIsCorrect,
    setNumberOfTurns,
    setUsedKeys,
    setIsGuessAnimationFiring,
    solution,
  } = useWordle();

  const updateStatisticsByGameResult = useStatisticsUpdater();

  return (formattedGuess: GuessLetterResult[]) => {
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

      formattedGuess.forEach((lg) => {
        const currentColour = newKeys[lg.letter];

        if (lg.colour === "green") {
          newKeys[lg.letter] = "green";
          return;
        }

        if (lg.colour === "yellow" && currentColour !== "green") {
          newKeys[lg.letter] = "yellow";
          return;
        }

        if (
          lg.colour === "grey" &&
          currentColour !== "green" &&
          currentColour !== "yellow"
        ) {
          newKeys[lg.letter] = "grey";
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
}
