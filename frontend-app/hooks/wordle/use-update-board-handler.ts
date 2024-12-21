import { GuessColour } from "@/lib/enums";
import { GuessLetterResult } from "@/lib/types";
import useStatisticsUpdater from "@/hooks/statistics/use-statistics-updater";
import useWordle from "@/hooks/wordle/use-wordle";

export default function useUpdateBoardHandler(): (
  currentGuess: GuessLetterResult[],
  allGuesses: GuessLetterResult[][],
  isCorrect: boolean,
  isGameOver: boolean,
  numberOfTurns: number
) => void {
  const {
    setCurrentGuess,
    setGuesses,
    setNumberOfTurns,
    setUsedKeys,
    setIsGameOver,
    setIsGuessAnimationFiring,
  } = useWordle();

  const updateStatisticsByGameResult = useStatisticsUpdater();

  return (
    currentGuess: GuessLetterResult[],
    allGuesses: GuessLetterResult[][],
    isCorrect: boolean,
    isGameOver: boolean,
    numberOfTurns: number
  ) => {
    if (isGameOver) {
      updateStatisticsByGameResult(isCorrect, numberOfTurns);
    } else {
      setIsGuessAnimationFiring(true);
      setTimeout(() => {
        setIsGuessAnimationFiring(false);
      }, 750);
    }

    setIsGameOver(isGameOver);
    setGuesses([...allGuesses, ...Array(6 - numberOfTurns)]);
    setNumberOfTurns(numberOfTurns);
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      currentGuess.forEach((lg) => {
        const currentColour = newKeys[lg.letter];

        if (lg.colour === GuessColour.green) {
          newKeys[lg.letter] = GuessColour.green;
          return;
        }

        if (
          lg.colour === GuessColour.yellow &&
          currentColour !== GuessColour.green
        ) {
          newKeys[lg.letter] = GuessColour.yellow;
          return;
        }

        if (
          lg.colour === GuessColour.grey &&
          currentColour !== GuessColour.green &&
          currentColour !== GuessColour.yellow
        ) {
          newKeys[lg.letter] = GuessColour.grey;
          return;
        }
      });

      return newKeys;
    });

    setCurrentGuess("");
  };
}
