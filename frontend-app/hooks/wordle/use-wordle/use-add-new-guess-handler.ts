import useStatisticsUpdater from "@/hooks/statistics/use-statistics-updater";
import useWordle from "@/hooks/wordle/use-wordle";

export default function useAddNewGuessHandler(): (
  formattedGuess: { key: string; colour: string }[]
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

  return (formattedGuess: { key: string; colour: string }[]) => {
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
}
